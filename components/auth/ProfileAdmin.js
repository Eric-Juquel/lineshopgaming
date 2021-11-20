import classes from './ProfileScreen.module.scss';
import Link from 'next/link';

const ProfileAdmin = () => {
  return (
    <div className={classes.btnGroup}>
      <Link href="/admin/users">Users</Link>

      <Link href="/admin/orders">Orders</Link>

      <Link href="/admin/products">Products</Link>
    </div>
  );
};

export default ProfileAdmin;
