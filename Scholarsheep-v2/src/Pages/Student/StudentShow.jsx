import React,{useState, useEffect} from 'react';
import StudentDetails from '../../Components/show/StudentDetails';
import { useLocation ,useNavigate} from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import StudentLogsView from '../../Components/show/StudentLogsView';

const StudentShow = () => {
  // https://codesandbox.io/s/cool-cori-1nqk51?expanddevtools=1&fontsize=14&hidenavigation=1&module=/src/App.js&theme=dark&file=/src/App.js:516-591
  // const location = useLocation();
 
  // const navigate=useNavigate();
  // const [state] = useState(location.state || {})

  // useEffect(() => {
  //   navigate(".", { replace: true });
  // }, [navigate]);
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Student | Show</title>
        </Helmet>
      </HelmetProvider>
      
      <StudentDetails/>
      
      {/* {state? <StudentLogsView /> : <StudentDetails />}   */}
    </div>
  );
};

export default StudentShow;

// https://flaviocopes.com/react-show-different-component-on-click/
// import { useState } from 'react'
// then declare a “state” variable:

// const [state, setState] = useState('start')
// In the JSX you show and hide different components based on this state value:

// function App() {
//   const [state, setState] = useState('start')

//   return (
//     <div>
//       {state === 'start' && (
//         <AddTripButton addTrip={() => setState('add-trip') } />
//       )}

//       {state === 'add-trip' && <AnotherComponent />}
//     </div>
//   )
// }
