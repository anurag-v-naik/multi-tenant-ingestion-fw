// api.js

/**
 * A module to handle all API calls to the backend.
 * This is a common practice to centralize all network requests.
 */

// Define the base URL for the backend API.
// In a Docker Compose setup, 'backend' is the service name,
// and it's resolved to the internal IP address of the backend container.
// The port should match the one exposed by the backend container (e.g., 8080).
const API_BASE_URL = 'http://backend:8080';

/**
 * Example function to fetch data from a specific API endpoint.
 * @param {string} endpoint The API endpoint to call (e.g., '/data').
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    // Check if the response was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response.
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    // You can re-throw the error or return a default value as needed.
    throw error;
  }
};

// This is a placeholder for your API logic.
// The key is to make sure the functions are defined and exported.

/**
 * A sample function that retrieves connector data.
 * @returns {Promise<Array>} A promise that resolves to an array of connectors.
 */
const getConnectors = async () => {
  // Replace this with your actual API call (e.g., using fetch or axios)
  try {
    const response = await fetch('/api/connectors');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch connectors:", error);
    return []; // Return an empty array on failure
  }
};

/**
 * A sample function that deletes a specific connector by ID.
 * @param {string | number} connectorId - The ID of the connector to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
 */
const deleteConnector = async (connectorId) => {
  try {
    const response = await fetch(`/api/connectors/${connectorId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to delete connector:", error);
    return false;
  }
};

/**
 * A sample function that retrieves pipeline data.
 * @returns {Promise<Array>} A promise that resolves to an array of pipelines.
 */
const getPipelines = async () => {
  // Replace this with your actual API call
  try {
    const response = await fetch('/api/pipelines');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch pipelines:", error);
    return [];
  }
};

/**
 * A sample function that deletes a specific pipeline by ID.
 * @param {string | number} pipelineId - The ID of the pipeline to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
 */
const deletePipeline = async (pipelineId) => {
  try {
    const response = await fetch(`/api/pipelines/${pipelineId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to delete pipeline:", error);
    return false;
  }
};

/**
 * A sample function to trigger a specific pipeline.
 * @param {string} pipelineId - The ID of the pipeline to run.
 * @returns {Promise<Object>} A promise that resolves to the result of the run.
 */
const runPipeline = async (pipelineId) => {
  try {
    const response = await fetch(`/api/pipelines/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pipelineId })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to run pipeline:", error);
    return { success: false };
  }
};

/**
 * A sample function that retrieves a list of all processors.
 * @returns {Promise<Array>} A promise that resolves to an array of processors.
 */
const getProcessors = async () => {
  try {
    const response = await fetch('/api/processors');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get processors:", error);
    return [];
  }
};

/**
 * A sample function that deletes a specific processor by ID.
 * @param {string | number} processorId - The ID of the processor to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
 */
const deleteProcessor = async (processorId) => {
  try {
    const response = await fetch(`/api/processors/${processorId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to delete processor:", error);
    return false;
  }
};

/**
 * A sample function to add a new processor.
 * @param {Object} processorData - The data for the new processor.
 * @returns {Promise<Object>} A promise that resolves to the new processor's data.
 */
const addProcessors = async (processorData) => {
  try {
    const response = await fetch(`/api/processors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(processorData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add processor:", error);
    return { success: false };
  }
};

/**
 * A sample function that retrieves a list of all schedules.
 * @returns {Promise<Array>} A promise that resolves to an array of schedules.
 */
const getSchedules = async () => {
  try {
    const response = await fetch('/api/schedules');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get schedules:", error);
    return [];
  }
};

/**
 * A sample function that deletes a specific schedule by ID.
 * @param {string | number} scheduleId - The ID of the schedule to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
 */
const deleteSchedule = async (scheduleId) => {
  try {
    const response = await fetch(`/api/schedules/${scheduleId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to delete schedule:", error);
    return false;
  }
};

/**
 * A sample function to add a new schedule.
 * @param {Object} scheduleData - The data for the new schedule.
 * @returns {Promise<Object>} A promise that resolves to the new schedule's data.
 */
const addSchedule = async (scheduleData) => {
  try {
    const response = await fetch(`/api/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add schedule:", error);
    return { success: false };
  }
};

// This line is crucial! It makes the functions available to other files.
// Use 'export' for named exports.
export {
  getConnectors,
  deleteConnector,
  getPipelines,
  deletePipeline,
  runPipeline,
  getProcessors,
  deleteProcessor,
  addProcessors,
  getSchedules,
  deleteSchedule,
  addSchedule
};

