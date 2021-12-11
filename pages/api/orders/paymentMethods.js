import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { paymentOptions } from '../../../controllers/orderControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.get(paymentOptions);

export default handler;