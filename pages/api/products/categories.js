import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import onError from '../../../middlewares/errors';

import { categoriesOptions } from '../../../controllers/productsControllers';

const handler = nc({ onError });

dbConnect();

handler.get(categoriesOptions);

export default handler;
