import NewComments from '../../Components/new/NewComments';

import { HelmetProvider, Helmet } from 'react-helmet-async';
const NewComment = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Comments | New</title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>New Comment</h2>
      <NewComments />
    </div>
  );
};

export default NewComment;
