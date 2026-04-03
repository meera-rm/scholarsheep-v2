import React, { useState } from 'react';
import './ColorPanel.css';

const BrushSize=({brushWidth,setBrushWidth})=>{
    
    return( 
        <div className="input-wrapper">
        <div className='brushsize'>{brushWidth}</div>
        <input
        type='range'
        min={1}
        max={15}
        value={brushWidth}
        onChange={(e) => setBrushWidth(parseInt(e.target.value))}
      />
      
      <button className="clear-button" onClick={() => console.log('Clear')}>
       Clear
      </button>
      <button className="save-button" onClick={() => console.log('Save')}>
        Save
      </button>

     </div>

    )
}

export default BrushSize;




// https://stackoverflow.com/questions/15935837/how-to-display-a-range-input-slider-vertically

