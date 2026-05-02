import pandas as pd
import numpy as np
from StrategyInterface import QualityCheckStrategy
from schema.PostProcess import QualityResult

class CarbonIntegrityStrategy(QualityCheckStrategy):
    """
    Validates that CO2 = Energy * Emission Factor.
    Specifically designed for CO2 Emission & Energy Modeling tables.
    """
    def __init__(self, tolerance: float = 0.05):
        self.tolerance = tolerance  # 5% allowed variance for rounding

    def execute(self, df: pd.DataFrame) -> QualityResult:
        # Standardize columns (Docling might extract with slight variations)
        cols = {col.lower(): col for col in df.columns}
        
        # Identify key columns for the math check
        energy_col = next((cols[c] for c in cols if "energy" in c or "consumption" in c), None)
        ef_col = next((cols[c] for c in cols if "factor" in c or "ef" in c), None)
        co2_col = next((cols[c] for c in cols if "co2" in c or "emission" in c), None)

        if not (energy_col and ef_col and co2_col):
            return QualityResult(
                is_valid=False, 
                score=0.3, 
                error_message="Required columns (Energy, EF, CO2) not found for math check."
            )

        # Convert to numeric, coercion replaces errors with NaN
        df_num = df[[energy_col, ef_col, co2_col]].apply(pd.to_numeric, errors='coerce')
        df_num = df_num.dropna()

        if len(df_num) == 0:
            return QualityResult(
                is_valid=False, 
                score=0.0, 
                error_message="No numeric data found in key columns."
            )

        # Perform the integrity check: (Energy * EF) / CO2 should be ~1.0
        calculated_co2 = df_num[energy_col] * df_num[ef_col]
        variance = np.abs((calculated_co2 - df_num[co2_col]) / df_num[co2_col])
        
        failed_rows = (variance > self.tolerance).sum()
        pass_ratio = 1.0 - (failed_rows / len(df_num))

        return QualityResult(
            is_valid=pass_ratio > 0.8, # Pass if 80% of rows match the math
            score=pass_ratio,
            details={
                "math_integrity_ratio": f"{pass_ratio:.2%}",
                "checked_rows": len(df_num),
                "failed_calculations": int(failed_rows)
            }
        )