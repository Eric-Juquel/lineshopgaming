import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import { newProduct } from '../../../../controllers/productsControllers';

import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(newProduct);

export default handler;
