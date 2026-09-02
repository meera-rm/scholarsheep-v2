import React, { useState, useRef, useEffect } from 'react';
import BrushSize from './BrushSize';

const DrawCanvas = ({ selectedTool, setSelectedTool, selectedColor , setSelectedColor,brushWidth, setBrushWidth }) => {

  const canvasRef = useRef(null);

  const contextRef = useRef(null);
  const shapeSnapshotRef = useRef(null);
  const lastPosRef = useRef({ x: 400, y: 200 }); // last known cursor position over the canvas
  const [context, setContext] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [toolDrawings, setToolDrawings] = useState({}); // Store drawings for each tool
  const [textToPlace, setTextToPlace] = useState(''); // typed in the toolbar, stamped on canvas click
  const [bgColor, setBgColor] = useState('#ffffff'); // "Fill" sets this — a real background layer, reusable any number of times


  useEffect(() => {
    const canvas = canvasRef.current;
    // willReadFrequently opts into the software-rendering fast path — this
    // canvas does frequent getImageData/putImageData (undo, shape previews),
    // which is slow/janky on the default GPU-accelerated path.
    const context = canvas.getContext('2d', { willReadFrequently: true });
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
  }, []);

  // Clear/Undo/Redo are one-shot actions, not drawing modes — fire them as
  // soon as they're selected instead of waiting for a canvas drag/click.
  // Each button click carries a unique suffix (see Tools.jsx/BrushSize.jsx)
  // so repeated clicks of the same action re-trigger this effect — otherwise
  // React bails out of re-running it when selectedTool is set to the same
  // value twice in a row (e.g. clicking Undo repeatedly).
  useEffect(() => {
    if (selectedTool.startsWith('clear')) {
      handleClear();
    } else if (selectedTool.startsWith('undo')) {
      handleUndo();
    } else if (selectedTool.startsWith('redo')) {
      handleRedo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool]);



//   const SetPos = (e) => {
//     setMouseData({
//         x: e.clientX,
//         y: e.clientY,
//     });
// };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const placeText = (x, y) => {
    if (!context || !textToPlace.trim()) return;
    const preActionState = context.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setUndoStack((prev) => [...prev, preActionState]);
    setRedoStack([]);
    context.font = `${Math.max(brushWidth * 6, 16)}px sans-serif`;
    context.fillStyle = selectedColor;
    context.fillText(textToPlace, x, y);
  };

  const startDrawing = (e) => {
    const { x, y } = getPos(e);

    setIsDrawing(true);
    setStartX(x);
    setStartY(y);

    if (!context) return;

    // Save the canvas state from BEFORE this action, so undo can restore it.
    const preActionState = context.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setUndoStack((prev) => [...prev, preActionState]);
    setRedoStack([]);
    shapeSnapshotRef.current = preActionState;

    if (selectedTool === 'text') {
      // Type into the toolbar's text field, then click to stamp it — no
      // floating input that needs to grab focus mid-click (that approach
      // was unreliable: the input could lose focus to the same click's
      // mouseup before the user could type anything).
      placeText(x, y);
      return;
    }

    if (selectedTool === 'fill') {
      // A real background layer (canvas CSS background-color), not baked
      // into the canvas's own pixels — so it can be changed any number of
      // times and never conflicts with drawn content. (An earlier version
      // used 'destination-over' compositing, which only paints into
      // transparent pixels — once the canvas was fully opaque, a second
      // fill had nothing left to affect and silently did nothing.)
      setBgColor(selectedColor);
      return;
    }

    if (selectedTool === 'dot') {
      // A dot is a single click/stamp, not a drag — place it immediately.
      context.beginPath();
      context.arc(x, y, brushWidth, 0, 2 * Math.PI);
      context.fillStyle = selectedColor;
      context.fill();
      return;
    }

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e) => {
    // Track cursor position on every hover (not just while dragging), so
    // Enter-to-place-text has a real "last position" to use.
    lastPosRef.current = getPos(e);

    if (isDrawing && context) {
      const { x, y } = getPos(e);
      const toolContext = toolDrawings[selectedTool] || context;

      switch (selectedTool) {
        case 'pencil':
        case 'pen':
          toolContext.lineTo(x, y);
          toolContext.strokeStyle = selectedColor;
          toolContext.lineWidth = brushWidth;
          toolContext.stroke();
          toolContext.lineCap = "round";
          break;
        case 'eraser': {
          // Erases only the pixels under the cursor, not the whole canvas.
          const eraserSize = Math.max(brushWidth * 4, 10);
          context.clearRect(
            x - eraserSize / 2,
            y - eraserSize / 2,
            eraserSize,
            eraserSize
          );
          break;
        }
        case 'crayon':

          toolContext.lineTo(x, y);
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
        case 'line':
          if (shapeSnapshotRef.current) {
            context.putImageData(shapeSnapshotRef.current, 0, 0);
          }
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(x, y);
          context.strokeStyle = selectedColor;
          context.lineWidth = brushWidth;
          context.stroke();
          break;
        case 'square':
          if (shapeSnapshotRef.current) {
            context.putImageData(shapeSnapshotRef.current, 0, 0);
          }
          const squareContext = toolDrawings['square'] || context;
          const sideLength = Math.abs(startX - x);
          squareContext.strokeStyle = selectedColor;
          squareContext.fillRect(startX, startY, sideLength, sideLength);
          break;
        case 'rectangle':
          if (shapeSnapshotRef.current) {
            context.putImageData(shapeSnapshotRef.current, 0, 0);
          }
          const rectangleContext = toolDrawings['rectangle'] || context;
          const width = Math.abs(startX - x);
          const height = Math.abs(startY - y);
          rectangleContext.strokeStyle = selectedColor;
          rectangleContext.fillRect(startX, startY, width, height);
          break;
        case 'circle': {
          if (shapeSnapshotRef.current) {
            context.putImageData(shapeSnapshotRef.current, 0, 0);
          }
          const circleContext = toolDrawings['circle'] || context;
          const radius = Math.sqrt(
            Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
          );
          circleContext.beginPath();
          circleContext.arc(startX, startY, radius, 0, 2 * Math.PI);
          circleContext.fillStyle = selectedColor;
          circleContext.fill();
          break;
        }
        case 'ellipse': {
          if (shapeSnapshotRef.current) {
            context.putImageData(shapeSnapshotRef.current, 0, 0);
          }
          const radiusX = Math.abs(x - startX);
          const radiusY = Math.abs(y - startY);
          context.beginPath();
          context.ellipse(startX, startY, radiusX, radiusY, 0, 0, 2 * Math.PI);
          context.fillStyle = selectedColor;
          context.fill();
          break;
        }
        case 'triangle': {
          if (shapeSnapshotRef.current) {
            context.putImageData(shapeSnapshotRef.current, 0, 0);
          }
          // Isosceles triangle inscribed in the box between the drag's start and current point.
          context.beginPath();
          context.moveTo((startX + x) / 2, startY);
          context.lineTo(startX, y);
          context.lineTo(x, y);
          context.closePath();
          context.fillStyle = selectedColor;
          context.fill();
          break;
        }
        case 'polygon': {
          if (shapeSnapshotRef.current) {
            context.putImageData(shapeSnapshotRef.current, 0, 0);
          }
          // Regular hexagon centered at the drag's start point.
          const sides = 6;
          const polyRadius = Math.sqrt(
            Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
          );
          context.beginPath();
          for (let i = 0; i <= sides; i++) {
            const angle = (i / sides) * 2 * Math.PI - Math.PI / 2;
            const px = startX + polyRadius * Math.cos(angle);
            const py = startY + polyRadius * Math.sin(angle);
            if (i === 0) context.moveTo(px, py);
            else context.lineTo(px, py);
          }
          context.closePath();
          context.fillStyle = selectedColor;
          context.fill();
          break;
        }
        default:
          break;
      }
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (context) {
      const updatedToolDrawings = { ...toolDrawings, [selectedTool]: context };
      setToolDrawings(updatedToolDrawings);
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0 || !context) return;
    const currentState = context.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const previousState = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, currentState]);
    setUndoStack((prev) => prev.slice(0, -1));
    context.putImageData(previousState, 0, 0);
  };

  const handleRedo = () => {
    if (redoStack.length === 0 || !context) return;
    const currentState = context.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const nextState = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, currentState]);
    setRedoStack((prev) => prev.slice(0, -1));
    context.putImageData(nextState, 0, 0);
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
      setBgColor('#ffffff');
    }
  };

  return (
    <div className='menuBar'>

      {selectedTool === 'text' && (
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <input
            type='text'
            value={textToPlace}
            onChange={(e) => setTextToPlace(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                placeText(lastPosRef.current.x, lastPosRef.current.y);
              }
            }}
            placeholder='Type text, then click the canvas to place it (or press Enter for the last position)'
            style={{ padding: '4px 8px', border: '2px solid black', borderRadius: 5, width: 280 }}
          />
        </div>
      )}

      <div className='canvasContainer' style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          style={{ backgroundColor: bgColor, cursor: selectedTool === 'text' ? 'text' : 'crosshair' }}
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