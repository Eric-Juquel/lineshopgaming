import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import { createProductReview } from '../../../../controllers/productsControllers'; 

import { isAuthenticatedUser } from '../../../../middlewares/auth'; 
import onError from '../../../../middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(createProductReview);

export default handler;