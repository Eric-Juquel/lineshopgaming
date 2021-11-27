import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import { userOrders, createOrder } from '../../../../controllers/orderControllers';

import { isAuthenticatedUser } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(userOrders);
handler.use(isAuthenticatedUser).post(createOrder);

export default handler;