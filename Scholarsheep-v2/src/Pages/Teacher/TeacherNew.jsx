import NewTeachers from '../../Components/new/NewTeachers';

import { HelmetProvider, Helmet } from 'react-helmet-async';
const TeacherNew = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Teacher |New </title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>
        New Teacher
      </h2>
      <NewTeachers />
    </div>
  );
};

export default TeacherNew;
