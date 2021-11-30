import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import { payOrder } from '../../../../controllers/orderControllers';

import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.patch(payOrder);

export default handler;
