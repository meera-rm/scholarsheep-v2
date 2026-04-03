import React from 'react';
import DigitalBookLinks from '../../digitalBookLinks/DigitalBookLinks';
import DisplayTools from '../../tools/SelectTools/DisplayTools';
import Slider from '../../slider/Slider';
import Explore from '../../exploreTopics/explore/Explore';
import BookShelf from '../../bookShelf/BookShelf';
import CardSlider from '../../cardSlider/CardSlider';
import ApiBookSearch from './ApiBookSearch';
import './BookCardList.scss';
import homebackground from './homebackground.png';

const BookCardList = () => {
  return (
    <div>
      <img src={homebackground} alt='' />

      {/* Discover Books — Open Library API Search */}
      <ApiBookSearch />

      <CardSlider />
      <BookShelf />
      <Explore />
      <DisplayTools />
      <DigitalBookLinks />
      <Slider />
    </div>
  );
};

export default BookCardList;
