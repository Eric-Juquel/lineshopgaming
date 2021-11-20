import classes from './Header.module.scss';

import Logo from './Logo';
import Navigation from './Navigation';
import Searchbar from './Searchbar';
import UserActions from './UserActions';

const Header = () => {
  return (
    <header className="header">
      <div className={classes.container}>
        <div className={classes.logo}>
          <Logo />
        </div>

        <div className={classes.navigation}>
          <Navigation />
        </div>

        <div className={classes.searchbar}>
          <Searchbar />
        </div>

        <div className={classes.userActions}>
          <UserActions />
        </div>
      </div>
    </header>
  );
};

export default Header;
