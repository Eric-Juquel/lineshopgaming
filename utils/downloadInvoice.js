import easyinvoice from 'easyinvoice';
import Moment from 'react-moment';

const downloadInvoice = async (order) => {
  const products = order.orderItems.map((item) => ({
    quantity: item.qty,
    description: item.name,
    tax: 6,
    price: item.price,
  }));

  console.log(orderDate);

  const data = {
    locale: 'en-GB',
    currency: 'EUR',
    taxNotation: 'vat',
    marginTop: 50,
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 25,
    // logo: 'https://res.cloudinary.com/ericjuquel94/image/upload/v1637593348/LineShop/logos/logo2_c2s6g8.png',
    background: 'https://public.easyinvoice.cloud/pdf/sample-background.pdf',
    sender: {
      company: 'LineShop',
      address: 'Sample Street 123',
      zip: '1234 AB',
      city: 'Sampletown',
      country: 'Samplecountry',
    },
    client: {
      company: order.user.firstName,
      email: order.user.email,
      address: order.shippingAddress.address,
      zip: order.shippingAddress.postalCode,
      city: order.shippingAddress.city,
      country: order.shippingAddress.country.label,
    },
    invoiceNumber: order._id,
    invoiceDate: new Date(order.createdAt).toLocaleDateString('en-GB'),
    products: products,
    bottomNotice: 'Kindly pay your invoice within 15 days.',
  };

  const result = await easyinvoice.createInvoice(data);
  easyinvoice.download(`invoice_${order._id}.pdf`, result.pdf);
};

export default downloadInvoice;
