import nc from 'next-connect';
import dbConnect from '../../../../../config/dbConnect';

import { payOrder } from '../../../../../controllers/orderControllers';

import { isAuthenticatedUser } from '../../../../../middlewares/auth';
import onError from '../../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).patch(payOrder);

export default handler;
