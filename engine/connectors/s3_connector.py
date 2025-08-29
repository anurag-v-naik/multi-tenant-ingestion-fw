from pyspark.sql import DataFrame
from .base_connector import BaseConnector

class S3Connector(BaseConnector):
    def read(self) -> DataFrame:
        path = self.config.get('path')
        format = self.config.get('format', 'csv')
        return self.spark.read.format(format).load(path)

    def write(self, dataframe: DataFrame):
        path = self.config.get('path')
        format = self.config.get('format', 'iceberg')
        mode = self.config.get('mode', 'overwrite')
        # This is a simplified example. For Iceberg, you would need specific packages.
        dataframe.write.format(format).mode(mode).save(path)
