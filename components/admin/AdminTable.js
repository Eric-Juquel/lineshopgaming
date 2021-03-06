import { useRef } from 'react';
import classes from './AdminScreen.module.scss';
import Moment from 'react-moment';
import Link from 'next/link';
import Image from 'next/image';

import { GiSplitCross } from 'react-icons/gi';
import { FaUserGraduate } from 'react-icons/fa';
import { FaUserLock } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { FaUserMinus } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { GiEmptyMetalBucketHandle } from 'react-icons/gi';

import Paginate from '../ui/Paginate';
import BackBtn from '../ui/BackBtn';

const AdminTable = ({
  items,
  resPerPage,
  itemsCount,
  currentPage,
  numOfPages,
  label,
  sort,
  setSort,
  order,
  setOrder,
}) => {
  const containerRef = useRef();

  const scrollToTopHandler = () => {
    setTimeout(() => {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const table = {
    title: items.title,
    link: items.link,
    itemRaws: items.raws,
  };

  const { title, link, itemRaws } = table;

  const setSortOptions = (key, order) => {
    setSort(key);
    setOrder(order === -1 ? 1 : -1);
  };

  return itemRaws.length === 0 ? (
    <h4>No Current {title}</h4>
  ) : (
    <>
      <div className={classes.itemTable}>
        <div className={classes.entitled}>
          {itemRaws[0].map((item) => (
            <h4
              key={item.key}
              className={classes.title}
              onClick={
                item.key !== 'id' && item.key !== 'avatar'
                  ? () => setSortOptions(item.key, order)
                  : null
              }
              title={
                item.key !== 'id' && item.key !== 'avatar' ? 'Sort By' : null
              }
              style={{
                cursor:
                  item.key !== 'id' && item.key !== 'avatar' ? 'pointer' : null,
              }}
            >
              {item.label}
            </h4>
          ))}
        </div>

        <div className={classes.items} ref={containerRef}>
          {itemRaws.map((raw) => {
            return (
              <Link key={raw[0].value} href={`/${link}/${raw[0].value}`}>
                <a title={`View ${title} details and edit`}>
                  <div className={classes.row}>
                    {raw.map((cell) => {
                      return (
                        <div
                          className={`${classes.cell} ${
                            cell.type === 'avatar' ? classes.avatar : null
                          }`}
                          key={cell.key}
                        >
                          {cell.type === 'string' ? (
                            cell.value
                          ) : cell.type === 'date' ? (
                            <Moment format="DD/MM/YY">{cell.value}</Moment>
                          ) : cell.type === 'checkDate' ? (
                            cell.check ? (
                              <span className={classes.success}>
                                <Moment format="DD/MM/YY">{cell.value}</Moment>
                              </span>
                            ) : (
                              <span className={classes.danger}>
                                <GiSplitCross />
                              </span>
                            )
                          ) : cell.type === 'price' ? (
                            `${new Intl.NumberFormat().format(cell.value)} ???`
                          ) : cell.type === 'role' ? (
                            cell.value === 'user' ? (
                              <span className={classes.neutral}>
                                <FaUserLock />
                              </span>
                            ) : cell.value === 'admin' ? (
                              <span className={classes.success}>
                                <FaUserGraduate />
                              </span>
                            ) : (
                              <span className={classes.low}>
                                <FaUserLock />
                              </span>
                            )
                          ) : cell.type === 'avatar' ? (
                            <span className={classes.image}>
                              <Image
                                src={cell.value}
                                alt="user's avatar"
                                width={30}
                                height={30}
                              />
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={classes.paginate}>
        <Paginate
          label={label}
          pages={numOfPages}
          page={currentPage}
          itemsPerPage={resPerPage}
          totalItems={itemsCount}
          scrollToTop={scrollToTopHandler}
          sort={sort}
          order={order}
        />
      </div>
      <div className={classes.back}>
        <BackBtn />
      </div>
    </>
  );
};

export default AdminTable;
