import UpdateLog from '../../Components/edit/UpdateLog';

import { HelmetProvider, Helmet } from 'react-helmet-async';
const EditLogs = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Logs | Edit</title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>Edit</h2>
      <UpdateLog />
    </div>
  );
};

export default EditLogs;
