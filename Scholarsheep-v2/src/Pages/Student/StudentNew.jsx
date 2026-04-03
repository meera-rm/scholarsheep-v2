import NewStudents from '../../Components/new/NewStudents';

import { HelmetProvider, Helmet } from 'react-helmet-async';
const StudentNew = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Student | New</title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>
        New Student
      </h2>
      <NewStudents />
    </div>
  );
};

export default StudentNew;
