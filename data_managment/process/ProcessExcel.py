from utils.logging import setup_logging
import logging
import pandas as pd
from pathlib import Path
from typing import List, Generator, Tuple

setup_logging()
logger = logging.getLogger("ExcelEnergyProcessor")

class ExcelEnergyProcessor:
    """
    Dedicated processor for Energy Reports in Excel format.
    Handles specialized 'Tidy Data' transformations for time-series modeling.
    """
    
    def __init__(self, skip_rows: int = 9):
        self.skip_rows = skip_rows

    def process_paths(self, paths: List[Path]) -> Generator[Tuple[str, pd.DataFrame], None, None]:
        """
        Iterates through paths, skips unreadable files, and yields cleaned DataFrames.
        Returns: Tuple of (filename_stem, cleaned_dataframe)
        """
        for path in paths:
            if not path.is_file() or path.suffix.lower() not in ['.csv']:
                logger.warning(f"Skipping non-Excel file: {path}")
                continue

            try:
                # 1. Read the Excel file
                # Using engine='openpyxl' for modern xlsx compatibility
                #df_raw = pd.read_excel(path, header=None, skiprows=self.skip_rows, engine='openpyxl')
                df_raw = pd.read_csv(path, header=None, skiprows=self.skip_rows)

                if df_raw.empty:
                    logger.warning(f"File is empty after skipping rows: {path.name}")
                    continue

                # 2. Execute Cleaning Logic
                df_cleaned = self._clean_table(df_raw)
                logger.info(f"Cleaned data shape for {path.name}: {df_cleaned}")
                yield (path.stem, df_cleaned)
                logger.info(f"Successfully processed Excel: {path.name}")

            except Exception as e:
                # SENIOR TIP: Never crash a pipeline due to one corrupted file
                logger.error(f"Critical error reading {path.name}: {str(e)}")
                continue

    def _clean_table(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Applies the specialized CO2/Energy report transformation logic.
        """
        # 1. Immediate De-fragmentation
        # Drop completely empty columns first to reduce the memory footprint
        df = df.dropna(axis=1, how='all').copy() 
        
        # 2. Extract and Combine Metadata
        # categories (Col 0), metrics (Col 1)
        categories = df.iloc[:, 0].ffill()
        metrics = df.iloc[:, 1]
        
        # Create unique Metric IDs (e.g., 'Transport | Diesel CO2 Factor')
        metric_ids = categories.astype(str) + " | " + metrics.astype(str)
        
        # 3. Slice numeric data and Transpose
        # We take everything from Column 2 onwards as the numeric data
        data_only = df.iloc[:, 2:].copy()
        data_only.index = metric_ids
        
        # Transpose: Metrics become columns, Time-steps (Months/Years) become rows
        df_tidy = data_only.T
        
        # 4. Final Memory Optimization 
        # .copy() ensures we aren't holding onto a view of the much larger original df
        return df_tidy.copy()