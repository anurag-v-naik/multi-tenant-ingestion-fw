import argparse
import yaml
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import sys
import logging

# Ensure the parent directory is in the Python path to import modules
sys.path.append('.')

from connectors.s3_connector import S3Connector
from connectors.postgres_connector import PostgreSQLConnector
from processors.anonymization_processor import AnonymizationProcessor
from processors.compression_processor import CompressionProcessor

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Mapping of connector and processor names to their classes
CONNECTORS = {
    'S3': S3Connector,
    'PostgreSQL': PostgreSQLConnector,
}

PROCESSORS = {
    'Anonymization': AnonymizationProcessor,
    'Compression': CompressionProcessor,
}

def create_spark_session():
    return SparkSession.builder.appName("DataIngestionFramework").getOrCreate()

def run_pipeline(config_path: str):
    """
    Parses a YAML configuration file and executes the data pipeline.
    """
    logging.info(f"Starting pipeline with config file: {config_path}")
    
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)

    spark = create_spark_session()
    
    pipeline_config = config['pipeline']
    
    try:
        # 1. Source Step
        source_config = pipeline_config['source']
        source_type = source_config['type']
        source_conn = CONNECTORS[source_type](spark, source_config['params'])
        source_df = source_conn.read()
        logging.info(f"Read {source_df.count()} records from source.")

        # 2. Processor Steps
        transformed_df = source_df
        if 'processors' in pipeline_config:
            for processor_config in pipeline_config['processors']:
                processor_type = processor_config['type']
                processor_params = processor_config['params']
                logging.info(f"Applying processor: {processor_type}")

                if processor_type in PROCESSORS:
                    processor = PROCESSORS[processor_type](spark, processor_params)
                    transformed_df = processor.process(transformed_df)
                else:
                    logging.warning(f"Unknown processor type: {processor_type}. Skipping.")

        # 3. Target Step
        target_config = pipeline_config['target']
        target_type = target_config['type']
        target_conn = CONNECTORS[target_type](spark, target_config['params'])
        target_conn.write(transformed_df)
        logging.info(f"Successfully wrote data to target: {target_type}")

        # 4. Audit & DQ (Placeholder)
        # In a real-world scenario, this would write to the PostgreSQL DB
        logging.info("Pipeline execution finished successfully.")

    except Exception as e:
        logging.error(f"Pipeline execution failed: {e}", exc_info=True)
        # Log to DB here
        raise e
    finally:
        spark.stop()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Run a data ingestion pipeline.")
    parser.add_argument('config_path', type=str, help="Path to the pipeline YAML config file.")
    args = parser.parse_args()
    run_pipeline(args.config_path)
