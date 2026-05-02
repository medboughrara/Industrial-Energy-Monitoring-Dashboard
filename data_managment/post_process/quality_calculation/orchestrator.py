
from unittest import result

from post_process.quality_calculation.StrategyInterface import QualityCheckStrategy
from typing import List
from schema.PostProcess import QualityResult
import pandas as pd
from schema.PostProcess import QualityResult
from utils import logging
from utils.logging import setup_logging
import logging 

setup_logging()
logger = logging.getLogger("quality_orchestrator")

class QualityOrchestrator:
    def __init__(self, strategies: List[QualityCheckStrategy]):
        self.strategies = strategies

    def validate(self, df: pd.DataFrame) -> List[QualityResult]:
        results = []
        for strategy in self.strategies:
            result:QualityResult = strategy.execute(df)
            logger.warning(f"Table failed {strategy.__class__.__name__}: {result.error_message}")
            results.append(result)
        return results
    
