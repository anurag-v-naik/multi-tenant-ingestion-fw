This guide provides a walk-through on how to extend the framework by creating new components.

Core Concepts
Connectors: A connector is responsible for reading data from a source or writing data to a target. It encapsulates the connection logic and is configured via a JSON object.

Processors: A processor is a data transformation step. It takes a Spark DataFrame as input, applies a transformation, and returns a modified DataFrame.

Pipelines: A pipeline is a sequence of one source connector, one or more processors, and one target connector. The output of one step becomes the input of the next.

Creating a New Processor
To add a new data transformation, you simply need to create a new Python class that extends BaseProcessor.

Create the Python file: In the engine/processors directory, create a new file, for example, my_custom_processor.py.

Define the class:

from pyspark.sql import DataFrame
from .base_processor import BaseProcessor
import logging

class MyCustomProcessor(BaseProcessor):
    def process(self, dataframe: DataFrame) -> DataFrame:
        """
        This method contains your custom transformation logic.
        The configuration is available via self.config.
        """
        # Example: Filter records based on a config parameter
        filter_value = self.config.get('min_value', 10)
        logging.info(f"Applying filter for records > {filter_value}")
        return dataframe.filter(dataframe.value > filter_value)

Register the processor: In your backend, you can now create a new processor entry in the database by making an API call to the /api/processors endpoint.

Creating a New Connector
Adding a new data source or destination follows a similar pattern.

Create the Python file: In the engine/connectors directory, create a new file, for example, my_custom_connector.py.

Define the class: Your class must extend BaseConnector and implement at least one of the read or write methods.

from pyspark.sql import DataFrame, SparkSession
from .base_connector import BaseConnector

class MyCustomConnector(BaseConnector):
    def read(self) -> DataFrame:
        """
        Reads data from a custom source.
        """
        # Example: Read from a CSV file
        file_path = self.config.get('path')
        return self.spark.read.csv(file_path, header=True, inferSchema=True)

    def write(self, dataframe: DataFrame):
        """
        Writes data to a custom destination.
        """
        # Example: Write to a different format
        output_path = self.config.get('path')
        dataframe.write.json(output_path, mode="overwrite")

Register the connector: Create a new connector entry in the database via the /api/connectors endpoint.

Building and Running a Pipeline
Once you have your connectors and processors defined, you can build a pipeline.

Create Connectors: First, define a source and a target connector via the API.

Create Processors: Define any processors you want to use.

Create a Pipeline: Create a new pipeline entry that links the source, target, and the configurations for your chosen processors.

Run the Pipeline: You can trigger the pipeline manually using the POST /api/pipelines/:id/run endpoint, or schedule it to run automatically using the POST /api/schedules endpoint.

Contribute.md
This guide outlines the process for contributing to the Data Ingestion Framework.

Prerequisites
Before you begin, ensure you have the following installed and configured:

Node.js (LTS version)

Python 3.8+

Docker (for running the database and other services)

npm or yarn for the frontend/backend

pipenv or conda for the Python engine

Workflow
Clone the Repository: Clone the repository and navigate to the root directory.

Setup: Run the initial setup scripts to install dependencies and configure the environment.

Create a New Branch: Create a new branch from main with a descriptive name for your feature or bug fix.

Implement Your Changes: Write your code, following the existing architectural patterns.

Test Your Changes: Run unit and integration tests to ensure your changes do not introduce any regressions.

Code Style: Ensure your code adheres to the project's style guides. Run linters (e.g., ESLint for JavaScript/TypeScript, Black for Python).

Documentation: Update relevant documentation files to reflect your changes. This includes the API reference for new endpoints or the user guide for new features.

Commit Your Changes: Write clear, concise commit messages.

Submit a Pull Request (PR): Push your branch and open a PR against the main branch. Provide a detailed description of your changes and reference any related issues.

Publishing Updates
Backend: The backend is deployed as a containerized service. Merging to main will trigger a build and deployment to the staging environment.

Frontend: The frontend is a static web application. Changes are built and served from a CDN.

Python Engine: Changes to the engine require a new Docker image build and a push to the container registry. The Databricks/Spark jobs will then need to be configured to use the new image version.
