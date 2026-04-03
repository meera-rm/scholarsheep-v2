import AllStudents from '../../Components/index/AllStudents';

import { HelmetProvider, Helmet } from 'react-helmet-async';
const StudentIndex = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Student  | All</title>
        </Helmet>
      </HelmetProvider>
      <AllStudents />
    </div>
  );
};

export default StudentIndex;
