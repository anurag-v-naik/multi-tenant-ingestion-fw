The backend provides a RESTful API to manage the framework's components. All endpoints require authentication.

Connectors
Manage data sources and destinations.

Method

Endpoint

Description

GET

/api/connectors

Retrieves a list of all connectors.

POST

/api/connectors

Creates a new connector.

PUT

/api/connectors/:id

Updates an existing connector by ID.

DELETE

/api/connectors/:id

Deletes a connector by ID.

Example POST Request Body:

{
  "name": "sales_db_source",
  "type": "PostgreSQLConnector",
  "config": {
    "url": "jdbc:postgresql://host:port/database",
    "user": "user",
    "password": "password",
    "table": "sales_data"
  }
}

Processors
Manage data transformation modules.

Method

Endpoint

Description

GET

/api/processors

Retrieves a list of all processors.

POST

/api/processors

Creates a new processor definition.

PUT

/api/processors/:id

Updates an existing processor definition by ID.

DELETE

/api/processors/:id

Deletes a processor definition by ID.

Example POST Request Body:

{
  "name": "data_anonymizer",
  "type": "AnonymizationProcessor",
  "config_template": {
    "sensitive_fields": []
  }
}

Pipelines
Define and run end-to-end data flows.

Method

Endpoint

Description

GET

/api/pipelines

Retrieves a list of all pipelines.

POST

/api/pipelines

Creates a new pipeline.

PUT

/api/pipelines/:id

Updates an existing pipeline by ID.

DELETE

/api/pipelines/:id

Deletes a pipeline by ID.

POST

/api/pipelines/:id/run

Triggers an immediate execution of a pipeline.

Example POST Request Body:

{
  "name": "sales_to_reporting",
  "source_connector_id": 1,
  "target_connector_id": 2,
  "processor_configs": [
    {
      "name": "data_anonymizer",
      "config": {
        "sensitive_fields": ["email", "phone"]
      }
    },
    {
      "name": "column_selector",
      "config": {
        "columns": ["id", "name", "email"]
      }
    }
  ]
}

Schedules
Manage scheduled pipeline executions.

Method

Endpoint

Description

GET

/api/schedules

Retrieves a list of all schedules.

POST

/api/schedules

Creates a new schedule.

PUT

/api/schedules/:id

Updates an existing schedule by ID.

DELETE

/api/schedules/:id

Deletes a schedule by ID.

Example POST Request Body:

{
  "name": "nightly_sales_job",
  "pipeline_id": 1,
  "cron_syntax": "0 2 * * *"
}

