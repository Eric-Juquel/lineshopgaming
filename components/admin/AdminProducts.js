import { useState, useRef } from 'react';
import classes from './AdminScreen.module.scss';
import Moment from 'react-moment';
import Link from 'next/link';
import { GiSplitCross } from 'react-icons/gi';
import Paginate from '../ui/Paginate';

const AdminProducts = ({
  items,
  cellsRaw,
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

  return (
    <>
      <div className={classes.itemTable}>
        <div className={classes.entitled}>
          {cellsRaw.map((cell) => (
            <h4
              key={cell.label}
              className={classes.cell}
              onClick={cell.value ? () => setSort(cell.value) : null}
            >
              {cell.label}
            </h4>
          ))}
        </div>

        <div className={classes.items} ref={containerRef}>
          {items.length === 0 ? (
            <h4>No Current {items.title}</h4>
          ) : (
            items.productsRaws.map((item, i) => (
              <Link key={item.id.value} href={`/items/${item.id.value}`}>
                <a>
                  <div key={item.id.value} className={classes.row}>
                    <div className={classes.cell}>{item.id.value}</div>
                    <div className={classes.cell}>{item.name.value}</div>
                    <div className={classes.cell}>
                      <Moment format="DD/MM/YY">{item.createdAt.value}</Moment>
                    </div>
                    <div className={classes.cell}>
                      {new Intl.NumberFormat().format(item.price.value)} €
                    </div>
                    <div className={classes.cell}>
                      <Moment format="DD/MM/YY">{item.updatedAt.value}</Moment>
                    </div>
                    <div className={classes.cell}>
                      {item.actions.value.map((action) => (
                        <span>{action}/</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Link>
            ))
          )}
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

export default AdminProducts;
