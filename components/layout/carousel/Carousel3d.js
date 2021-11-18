import { useState } from 'react';
import datas from '../../../data/carousel-data.json';
import Image from 'next/image';

const Carousel3d = ({ images }) => {
  const [selection, setSelection] = useState(images);

  const onGames = () => {
    setSelection(images);
  };

  const onConsoles = () => {
    setSelection(() => datas.consoles);
  };

  return (
    <div className="carouselContainer">
      <div className="carousel3d">
        <div className="allPlan">
          {selection.map((image) => (
            <div key={image.id} data-content="ombre" className={`${image.id}`}>
              <Image
                src={image.src}
                alt={image.title}
                width={250}
                height={250}
                // layout="fixed"
              />
            </div>
          ))}
        </div>
      </div>
      <h3>
        Find the latest{' '}
        <span className="selection" onClick={onGames}>
          video games
        </span>{' '}
        for all platforms and the most recents{' '}
        <span className="selection" onClick={onConsoles}>
          {' '}
          consoles
        </span>{' '}
        at the best price.
      </h3>
    </div>
  );
};

export default Carousel3d;
