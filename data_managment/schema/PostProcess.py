from pydantic import BaseModel,Field
from typing import Dict, Any, Optional

class QualityResult(BaseModel):
    """Standardized output for all quality check strategies."""
    is_valid: bool
    score: float  # Range 0.0 to 1.0
    metrics: Dict[str, Any] = Field(default_factory=dict)
    error_message: Optional[str] = None
    details: Optional[Dict[str, Any]] = None