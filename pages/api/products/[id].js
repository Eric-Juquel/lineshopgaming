import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import onError from '../../../middlewares/errors';

import { productDetails } from '../../../controllers/productsControllers';

const handler = nc({ onError });

dbConnect();

handler.get(productDetails);

export default handler;
