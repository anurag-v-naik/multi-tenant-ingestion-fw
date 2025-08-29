import { DataTypes, Model, Optional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from './index';

// --- Connector Model ---
interface ConnectorAttributes {
  id: number;
  name: string;
  type: string;
  config: object;
}

export class Connector extends Model<InferAttributes<ConnectorAttributes>, InferCreationAttributes<ConnectorAttributes>> implements ConnectorAttributes {
  declare id: number;
  declare name: string;
  declare type: string;
  declare config: object;
}

Connector.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
  name: { type: DataTypes.STRING, allowNull: false, unique: true, },
  type: { type: DataTypes.STRING, allowNull: false, },
  config: { type: DataTypes.JSONB, allowNull: false, },
}, {
  sequelize,
  tableName: 'connectors',
});

// --- Processor Model ---
interface ProcessorAttributes {
  id: number;
  name: string;
  type: string;
  config_template: object;
}

export class Processor extends Model<InferAttributes<ProcessorAttributes>, InferCreationAttributes<ProcessorAttributes>> implements ProcessorAttributes {
  declare id: number;
  declare name: string;
  declare type: string;
  declare config_template: object;
}

Processor.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
  name: { type: DataTypes.STRING, allowNull: false, unique: true, },
  type: { type: DataTypes.STRING, allowNull: false, },
  config_template: { type: DataTypes.JSONB, allowNull: false, },
}, {
  sequelize,
  tableName: 'processors',
});

// --- Pipeline Model ---
interface PipelineAttributes {
  id: number;
  name: string;
  source_connector_id: number;
  target_connector_id: number;
  processor_configs: object[];
}

export class Pipeline extends Model<InferAttributes<PipelineAttributes>, InferCreationAttributes<PipelineAttributes>> implements PipelineAttributes {
  declare id: number;
  declare name: string;
  declare source_connector_id: number;
  declare target_connector_id: number;
  declare processor_configs: object[];
}

Pipeline.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
  name: { type: DataTypes.STRING, allowNull: false, unique: true, },
  source_connector_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'connectors', key: 'id' } },
  target_connector_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'connectors', key: 'id' } },
  processor_configs: { type: DataTypes.JSONB, allowNull: false, },
}, {
  sequelize,
  tableName: 'pipelines',
});

// --- Schedule Model ---
interface ScheduleAttributes {
  id: number;
  name: string;
  pipeline_id: number;
  cron_syntax: string;
}

export class Schedule extends Model<InferAttributes<ScheduleAttributes>, InferCreationAttributes<ScheduleAttributes>> implements ScheduleAttributes {
  declare id: number;
  declare name: string;
  declare pipeline_id: number;
  declare cron_syntax: string;
}

Schedule.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
  name: { type: DataTypes.STRING, allowNull: false, unique: true, },
  pipeline_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'pipelines', key: 'id' } },
  cron_syntax: { type: DataTypes.STRING, allowNull: false, },
}, {
  sequelize,
  tableName: 'schedules',
});

