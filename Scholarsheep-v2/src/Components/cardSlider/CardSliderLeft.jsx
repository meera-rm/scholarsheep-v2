
import { React, useState } from 'react';
import './CardSliderLeft.scss';


const CardSliderLeft = () => {
  const [active, setActive] = useState('leftSlider1');

  const One = () => {
    return (
      <div className='cardSliderLeft__text'>
         <h1 className='cardSliderLeft__header'>Instill love of reading early to</h1>
         <h6>improve confidence and builds independence</h6>
      </div>
    );
  };

  const Two = () => {
    return (
      <div className='cardSliderLeft__text'>
        <h1 classNme='cardSliderLeft__header'>Instill love of reading early to</h1>
        <h6>help a child to develop imagination</h6>
      </div>
    );
  };
  const Three = () => {
    return (
      <div className='cardSliderLeft__text'>
         <h1 className='cardSliderLeft__header'>Instill love of reading early to</h1>
         <h6>expand a child's vocabulary</h6>
      </div>
    );
  };

  const Four = () => {
    return (
      <div className='cardSliderLeft__text'>
        <h1 className='cardSliderLeft__header'>Instill love of reading early to</h1>
        <h6>develop critical thinking</h6>
      </div>
    );
  };

  const Five = () => {
    return (
      <div className='cardSliderLeft__text'>
        <h1 className='cardSliderLeft__header'>Instill love of reading early to</h1>
        <h6>help to build socio-emotional skills</h6>
      </div>
    );
  };

  return (
    <div className='cardSliderLeft'>
      <div className='cardSliderLeft__content'>
        <div className='cardSliderLeft__heading'>Benefits of reading</div>
        <div>
          {active === 'leftSlider1' && <One />}
          {active === 'leftSlider2' && <Two />}
          {active === 'leftSlider3' && <Three />}
          {active === 'leftSlider4' && <Four />}
          {active === 'leftSlider5' && <Five />}
        </div>
        <div className='cardSliderLeft__options'>
          <button
            className={
              active === 'leftSlider1'
                ? 'cardSliderLeft__option cardSliderLeft__option-active'
                : 'cardSliderLeft__option'
            }
            value='leftSlider1'
            onClick={(e) => setActive(e.target.value)}
          >
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>

          <button
            className={
              active === 'leftSlider2'
                ? 'cardSliderLeft__option cardSliderLeft__option-active'
                : 'cardSliderLeft__option'
            }
            value='leftSlider2'
            onClick={(e) => setActive(e.target.value)}
          >
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>

          <button
            className={
              active === 'leftSlider3'
                ? 'cardSliderLeft__option cardSliderLeft__option-active'
                : 'cardSliderLeft__option'
            }
            value='leftSlider3'
            onClick={(e) => setActive(e.target.value)}
          >
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>

          <button
            className={
              active === 'leftSlider4'
                ? 'cardSliderLeft__option cardSliderLeft__option-active'
                : 'cardSliderLeft__option'
            }
            value='leftSlider4'
            onClick={(e) => setActive(e.target.value)}
          >
            {' '}
            <i className='fa-sharp fa-regular fa-circle-small'></i>
          </button>
          <button
            className={
              active === 'leftSlider5'
                ? 'cardSliderLeft__option cardSliderLeft__option-active'
                : 'cardSliderLeft__option'
            }
            value='leftSlider5'
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

export default CardSliderLeft;

