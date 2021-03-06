import { useState } from "react";
import classes from "./BurgerNavigation.module.scss";
import Navigation from "./Navigation";

const BurgerNavigation = ({user}) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={classes.container}>
      <input
        id="navi"
        type="checkbox"
        className={classes.checkbox}
        checked={isChecked}
        readOnly
      />
      <label htmlFor="navi" className={classes.btn} onClick={checkHandler}>
        <span className={classes.icon}>&nbsp;</span>
      </label>
      <div className={classes.background}></div>
      <div className={classes.navbar}>
        <Navigation setIsChecked={setIsChecked} isChecked={isChecked} user={user}/>
      </div>
    </div>
  );
};

export default BurgerNavigation;
