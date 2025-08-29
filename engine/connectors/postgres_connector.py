from pyspark.sql import DataFrame, SparkSession
from .base_connector import BaseConnector

class PostgreSQLConnector(BaseConnector):
    def read(self) -> DataFrame:
        """
        Reads data from a PostgreSQL database table.
        """
        table_name = self.config.get('table')
        return self.spark.read.format("jdbc") \
            .option("url", self.config.get('url')) \
            .option("dbtable", table_name) \
            .option("user", self.config.get('user')) \
            .option("password", self.config.get('password')) \
            .load()

    def write(self, dataframe: DataFrame):
        """
        Writes a DataFrame to a PostgreSQL database table.
        """
        table_name = self.config.get('table')
        mode = self.config.get('mode', 'overwrite')
        dataframe.write.format("jdbc") \
            .option("url", self.config.get('url')) \
            .option("dbtable", table_name) \
            .option("user", self.config.get('user')) \
            .option("password", self.config.get('password')) \
            .mode(mode) \
            .save()

