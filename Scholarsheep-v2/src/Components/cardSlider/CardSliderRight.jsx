import { React, useState } from 'react';
import './CardSliderRight.scss';

const CardSliderRight = () => {
  const [active, setActive] = useState('rightSlider1');

  const One = () => {
    return (
      <div className='cardSliderRight__text'>
        <h1 className='cardSliderRight__header'>A child who reads</h1>
        <h6>will be an Adult who thinks</h6>
      </div>
    );
  };

  const Two = () => {
    return (
      <div className='cardSliderRight__text'>
        <h1 className='cardSliderRight__header'>Find a Friend</h1>
        <h6>In your Book</h6>
      </div>
    );
  };
  const Three = () => {
    return (
      <div className='cardSliderRight__text'>
        <h1 className='cardSliderRight__header'>Book is a dream</h1>
        <h6>You hold in your hands</h6>
      </div>
    );
  };

  const Four = () => {
    return (
      <div className='cardSliderRight__text'>
        <h1 className='cardSliderRight__header'> Today A Reader </h1>
        <h6>Tomorrow A Leader</h6>
      </div>
    );
  };

  const Five = () => {
    return (
      <div className='cardSliderRight__text'>
        <h1 className='cardSliderRight__header'>Think Before you Speak</h1>
        <h6>Read Before you think</h6>
      </div>
    );
  };

  return (
    <div className='cardSliderRight'>
      <div className='cardSliderRight__content'>
        <div className='cardSliderRight__heading'>Reading Quotes</div>
        <div>
          {active === 'rightSlider1' && <One />}
          {active === 'rightSlider2' && <Two />}
          {active === 'rightSlider3' && <Three />}
          {active === 'rightSlider4' && <Four />}
          {active === 'rightSlider5' && <Five />}
        </div>
        <div className='cardSliderRight__options'>
          <button
            className={
              active === 'rightSlider1'
                ? 'cardSliderRight__option cardSliderRight__option-active'
                : 'cardSliderRight__option'
            }
            value='rightSlider1'
            onClick={(e) => setActive(e.target.value)}
          >
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>

          <button
            className={
              active === 'rightSlider2'
                ? 'cardSliderRight__option cardSlider__option-active'
                : 'cardSliderRight__option'
            }
            value='rightSlider2'
            onClick={(e) => setActive(e.target.value)}
          >
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>

          <button
            className={
              active === 'rightSlider3'
                ? 'cardSliderRight__option cardSliderRight__option-active'
                : 'cardSliderRight__option'
            }
            value='rightSlider3'
            onClick={(e) => setActive(e.target.value)}
          >
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>

          <button
            className={
              active === 'rightSlider4'
                ? 'cardSliderRight__option cardSliderRight__option-active'
                : 'cardSliderRight__option'
            }
            value='rightSlider4'
            onClick={(e) => setActive(e.target.value)}
          >
            {' '}
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>
          <button
            className={
              active === 'rightSlider5'
                ? 'cardSliderRight__option cardSliderRight__option-active'
                : 'cardSliderRight__option'
            }
            value='rightSlider5'
            onClick={(e) => setActive(e.target.value)}
          >
            {' '}
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSliderRight;
