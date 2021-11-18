import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { useRouter } from 'next/router';

import classes from './Searchbar.module.scss';

const Searchbar = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    // if (keyword) {
    //   const fullPath = `/products/search/${keyword}`;
    //   router.push(fullPath);
    // } else {
    //   router.push('/products');
    // }
  };

  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input
        className={classes.input}
        type="text"
        name="q"
        placeholder="Search Products"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className={classes.btn}>
        <BsSearch className={classes.icon} />
      </button>
    </form>
  );
};

export default Searchbar;
