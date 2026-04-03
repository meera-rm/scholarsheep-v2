import NewLogs from '../../Components/new/NewLogs';

import { HelmetProvider, Helmet } from 'react-helmet-async';

const NewLog = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Logs | New</title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>
        New Logs
      </h2>
      <NewLogs />
    </div>
  );
};

export default NewLog;
