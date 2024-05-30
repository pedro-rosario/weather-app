import express from 'express';
import * as weatherController from './weather/controller';

const router = express();

router.get('/weather', weatherController.getByCity);

export default router;
