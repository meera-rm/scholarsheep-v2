import React, { useState, useRef, useEffect } from 'react';
import BrushSize from './BrushSize';

const DrawCanvas = ({ selectedTool, setSelectedTool, selectedColor , setSelectedColor,brushWidth, setBrushWidth }) => {

  const canvasRef = useRef(null);

  const contextRef = useRef(null);
  const [context, setContext] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [toolDrawings, setToolDrawings] = useState({}); // Store drawings for each tool
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.linewidth = 5;
    contextRef.current = context;
    setContext(context);
  }, [canvasRef,context,selectedColor,brushWidth,selectedTool]);



//   const SetPos = (e) => {
//     setMouseData({
//         x: e.clientX,
//         y: e.clientY,
//     });
// };

  const startDrawing = (e) => {
   
    setIsDrawing(true);
    setStartX(e.clientX - canvasRef.current.offsetLeft);
    setStartY(e.clientY - canvasRef.current.offsetTop);
    
    if (context) {
      context.beginPath();
      context.moveTo(startX, startY);
    }
  };

  const draw = (e) => {
    console.log('Start draw',e)
    
    
  
    if (isDrawing && context) {
      const toolContext = toolDrawings[selectedTool] || context;
     
      switch (selectedTool) {
        case 'pencil':
        case 'pen':
          toolContext.lineTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
          );
          toolContext.strokeStyle = selectedColor;
          toolContext.lineWidth = brushWidth;
          toolContext.stroke();            
          toolContext.lineCap = "round";
          console.log(selectedColor,brushWidth)
          break;
        case 'crayon':
          
          toolContext.lineTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
          );
          const hex = selectedColor;
          const alpha=0.5;
          const red = parseInt(hex.slice(1, 3), 16);
          const green = parseInt(hex.slice(3, 5), 16);
          const blue = parseInt(hex.slice(5, 7), 16);
          
          let hex2rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          
          toolContext.strokeStyle = hex2rgba;
          toolContext.lineWidth = brushWidth;
          toolContext.stroke();            
          toolContext.lineCap = "round";
          
          break;
        case 'fill':
          toolContext.fillStyle = selectedColor;
          toolContext.fill();            
          toolContext.lineCap = "round";
          break;
        case 'line':
          console.log('clinetx',e.clientX,e.clientY )
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
          );
          context.strokeStyle = selectedColor;
          context.lineWidth = brushWidth;
          context.stroke();
          break;
        case 'square':
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          const squareContext = toolDrawings['square'] || context;
          const sideLength = Math.abs(
            startX - (e.clientX - canvasRef.current.offsetLeft)
          );
          squareContext.strokeStyle = selectedColor;
          squareContext.fillRect(startX, startY, sideLength, sideLength);
          break;
        case 'dot':
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          context.beginPath();
          context.arc(startX, startY, brushWidth, 0, 2 * Math.PI);
          context.strokeStyle = selectedColor;
          context.fill();
          break;

        case 'rectangle':
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          const rectangleContext = toolDrawings['rectangle'] || context;
          const width = Math.abs(
            startX - (e.clientX - canvasRef.current.offsetLeft)
          );
          const height = Math.abs(
            startY - (e.clientY - canvasRef.current.offsetTop)
          );
          rectangleContext.strokeStyle = selectedColor;
          rectangleContext.fillRect(startX, startY, width, height);
          break;
        case 'circle':
          // context.clearRect(
          //   0,
          //   0,
          //   canvasRef.current.width,
          //   canvasRef.current.height
          // );
          const circleContext = toolDrawings['circle'] || context;
          const radius = Math.sqrt(
            Math.pow(e.clientX - canvasRef.current.offsetLeft - startX, 2) +
              Math.pow(e.clientY - canvasRef.current.offsetTop - startY, 2)
          );
          circleContext.beginPath();
          circleContext.arc(startX, startY, radius, 0, 2 * Math.PI);
          circleContext.strokeStyle = selectedColor;
          circleContext.lineWidth = brushWidth;
          circleContext.stroke();
          break;
        case 'undo':
          handleUndo()
          break;
        case 'redo':
          handleRedo()
          break;
        case 'clear':
            handleClear()
            break;
        default:
          break;
      }
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (context) {
      const canvasData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const updatedToolDrawings = { ...toolDrawings, [selectedTool]: context };
      setToolDrawings(updatedToolDrawings);
      setUndoStack([...undoStack, canvasData]);
      setRedoStack([]);
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, lastState]);
      setUndoStack(undoStack.slice(0, -1));
      context.putImageData(lastState, 0, 0);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, nextState]);
      setRedoStack(redoStack.slice(0, -1));
      context.putImageData(nextState, 0, 0);
    }
  };

  const handleClear = () => {
    if (context) {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setUndoStack([]);
      setRedoStack([]);
    }
  };

  return (
    <div className='menuBar'>
       
      <div className='canvasContainer'>
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
        />
      
      </div>
      {/* <BrushSize brushWidth={brushWidth}  setBrushWidth={setBrushWidth}/> */}
     
    </div>
  );
};

export default DrawCanvas;






// In JavaScript:

// pageX, pageY, screenX, screenY, clientX and clientY returns a number which indicates the number of physical pixels a point is from the reference point. The event point is where the user clicked, the reference point is a point in the upper left. These properties return the horizontal and vertical distance from that reference point.

// pageX and pageY:
// Relative the to the top left of the fully rendered content area in the browser. This reference point is below the url bar and back button in the upper left. This point could be anywhere in the browser window and can actually change location if there are embedded scrollable pages embedded within pages and the user moves a scrollbar.

// screenX and screenY:
// Relative to the top left of the physical screen/monitor, this reference point only moves if you increase or decrease the number of monitors or the monitor resolution.

// clientX and clientY:
// Relative to the upper left edge of the browser window. This point can move when the user moves/resizes the browser around the monitor. This point does not move if the user moves a scrollbar from within the browser.


// https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element?noredirect=1&lq=1