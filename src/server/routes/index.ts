import { Router } from 'express';
import { CitiesController } from '../controllers/cities';

const router = Router();

router.get('/', (_, res) => {
	return res.send('Olá mundo');
	
});

router.get('/cities',
	CitiesController.getAllValidation,
	CitiesController.getAll
);

router.post('/create',
	CitiesController.createValidation,
	CitiesController.create
);

export default router;