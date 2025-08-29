import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './database';
import mainRouter from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', mainRouter);

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced successfully.');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

export default app;
