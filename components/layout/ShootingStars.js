import classes from './ShootingStars.module.scss';

const ShootingStars = () => {
  const stars = [1, 2, 4, 5];

  return (
      
    <div className={classes.night}>
      {stars.map((star, i) => {
        return <div key={i} className={classes.shootingStar}></div>;
      })}
    </div>
  );
};

export default ShootingStars;
