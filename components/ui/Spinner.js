import classes from './Spinner.module.scss'
import Image from 'next/image';

const Spinner = () => {
  return (
    <div className={classes.spinnerContainer}>
      <Image
        src="/images/spinner/ZKZg.gif"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Spinner;
