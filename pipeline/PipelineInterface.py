from abc import ABC, abstractmethod
from pathlib import Path
from typing import List,Any

class TableExtractorStrategy(ABC):
    """
    Interface for table extraction strategies. 
    Any new engine (Docling, Amazon Textract, etc.) must implement these methods.
    """

    @abstractmethod
    def __init__(self, output_dir: Path):
        self.output_dir = output_dir

    @abstractmethod
    def extract(self, file_paths: List[Path]) -> None:
        """
        The main execution method to process a list of files.
        """
        pass

    @abstractmethod
    def _save_data(self, data: Any, filename: str) -> None:
        """
        Standardizes how data is persisted across strategies.
        """
        pass