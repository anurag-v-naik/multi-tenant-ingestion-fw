from abc import ABC, abstractmethod
from pyspark.sql import DataFrame, SparkSession

class BaseConnector(ABC):
    def __init__(self, spark: SparkSession, config: dict):
        self.spark = spark
        self.config = config

    @abstractmethod
    def read(self) -> DataFrame:
        pass

    @abstractmethod
    def write(self, dataframe: DataFrame):
        pass
