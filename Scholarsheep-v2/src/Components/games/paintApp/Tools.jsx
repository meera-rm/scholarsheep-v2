import React, { useState } from 'react';
import './Tools.css';

import { BiText } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import { BsTriangle } from 'react-icons/bs';
import { BiRectangle } from 'react-icons/bi';
import { FaPenAlt, FaPencilAlt } from 'react-icons/fa';
import { IoColorFill, IoEllipse } from 'react-icons/io5';
import { FaRegSquare } from 'react-icons/fa';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { CiEraser } from 'react-icons/ci';
import { MdSave } from 'react-icons/md';
import { BiShapePolygon } from 'react-icons/bi';
import { TbClearAll } from 'react-icons/tb';
import { TbPoint } from 'react-icons/tb';
import { IoResizeOutline } from 'react-icons/io5';
import { FaShapes } from 'react-icons/fa';
import { IoIosUndo } from 'react-icons/io';
import { IoIosRedo } from 'react-icons/io';

const Tools = ({ selectedTool, onToolChange }) => {
  const [showPencilDropdown, setShowPencilDropdown] = useState(false);
  const [showShapesDropdown, setShowShapesDropdown] = useState(false);
  // const [tools,Selectedtools] = useState('pencil');

  const handleToolSelection = (selectedTool) => {
    onToolChange(selectedTool); // Update the tool state in the parent component (PaintApp)
  };

  const togglePencilDropdown = () => {
    setShowPencilDropdown(!showPencilDropdown);
  };

  const toggleShapesDropdown = () => {
    setShowShapesDropdown(!showShapesDropdown);
  };

  const handlePencilOptionClick = (option) => {
    console.log(option);

    handleToolSelection(option);
  };

  const handleShapesOptionClick = (option) => {
    handleToolSelection(option);
  };

  return (
    <div className='button-dropdown'>
      <div className='dropdown'>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <button className='dropdown-button' onClick={togglePencilDropdown}>
            <FaPencilAlt />
          </button>
          <p>pen/pencil</p>
        </div>

        {showPencilDropdown && (
          <div className='dropdown-content'>
            <button onClick={() => handlePencilOptionClick('Pen')}>
              <FaPenAlt />
            </button>
            <button onClick={() => handlePencilOptionClick('Crayon')}>
              <img
                src='https://img.icons8.com/glyph-neue/20/000000/border-color.png'
                alt=''
              />
            </button>
          </div>
        )}
      </div>

      <div className='dropdown'>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <button className='dropdown-button' onClick={toggleShapesDropdown}>
            <FaShapes />
          </button>
          <p>Shapes</p>
        </div>
        {showShapesDropdown && (
          <div className='dropdown-content'>
            <button onClick={() => handleShapesOptionClick('Circle')}>
              <FaCircle />
            </button>
            <button onClick={() => handleShapesOptionClick('Rectangle')}>
              <BiRectangle />
            </button>
            <button onClick={() => handleShapesOptionClick('Square')}>
              <FaRegSquare />
            </button>
            <button onClick={() => handleShapesOptionClick('Triangle')}>
              <BsTriangle />
            </button>
            <button onClick={() => handleShapesOptionClick('Polygon')}>
              <BiShapePolygon />
            </button>
            <button onClick={() => handleShapesOptionClick('Ellipse')}>
              <IoEllipse />
            </button>
          </div>
        )}
      </div>
      <div style={{ display: 'block', textAlign: 'center' }}>
        <button
          className='single-button'
          onClick={() => handleToolSelection('Text')}
        >
          <BiText />
        </button>
        <p>Text</p>
      </div>
      <div style={{ display: 'block', textAlign: 'center' }}>
        <button
          className='single-button'
          onClick={() => handleToolSelection('Dot')}
        >
          <TbPoint />
        </button>
        <p>Dot</p>
      </div>
      <div style={{ display: 'block', textAlign: 'center' }}>
        <button
          className='single-button'
          onClick={() => handleToolSelection('Line')}
        >
          <IoResizeOutline />
        </button>
        <p>Line</p>
      </div>
      <div style={{ display: 'block', textAlign: 'center' }}>
        <button
          className='single-button'
          onClick={() => handleToolSelection('Fill')}
        >
          <IoColorFill />
        </button>
        <p>Fill</p>
      </div>
      <div style={{ display: 'block', textAlign: 'center' }}>
        <button
          className='single-button'
          onClick={() => handleToolSelection('Undo')}
        >
          <IoIosUndo />
        </button>
        <p>Undo</p>
      </div>
      <div style={{ display: 'block', textAlign: 'center' }}>
        <button
          className='single-button'
          onClick={() => handleToolSelection('Redo')}
        >
          <IoIosRedo />
        </button>
        <p>Redo</p>
      </div>
    </div>
  );
};

export default Tools;
