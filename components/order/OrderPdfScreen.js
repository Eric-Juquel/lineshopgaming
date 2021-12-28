import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import Moment from 'react-moment';

// Fonts
// Font.register({family:'Roboto', src: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent:'space-between',
    backgroundColor: '#E4E4E4',
    paddingTop: 35,
    paddingBottom: 10,
    paddingHorizontal: 35,
    fontFamily: 'Helvetica',
  },
  line: {
    marginTop: 15,
    alignSelf: 'center',
    width: '100%',
    height: '2rem',
    borderBottom: '1px solid black',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 180,
    height: 70,
  },
  invoice: {
    fontSize: '30px',
  },
  shop: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    marginTop: 36,
    justifyContent: 'flex-end',
    fontSize: '15px',
  },
  userOrderInfo: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'column',
    fontSize: '15px',
  },
  orderInfo: {
    flexDirection: 'column',
    fontSize: '15px',
  },
  orderItems: {
    marginTop: 36,
    width: '100%',
    flexDirection: 'column',
  },
  itemsTitle: {
    marginBottom: 10,
    fontSize: '17px',
    fontFamily: 'Helvetica-Bold',
  },
  items: {
    marginLeft: 10,
  },
  item: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
    fontSize: '17px',
  },
  itemPrice: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finalPrice: {
    width: '100%',
    height: 100,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    fontSize: '17px',
  },
  lineThin: {
    margin: '5,0',
    width: '40%',
    borderBottom: '1px solid black',
  },
  paid: {
    marginBottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: '13px',
  },
});

// Create Document Component
const OrderPdfScreen = ({ order }) => {
  const paymentDate = <Moment format="DD/MM/YY">{order.paidAt}</Moment>;
  const orderDate = <Moment format="DD/MM/YY">{order.createdAt}</Moment>;
  const totalPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(order.totalPrice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="https://res.cloudinary.com/ericjuquel94/image/upload/v1637593383/LineShop/logos/logo_geg9vd.png"
          />
          <Text style={styles.invoice}>Invoice</Text>
        </View>

        <View style={styles.shop}>
          <Text style={styles.bold}>Lineshop</Text>
          <Text>Sample Street 123</Text>
          <Text>1234 AB, SampleTown</Text>
          <Text>SampleCountry</Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.userOrderInfo}>
          <View style={styles.userInfo}>
            <Text style={styles.bold}>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </Text>
            <Text>{order.shippingAddress.email}</Text>
            <Text>{order.shippingAddress.address} </Text>
            <Text>
              {' '}
              {order.shippingAddress.city} - {order.shippingAddress.postalCode}{' '}
            </Text>
            <Text>{order.shippingAddress.country.label.toUpperCase()}</Text>
          </View>
          <View style={styles.orderInfo}>
            <Text>Order N°: {order._id}</Text>
            <Text styl={styles.bold}>Date: {orderDate}</Text>
          </View>
        </View>

        <View style={styles.line}></View>

        <View style={styles.orderItems}>
          <Text style={styles.itemsTitle}>Order Items</Text>
          <View style={styles.items}>
            {order.orderItems.map((item) => (
              <View style={styles.item} key={item.product}>
                <Text>{item.name}</Text>
                <View style={styles.itemPrice}>
                  <Text>
                    {item.qty} x {item.price} €
                  </Text>
                  <Text> = </Text>
                  <Text>
                    {new Intl.NumberFormat().format(item.qty * item.price)} €
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.line}></View>

        <View style={styles.finalPrice}>
          <View style={styles.itemPrice}>
            <Text>Shipping price</Text>
            <Text> {order.shippingPrice} €</Text>
          </View>
          <View style={styles.itemPrice}>
            <Text>Tax</Text>
            <Text> {order.taxPrice} €</Text>
          </View>
          <View style={styles.lineThin}></View>
          <View style={styles.itemPrice}>
            <Text style={styles.bold}>TOTAL PRICE</Text>
            <Text>=</Text>
            <Text style={styles.bold}>{totalPrice}</Text>
          </View>
        </View>

        <View style={styles.paid}>
          <Text>
            Paid with {order.paymentMethod} on {paymentDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPdfScreen;
