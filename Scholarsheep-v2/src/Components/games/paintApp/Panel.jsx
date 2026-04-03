import React, { useState } from 'react';
import './ColorPanel.css';
import  DrawCanvas from './DrawCanvas';

function Panel({ selectedColor, setSelectedColor ,selectedTool,
  setSelectedTool, brushWidth, setBrushWidth}) {
  const [showColors, setShowColors] = useState(false);

  const colors = [
    //orange
    '#ffb089',
    '#FF8142',
    '#ff691e',
    '#d64700',
    '#6b2300',
    // #green
    '#90f8eb',
    '#0decd0',
    '#1dc90a',
    '#75af4c',
    '#088979',
    //pink
    '#f283b9',
    '#f55da7',
    '#ff1fa6',
    '#d90f5f',
    '#a60042',
    //red
    '#f19798',
    '#e85859',
    '#e4393a',
    '#bc191a',
    '#5e0c0d',
    //blue
    '#7cb7d9',
    '#668cd4',
    '#535dd4',
    '#2a37d1',
    '#0413c2',
    //yellow
    '#FFF9c4',
    '#FCE883',
    '#CCCC00',
    '#fffc00',
    '#ffd000',
    //purple
    // "#a689e1",
    '#e0b0ff',
    '#b24bf3',
    '#a06ccb',
    '#51087e',
    '#7921b1',
    //brown
    '#D2b48c',
    '#c19a68',
    '#cd7f32',
    '#783f00',
    '#483c32',
    // #gray
    '#DCDCDC',
    '#adadc9',
    '#787276',
    '#6D7B8D',
    '#343434',
  ];

  const handleMouseEnter = () => {
    setShowColors(true);
  };

  const handleMouseLeave = () => {
    setShowColors(false);
  };
  return (
    <div className='panelContainer'>
     
       <DrawCanvas selectedTool={selectedTool}
                selectedColor={selectedColor}
                brushWidth={brushWidth}
                setBrushWidth={setBrushWidth}
                setSelectedTool={setSelectedTool}/>
      <div
        className='popup-box move'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='color-button'>Choose a color</div>
        {showColors && (
          <div>
            <div className='color-swatch'>
              <div className='color-buttonblock'>
                <div
                  style={{
                    backgroundColor: selectedColor,
                    marginBottom: '0px',
                    width: '20px',
                    height: '20px',
                    border: '2px solid #fff',
                    marginLeft: '60px',
                  }}
                >
                  {' '}
                </div>
              </div>
              <div className='color-list'>
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className='color-item'
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panel;





// const Popup = () => {
//   const [isVisible, setIsVisible] = useState(false);
//    // const [isHovered, setIsHovered] = useState(false);

//   const togglePopup = () => {
//     setIsVisible(!isVisible);
//   };

//   // const handleMouseEnter = () => {
//   //   setIsVisible(true);
//   //   setIsHovered(true);
//   // };

//   // const handleMouseLeave = () => {
//   //   setIsHovered(false);
//   //   setTimeout(() => {
//   //     if (!isHovered) {
//   //       setIsVisible(false);
//   //     }
//   //   }, 300); // Adjust this delay according to your preference
//   // };

//   return (
//     <div className="container">
//       <div className="main-content">
//       </div>
//       {isVisible && (
//         <div className="popup">
//           {/* Your pop-up content */}
//           <button onClick={togglePopup}>Close</button>
//         </div>
//       )}
//     </div>
//     // <div className="container">
//     //   <div className="main-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//     //     {/* Content to trigger popup */}
//     //     <p>Hover over this text to trigger the popup</p>
//     //   </div>
//     //   {isVisible && (
//     //     <div className="popup" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//     //       {/* Your pop-up content */}
//     //       <button onClick={togglePopup}>Close</button>
//     //       {/* Show color button only when not hovered */}
//     //       {!isHovered && (
//     //         <button className="color-button">Choose a color</button>
//     //       )}
//     //     </div>
//     //   )}
//     // </div>

//   );
// };
