import pandas as pd
from StrategyInterface import QualityCheckStrategy
from schema.PostProcess import QualityResult

class ForecastContinuityStrategy(QualityCheckStrategy):
    """Checks for temporal gaps and value outliers in energy forecasting data."""
    def __init__(self):
        pass
    
    def execute(self, df: pd.DataFrame) -> QualityResult:
        # 1. Identify Time Column
        time_col = next((c for c in df.columns if any(x in c.lower() for x in ["year", "date", "month"])), None)
        value_col = next((c for c in df.columns if any(x in c.lower() for x in ["forecast", "prediction", "value", "mtoe", "tj"])), None)

        if not (time_col and value_col):
            return QualityResult(is_valid=True, score=0.5, error_message="Not a time-series table.")

        # 2. Check for Monotonicity (Years should increase)
        # We handle cases where years are read as strings
        try:
            years = pd.to_numeric(df[time_col], errors='coerce').dropna()
            is_monotonic = years.is_monotonic_increasing
            
            # 3. Z-Score Outlier Detection for the target values
            values = pd.to_numeric(df[value_col], errors='coerce').dropna()
            if len(values) > 3:
                z_scores = (values - values.mean()) / values.std()
                has_outliers = (z_scores.abs() > 3).any() # Standard 3-sigma rule
            else:
                has_outliers = False

            score = 1.0
            if not is_monotonic: score -= 0.4
            if has_outliers: score -= 0.4

            return QualityResult(
                is_valid=score > 0.5,
                score=score,
                details={"monotonic": is_monotonic, "has_outliers": has_outliers}
            )
        except Exception:
            return QualityResult(is_valid=False, score=0.0, error_message="Time-series parsing failed.")