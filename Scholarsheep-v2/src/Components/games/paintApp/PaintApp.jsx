import React, {useState} from 'react';
import  Tools from './Tools';
import  BrushSize from './BrushSize';
import  Panel from './Panel';
// import './PaintApp.css'

const PaintApp=()=>{
    const [selectedTool, setSelectedTool] = useState('pencil');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [brushWidth, setBrushWidth] = useState(2);

    const handleToolChange = (selectedTool) => {
        console.log('select=',selectedTool)
        setSelectedTool(selectedTool);
      };
    

    return(
         <div style={{display:'block'}}>
            <div style={{textAlign:'center',fontSize:'40px',padding:'20px'}}>Paint App</div>
            
              <Tools selectedTool={selectedTool} onToolChange={handleToolChange} />
              {/* <DrawCanvas selectedTool={selectedTool}
                selectedColor={selectedColor}
                brushWidth={brushWidth}
                setBrushWidth={setBrushWidth}
                setSelectedTool={setSelectedTool}/> */}
           
              <Panel selectedColor={selectedColor} setSelectedColor={setSelectedColor} selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
                brushWidth={brushWidth}
                setBrushWidth={setBrushWidth}
                />
             <BrushSize brushWidth={brushWidth}  setBrushWidth={setBrushWidth}/>
              
        </div>
    )
}
export default PaintApp;



      