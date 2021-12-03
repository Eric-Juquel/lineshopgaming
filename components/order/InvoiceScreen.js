import { useRef } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import OrderPdfScreen from './OrderPdfScreen';
import classes from './OrderScreen.module.scss';

import { useRouter } from 'next/router';

import { useSelector,useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import Modal from '../ui/Modal';

import { CART_CLEAR_ITEMS } from '../../redux/constants/cartConstants';
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants';
import Spinner from '../ui/Spinner';

const InvoiceScreen = () => {
  const router = useRouter();
  const dispatch= useDispatch()

  // Modal
  const modalRef = useRef();

  const { order } = useSelector((state) => state.newOrder);

  const backHomeHandler = () => {
    router.push('/');
    Cookies.remove('cartItems');
    Cookies.remove('shippingAddress');
    Cookies.remove('paymentMethod');
    Cookies.remove('placeOrder');
    dispatch({ type: CART_CLEAR_ITEMS });
    dispatch({ type: ORDER_CREATE_RESET });
  };

  if(!order) return <Spinner />

  return (
    <>
      <div className={classes.invoice}>
        <PDFViewer width="80%" height="80%">
          <OrderPdfScreen order={order} />
        </PDFViewer>

        <h5>
          Download or print this invoice before leaving this page, you won't be
          able to do it again{' '}
        </h5>
        <button onClick={() => modalRef.current.openModal()}>Back Home</button>
      </div>
      <Modal ref={modalRef} height="20rem" width="60rem">
        <div className={classes.quitInvoice}>
          <h4>would you like to quit invoice ?</h4>

          <button
            className={classes.close}
            onClick={() => modalRef.current.closeModal()}
          >
            Cancel
          </button>
          <button className={classes.home} onClick={backHomeHandler}>
            Validate
          </button>
        </div>
      </Modal>
    </>
  );
};

export default InvoiceScreen;
