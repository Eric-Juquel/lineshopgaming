import Image from 'next/image';
import classes from './FlipCard.module.scss';

const FlipCard = ({ product }) => {
  const { image, description, name } = product;
  return (
    <div className={classes.flipcard}>
      <div className={classes.flipcardinner}>
        <div className={classes.flipcardfront}>
          <div className={classes.image}>
            <Image src={image.url || image} alt={name} layout="fill" />
          </div>
        </div>
        <div className={classes.flipcardback}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
