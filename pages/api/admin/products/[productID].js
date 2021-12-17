import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import {
  updateProduct,
  deleteProduct,
} from '../../../../controllers/productsControllers';

import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateProduct);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteProduct);

export default handler;
