import { PDFViewer } from '@react-pdf/renderer';
import OrderPdfScreen from './OrderPdfScreen';
import classes from './OrderScreen.module.scss'

import { useSelector } from 'react-redux';
import { classNames } from 'react-select/dist/declarations/src/utils';

const InvoiceScreen = () => {
  const { order } = useSelector((state) => state.newOrder);

  return (
    <PDFViewer width="1000" height="600" className={classes.invoice}>
      <OrderPdfScreen order={order}/>
    </PDFViewer>
  );
};

export default InvoiceScreen;
