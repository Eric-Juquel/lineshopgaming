import Link from 'next/link';
import Image from 'next/image';
import classes from './Logo.module.scss';

const Logo = () => {
  return (
    <Link href="/">
      <a className={classes.logo}>
        <Image
          src="https://res.cloudinary.com/ericjuquel94/image/upload/v1637593345/LineShop/logos/logo_eir33c.png"
          alt="LineShopGaming"
          width={200}
          height={70}
        />
      </a>
    </Link>
  );
};

export default Logo;
