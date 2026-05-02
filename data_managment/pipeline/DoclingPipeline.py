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
            mode=TableFormerMode.FAST,
            do_cell_matching=True
        )
        pdf_options.do_ocr = False      # Recommended if your PDFs have selectable text
          # Bypasses the 'Heron' model for layout analysis
        
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
    
    
    def extract(self, file_paths: List[Path], quality_suite=None) -> None:
        logger.info(f"Using Docling Strategy to process {len(file_paths)} files.")
        
        for result in self.converter.convert_all(file_paths):
            if not result.document:
                logger.error(f"Failed to convert: {result.input.file.name}")
                continue
                
            # 1. Identify the format (e.g., 'pdf', 'xlsx', 'jpeg')
            # We strip the dot from the suffix
            original_format = result.input.file.suffix.lower().replace(".", "")
            
            file_stem = result.input.file.stem
            table_idx = 0
            
            for element, _ in result.document.iterate_items():
                if isinstance(element, TableItem):
                    table_idx += 1
                    df = element.export_to_dataframe(doc=result.document)
                    
                    # 2. Apply Quality Check
                    if quality_suite and not quality_suite.validate_table(df):
                        continue
                    
                    # 3. Save with format-specific routing
                    self._save_data(
                        df=df, 
                        filename=f"{file_stem}_table_{table_idx}.csv",
                        sub_folder=original_format
                    )
            
            logger.info(f"Processed {file_stem} | Format: {original_format} | Tables: {table_idx}")

    def _save_data(self, df: DataFrame, filename: str, sub_folder: str) -> None:
        # Delegate to the sink, passing the sub_folder info
        if not (self.output_dir / sub_folder).exists():
            (self.output_dir / sub_folder).mkdir(parents=True, exist_ok=True)
        df.to_csv(self.output_dir / sub_folder / filename, index=False)
        logger.info(f"Saved extracted table to {self.output_dir / sub_folder / filename}")
        