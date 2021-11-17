import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import onError from '../../../middlewares/errors';

import { allProducts } from '../../../controllers/productsControllers';

const handler = nc({ onError });

dbConnect();

handler.get(allProducts);

export default handler;
