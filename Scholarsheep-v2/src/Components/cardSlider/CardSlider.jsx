import { React, useState } from 'react';
import './CardSlider.scss';

import CardSliderLeft from './CardSliderLeft';
import CardSliderRight from './CardSliderRight';

const CardSlider = () => {


  return (
    <div className='cardSliderComponent'>
      <CardSliderLeft/>
      <CardSliderRight />
    </div>
  );
};

export default CardSlider;
