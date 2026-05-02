import logging
from pathlib import Path
from typing import List
from pandas import DataFrame
# Import our new config
from utils.logging import setup_logging
from pipeline.PipelineInterface import TableExtractorStrategy
from docling.datamodel.base_models import InputFormat

from docling.datamodel.pipeline_options import (
    PdfPipelineOptions, 
    TableFormerMode,
    TableStructureOptions
)

from docling.pipeline.standard_pdf_pipeline import StandardPdfPipeline
from docling.pipeline.simple_pipeline import SimplePipeline

from docling.document_converter import (
    DocumentConverter, 
    PdfFormatOption, 
    ImageFormatOption,
    ExcelFormatOption
)
from docling_core.types.doc.document import TableItem

# Initialize logging globally at the entry point
setup_logging()
logger = logging.getLogger("pipeline_runner")

class DoclingExtractionStrategy(TableExtractorStrategy):
    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        self.converter = self._init_converter()

    def _init_converter(self) -> DocumentConverter:
        """
        Refactored converter initialization using pipeline_cls 
        instead of the restricted 'kind' attribute.
        """
        # 1. Configure the PDF/Image Pipeline Options
        pdf_options = PdfPipelineOptions()
        pdf_options.do_table_structure = True
        # Set the mode via the table_structure_options nested object
        pdf_options.table_structure_options = TableStructureOptions(
            mode=TableFormerMode.ACCURATE,
            do_cell_matching=True
        )
        
        # 2. Build the Format Options Mapping
        # We explicitly assign StandardPdfPipeline to PDF and Image formats
        format_options = {
            InputFormat.PDF: PdfFormatOption(
                pipeline_cls=StandardPdfPipeline, 
                pipeline_options=pdf_options
            ),
            InputFormat.IMAGE: ImageFormatOption(
                pipeline_cls=StandardPdfPipeline, 
                pipeline_options=pdf_options
            ),
            InputFormat.XLSX: ExcelFormatOption(
                pipeline_cls=SimplePipeline  # Excel usually uses the simple logic
            )
        }

        return DocumentConverter(
            allowed_formats=[InputFormat.PDF, InputFormat.IMAGE, InputFormat.XLSX],
            format_options=format_options
        )
    
    
    def extract(self, file_paths: List[Path]) -> None:
        logger.info(f"Using Docling Strategy to process {len(file_paths)} files.")
        
        for result in self.converter.convert_all(file_paths):
            if not result.document:
                logger.error(f"Failed to convert: {result.input.file.name}")
                continue
                
            file_stem = result.input.file.stem
            table_idx = 0
            
            for element, _ in result.document.iterate_items():
                if isinstance(element, TableItem):
                    table_idx += 1
                    df = element.export_to_dataframe()
                    self._save_data(df, f"{file_stem}_table_{table_idx}.parquet")
            
            logger.info(f"Successfully processed {file_stem}")

    def _save_data(self, data:DataFrame, filename: str) -> None:
        save_path = self.output_dir / filename
        data.to_parquet(save_path, index=False)
        logger.debug(f"Saved: {save_path}")