import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const generateDagConfig = async (pipelineMetadata: any) => {
  const dagConfig = {
    tenant: 'tenant1',
    workspace: 'databricks-workspace',
    auth: { token: 'mock-token' },
    pipeline: pipelineMetadata,
  };

  const tempYamlPath = path.join(__dirname, `temp_pipeline_${pipelineMetadata.id}.yml`);
  fs.writeFileSync(tempYamlPath, yaml.dump(dagConfig), 'utf8');

  return tempYamlPath;
};

export const triggerPipelineExecution = async (pipelineMetadata: any) => {
  const tempYamlPath = await generateDagConfig(pipelineMetadata);
  const command = `python ../engine/engine.py ${tempYamlPath}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      fs.unlinkSync(tempYamlPath); // Clean up temp file
      if (error) {
        console.error(`exec error: ${error}`);
        console.error(`stderr: ${stderr}`);
        return reject(stderr);
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};
