import { Router } from 'express';
import { GetLogin } from 'src/controllers/login/get.login';

const name_router = Router();
name_router.route('/').get(GetLogin);

export default name_router;
