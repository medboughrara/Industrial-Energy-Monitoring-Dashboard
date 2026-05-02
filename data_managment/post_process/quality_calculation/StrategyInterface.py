from abc import ABC, abstractmethod
import pandas as pd
from schema.PostProcess import QualityResult

class QualityCheckStrategy(ABC):
    """
    Abstract Base Class for Quality Check strategies.
    Implementations could include: Null check, Schema validation, 
    LLM-based structural check, or OCR confidence scoring.
    """

    @abstractmethod
    def __init__(self, **kwargs):
        """Initialize strategy with specific thresholds or configurations."""
        pass

    @abstractmethod
    def execute(self, df: pd.DataFrame) -> QualityResult:
        """
        Perform the quality check on the provided DataFrame.
        
        Args:
            df: The extracted table as a Pandas DataFrame.
            
        Returns:
            QualityResult object containing the pass/fail status and metrics.
        """
        pass