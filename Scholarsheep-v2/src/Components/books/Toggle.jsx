import React from 'react';
import './Toggle.css';
function Toggle() {
  const [darkToggle, setDarkToggle] = React.useState(false);
  return (
    <div
      class={`h-screen w-full flex items-center justify-center  flex-col ${
        darkToggle && 'dark'
      }`}
    >
      <label class='toggleDarkBtn'>
        <input type='checkbox' onClick={() => setDarkToggle(!darkToggle)} />
        <span class='slideBtnTg round'></span>
      </label>
     
      
    </div>
  );
}
export default Toggle;

// import {useState} from 'react';

// const Toggle =() =>{
//     const [enabled, setEnabled] = useState(false);

//     return (
//         <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
//             <div className="flex">
//                 <label class="inline-flex relative items-center mr-5 cursor-pointer">
//                     <input
//                         type="checkbox"
//                         className="sr-only peer"
//                         checked={enabled}
//                         readOnly
//                     />
//                     <div
//                         onClick={() => {
//                             setEnabled(!enabled);
//                         }}
//                         className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
//                     ></div>
//                     <button className="ml-2 text-sm font-medium text-teal-500 w-20">
//                         ON
//                     </button>
//                 </label>
//             </div>
//         </div>
//     );
// }
// export default  Toggle ;
