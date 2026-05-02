import logging
from pathlib import Path
from typing import List,Generator,Tuple,Union

# Internal Module Imports
from utils.logging import setup_logging
import pandas as pd
from pipeline.DoclingPipeline import DoclingExtractionStrategy

# Quality Strategy Imports
from post_process.quality_calculation.StrategyInterface import QualityCheckStrategy
from post_process.quality_calculation.CarboneIntegrityStrategy import CarbonIntegrityStrategy
from post_process.quality_calculation.ForecastContinutyStrategy import ForecastContinuityStrategy
from post_process.quality_calculation.orchestrator import QualityOrchestrator
from schema.PostProcess import QualityResult
# 1. THE QUALITY SUITE (Aggregator)
from process.ProcessExcel import ExcelEnergyProcessor

# 2. THE MAIN PIPELINE ORCHESTRATOR
class EnergyDataPipeline:
    def __init__(self, input_dir: str, silver_output_dir: str,gold_output_dir:str,files_type:str):
        self.input_dir = Path(input_dir)
        self.logger = logging.getLogger(self.__class__.__name__)
    
        
        # Initialize Quality Checks specific to CO2/Energy
        self.quality_suite = QualityOrchestrator([
            CarbonIntegrityStrategy(tolerance=0.05),
            ForecastContinuityStrategy()
        ])
        self.silver_output_dir = Path(silver_output_dir)
        # Initialize Extraction Strategy
        self.extractor = DoclingExtractionStrategy(output_dir=self.silver_output_dir)
        self.excel_processor = ExcelEnergyProcessor(skip_rows=9)
        self.files_type = files_type
        self.gold_output_dir = Path(gold_output_dir)

    def _get_files(self,dir:Path,valid_exts:set) -> List[Path]:
        """Loads and filters valid data files."""
        
        return [
            f for f in dir.iterdir() 
            if f.suffix.lower() in valid_exts
        ][:1]
        
    def process_parsed_data(self) -> Union[Generator[Tuple[str, pd.DataFrame], None, None], None]:

        match self.files_type:
            case "xlsx":
                self.logger.info("Processing Excel files with specialized logic.")
                files = self._get_files(self.silver_output_dir / "xlsx", {".csv"})
                self.logger.info(f"Found {len(files)} Excel files for processing.")
                generator = self.excel_processor.process_paths(files)
                return generator
            case _:
                self.logger.info("No specialized processing for this file type.")
                return None  # Return an empty generator for unsupported types

    def save_to_gold(self, filename: str, df: pd.DataFrame) -> None:
        gold_dir = self.gold_output_dir / self.files_type
        if not gold_dir.exists():
            gold_dir.mkdir(parents=True, exist_ok=True)
        df.to_csv(gold_dir / filename, index=False)
        self.logger.info(f"Saved processed table to {gold_dir / filename}")


    def validate(self,filename: str, df: pd.DataFrame)-> None:
        try:
            results: List[QualityResult] = self.quality_suite.validate(df)
            score = 0
            for result in results:
                is_valid = result.is_valid
                if is_valid:
                    self.logger.info(f"{filename} passed quality checks. details {result.model_dump_json(indent=2)}")
                    score+=1
                    if score == len(results):
                        self.logger.info(f"{filename} passed all quality checks. Saving to Gold.")
                        self.save_to_gold(filename, df)
                else:
                    self.logger.warning(f"{filename} failed quality checks. details {result.model_dump_json(indent=2)}")
        except Exception as e:
            self.logger.error(f"Error occurred while processing {filename}: {e}")
            

    def run(self):
        """The main workflow execution."""
        
        files = self._get_files(self.input_dir,{".xlsx",".pdf",".jpeg"})
        if not files:
            self.logger.error(f"No valid files found in {self.input_dir}")
            return

        self.logger.info(f"Starting pipeline execution for {len(files)} files...")
        
        # 1. Extraction (Pass the quality orchestrator into the extractor)
        # Note: We've modified the Strategy slightly to accept the quality_suite
        self.extractor.extract(files)
        generator = self.process_parsed_data()
        
        if isinstance(generator,Generator):
            for filename, df in generator :
                self.logger.info(f"validating file: {filename}")
                self.validate(filename, df)
        else:
            self.logger.info("No data to process after extraction.")

        self.logger.info("Pipeline execution completed successfully.")
        
        
    
# --- EXECUTION BLOCK ---
if __name__ == "__main__":
    # Initialize decoupled logging
    setup_logging(log_dir="./logs")
    
    # Initialize and Run
    pipeline = EnergyDataPipeline(
        input_dir="./data/Bronze/jpeg",
        silver_output_dir="./data/Silver",
        gold_output_dir="./data/Gold",
        files_type="jpeg"
    )
    pipeline.run()