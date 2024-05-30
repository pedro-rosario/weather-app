import express from 'express';
import router from './api/router';
import { errorHandler } from './middlewares/error';

const app = express();

app.use(router);
app.use(errorHandler);

export default app;
