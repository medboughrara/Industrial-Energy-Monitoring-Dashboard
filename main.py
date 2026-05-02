import logging
from pathlib import Path
from typing import List

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


# 2. THE MAIN PIPELINE ORCHESTRATOR
class EnergyDataPipeline:
    def __init__(self, input_dir: str, output_dir: str):
        self.input_dir = Path(input_dir)
        self.logger = logging.getLogger(self.__class__.__name__)
    
        
        # Initialize Quality Checks specific to CO2/Energy
        self.quality_suite = QualityOrchestrator([
            CarbonIntegrityStrategy(tolerance=0.05),
            ForecastContinuityStrategy()
        ])
        
        # Initialize Extraction Strategy
        self.extractor = DoclingExtractionStrategy(output_dir=Path(output_dir))

    def _get_files(self) -> List[Path]:
        """Loads and filters valid data files."""
        valid_exts = {".pdf", ".jpeg", ".jpg", ".xlsx"}
        return [
            f for f in self.input_dir.iterdir() 
            if f.suffix.lower() in valid_exts
        ]


    def validate(self)-> None:
        #write function that loads 10 parket files from the output directory and runs the quality suite on them, logging the results
        parquet_files = list(self.extractor.output_dir.glob("*.parquet"))[:10]
        for parquet_file in parquet_files:
            df = pd.read_parquet(parquet_file)
            results: List[QualityResult] = self.quality_suite.validate(df)
            for result in results:
                is_valid = result.is_valid
                if is_valid:
                    self.logger.info(f"{parquet_file.name} passed quality checks. details {result.model_dump_json(indent=2)}")
                else:
                    self.logger.warning(f"{parquet_file.name} failed quality checks. details {result.model_dump_json(indent=2)}")
            
    def run(self):
        """The main workflow execution."""
        files = self._get_files()
        if not files:
            self.logger.error(f"No valid files found in {self.input_dir}")
            return

        self.logger.info(f"Starting pipeline execution for {len(files)} files...")
        
        # 1. Extraction (Pass the quality orchestrator into the extractor)
        # Note: We've modified the Strategy slightly to accept the quality_suite
        self.extractor.extract(files)

        
        self.logger.info("Pipeline execution completed successfully.")

        self.validate()  # This would be called within the extractor after each table is extracted, not here at the end.

    
# --- EXECUTION BLOCK ---
if __name__ == "__main__":
    # Initialize decoupled logging
    setup_logging(log_dir="./logs")
    
    # Initialize and Run
    pipeline = EnergyDataPipeline(
        input_dir="./raw_energy_data",
        output_dir="./silver_layer_tables"
    )
    pipeline.run()