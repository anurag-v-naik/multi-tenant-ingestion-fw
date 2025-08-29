export interface Connector {
  id: string;
  name: string;
  sourceType: string;
}

export interface Processor {
  id: string;
  name: string;
  type: string;
  config_template: string;
}

export interface Pipeline {
  id: string;
  name: string;
  source_connector_id: string;
  target_connector_id: string;
  processor_configs: string;
}

export interface TabularHeader {
  key: keyof (Connector | Processor | Pipeline);
  label: string;
}

