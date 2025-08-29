from abc import ABC, abstractmethod
from pyspark.sql import DataFrame, SparkSession

class BaseProcessor(ABC):
    def __init__(self, spark: SparkSession, config: dict):
        self.spark = spark
        self.config = config

    @abstractmethod
    def process(self, dataframe: DataFrame) -> DataFrame:
        pass
