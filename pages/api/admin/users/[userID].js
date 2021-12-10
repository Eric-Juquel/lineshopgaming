import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import { userDetails, updateUserRole } from '../../../../controllers/authControllers';

import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(userDetails);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUserRole);

export default handler;