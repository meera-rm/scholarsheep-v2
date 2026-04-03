import React, {useState} from 'react'
import StudentDetails from '../../Components/show/StudentDetails';
 import StudentLogsView from '../../Components/show/StudentLogsView';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const StudentShow = ({option}) => {
    console.log(option)
    const [state, setState] = useState('teacher')
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Student  | Show</title>
        </Helmet>
      </HelmetProvider>
      
    </div>
  );
};

export default StudentShow;