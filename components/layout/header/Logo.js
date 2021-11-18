import Link from 'next/link';
import Image from 'next/image';
import classes from './Logo.module.scss';

const Logo = () => {
  return (
    <Link href="/">
      <a className={classes.logo}>
        <Image
          src="/images/logo/logo.png"
          alt="LineShopGaming"
          width={200}
          height={70}
          
        />
      </a>
    </Link>
  );
};

export default Logo;
