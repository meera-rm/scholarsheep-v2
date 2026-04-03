import AllTeachers from '../../Components/index/AllTeachers';

import { HelmetProvider, Helmet } from 'react-helmet-async';
const TeacherIndex = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Teacher | All</title>
        </Helmet>
      </HelmetProvider>
      <AllTeachers />
    </div>
  );
};

export default TeacherIndex;
