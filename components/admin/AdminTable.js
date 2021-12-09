import { useState, useRef } from 'react';
import classes from './AdminScreen.module.scss';
import Moment from 'react-moment';
import Link from 'next/link';

import { GiSplitCross } from 'react-icons/gi';
import { FaUserGraduate } from 'react-icons/fa';
import { FaUserLock } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { FaUserMinus } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { GiEmptyMetalBucketHandle } from 'react-icons/gi';

import Paginate from '../ui/Paginate';

const AdminTable = ({
  items,
  resPerPage,
  itemsCount,
  currentPage,
  numOfPages,
  label,
}) => {
  const containerRef = useRef();
  const [sort, setSort] = useState('');

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

  return itemRaws.length === 0 ? (
    <h4>No Current {title}</h4>
  ) : (
    <>
      <div className={classes.itemTable}>
        <div className={classes.entitled}>
          {itemRaws[0].map((item) => (
            <h4
              key={item.value}
              className={classes.cell}
              onClick={
                item.key !== 'id' && item.key !== 'actions'
                  ? () => setSort(item.key)
                  : null
              }
            >
              {item.label}
            </h4>
          ))}
        </div>

        <div className={classes.items} ref={containerRef}>
          {itemRaws.map((raw) => {
            return (
              <Link href={`/${link}/${raw[0].value}`}>
                <a key={raw[0].value}>
                  <div className={classes.row}>
                    {raw.map((cell) => {
                      return (
                        <div className={classes.cell} key={cell.value}>
                          {cell.type === 'string' ? (
                            cell.value
                          ) : cell.type === 'date' ? (
                            <Moment format="DD/MM/YY">{cell.value}</Moment>
                          ) : cell.type === 'checkDate' ? (
                            cell.check ? (
                              <Moment format="DD/MM/YY">{cell.value}</Moment>
                            ) : (
                              <GiSplitCross />
                            )
                          ) : cell.type === 'price' ? (
                            `${new Intl.NumberFormat().format(cell.value)} €`
                          ) : cell.type === 'role' ? (
                            cell.value === 'user' ? (
                              <span className={classes.danger}>
                                <FaUserLock />
                              </span>
                            ) : cell.value === 'admin' ? (
                              <span className={classes.success}>
                                <FaUserGraduate />
                              </span>
                            ) : (
                              <span className={classes.neutral}>
                                <FaUserLock />
                              </span>
                            )
                          ) : cell.type === 'action' ? (
                            cell.value.map((action, i) => (
                              <span key={action[i]}>{action}/</span>
                            ))
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
        />
      </div>
    </>
  );
};

export default AdminTable;
