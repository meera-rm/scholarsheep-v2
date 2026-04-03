import StudentLogsView from '../../Components/show/StudentLogsView';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const StudentView = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Sstudent | Edit</title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>
        Edit
      </h2>
      <StudentLogsView />
    </div>
  );
};

export default StudentView;
