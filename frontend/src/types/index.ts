export interface Connector {
  id: number;
  name: string;
  type: string;
  config: object;
}

export interface Processor {
  id: number;
  name: string;
  type: string;
  config_template: object;
}

export interface Pipeline {
  id: number;
  name: string;
  source_connector_id: number;
  target_connector_id: number;
  processor_configs: object[];
}

export interface Schedule {
  id: number;
  name: string;
  pipeline_id: number;
  cron_syntax: string;
}

