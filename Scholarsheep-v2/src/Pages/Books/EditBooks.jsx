import UpdateBooks from '../../Components/edit/UpdateBooks';

import { HelmetProvider, Helmet } from 'react-helmet-async';
const EditBooks = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Books | Edit</title>
        </Helmet>
      </HelmetProvider>
      <h2 className='text-center mt-10  mb-5 text-5xl font-bold text-teal-600'>
        Edit Books
      </h2>
      <UpdateBooks />
    </div>
  );
};

export default EditBooks;
