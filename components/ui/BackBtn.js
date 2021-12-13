import { useRouter } from 'next/router';
import { IoIosReturnLeft } from 'react-icons/io';
import classes from './BackBtn.module.scss';

const BackBtn = () => {
const router = useRouter()

  return (
    <button className={classes.backBtn} onClick={() => router.back()}>
      <IoIosReturnLeft />
      Back
    </button>
  );
};

export default BackBtn;
