import serverless from 'serverless-http';
import { app } from '../../packages/backend/src/index';

export const handler = serverless(app);
