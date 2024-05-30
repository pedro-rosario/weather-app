import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';
import { API_PORT } from './src/constants';

app.on('error', (error) => {
  console.log('Unexpected server error:', error);
});

app.listen(API_PORT, () => {
  console.log(`Weather app listening at http://localhost:${API_PORT}`);
});
