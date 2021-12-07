import { useEffect } from 'react';
// import { useSession } from 'next-auth/client';

import Footer from './footer/Footer';
import Header from './header/Header';
import ShootingStars from './ShootingStars';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieConsent, { Cookies } from "react-cookie-consent";

const Layout = (props) => {
  //   const [session] = useSession();

  //   useEffect(() => {
  //     const getUser = async () => {
  //       if (session && session.user && !user) {
  //         await loadUser(userDispatch);
  //       }
  //     };
  //     getUser();
  //   }, []);

  return (
    <>
      {/* <ShootingStars /> */}
      <div className="container">
        <Header />
        <ToastContainer position="bottom-right" style={{ fontSize: '1.8rem' }} />
        <main className="main">{props.children}</main>
        <CookieConsent  style={{fontSize:"20px"}}>This website uses cookies to enhance the user experience.</CookieConsent>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
