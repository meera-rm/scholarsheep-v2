import TeacherDetails from '../../Components/show/TeacherDetails';
// import StudentShowChoice from '../../Components/show/StudentShowChoice';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const TeacherShow = () => {
  // const options=1
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Teacher | Show</title>
        </Helmet>
      </HelmetProvider>
      {/* <StudentShowChoice options={options} /> */}
      <TeacherDetails />
    </div>
  );
};

export default TeacherShow;
