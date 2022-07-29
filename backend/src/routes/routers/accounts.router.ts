import { Router } from 'express';
// import { check_auth } from 'src/middleware/auth/check_auth';
import { GetProfile } from 'src/controllers/accounts/get.profile';
import { GetAccount } from 'src/controllers/accounts/get.account';
import { GetAccounts } from 'src/controllers/accounts/get.accounts';
import { PostAccount } from 'src/controllers/accounts/post.account';
import { PutAccount } from 'src/controllers/accounts/put.account';
import { DeleteAccount } from 'src/controllers/accounts/delete.account';
import { cfg } from 'src/util/env';

const accounts_router = Router();

accounts_router.route(cfg.ep.accounts + '/:id').get(GetAccount);

accounts_router.route(cfg.ep.accounts).get(GetAccounts).post(PostAccount);

accounts_router
  // .use(check_auth)
  .route(cfg.ep.accounts)
  .put(PutAccount)
  .patch(PutAccount)
  .delete(DeleteAccount);

accounts_router
  // .use(check_auth)
  .route(cfg.ep.profile)
  .get(GetProfile);

export default accounts_router;
