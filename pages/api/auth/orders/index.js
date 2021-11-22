import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import { userOrders } from '../../../../controllers/orderControllers';

import { isAuthenticatedUser } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(userOrders);

export default handler;