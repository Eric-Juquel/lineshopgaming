import { useState } from 'react';
import Link from 'next/link';
import classes from './Footer.module.scss';
import { FcCopyright } from 'react-icons/fc';

const Footer = () => {
  const [active, setActive] = useState(true);

  return (
    <footer className="footer">
      <div className={classes.container}>
        {active === true ? (
          <div className={classes.demo}>
            <div className={classes.marquee}>
              <p>
                This is a DEMO store for testing e-commerce fullStack NEXT.JS
                project using modern React Hooks - Sass - Flex - Grid ,
                full responsive(Chrome and Firefox) - The content is purely
                fictious and cannot commit its author...
              </p>
            </div>
            <button onClick={() => setActive(false)}>X</button>
          </div>
        ) : (
          <p className={classes.copyright}>
            <FcCopyright /> Copyright 2021 by
            <Link href="https://eric-j-portfolio.vercel.app/">
              <a title="Visit my Portfolio">Eric Juquel</a>
            </Link>
            . Feel free to use this project for your own purposes, but NOT to
            claim it as your own design. A credit to the original author, Eric
            Juquel, is of course highly appreciated!
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
