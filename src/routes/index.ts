import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
	return res.send('Olá mundo');
});

router.post('/test', (req, res) => {
	return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export default router;