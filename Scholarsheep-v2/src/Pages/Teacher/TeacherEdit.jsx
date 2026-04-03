import UpdateTeacher from '../../Components/edit/UpdateTeacher';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const TeacherEdit = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Teacher |Edit</title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>
        Edit
      </h2>
      <UpdateTeacher />
    </div>
  );
};

export default TeacherEdit;
