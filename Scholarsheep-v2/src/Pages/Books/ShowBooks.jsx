import BookDetails from '../../Components/show/BookDetails';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const ShowBooks = () => {
  return (
    <div>
    <HelmetProvider>
    <Helmet>
      <title>Scholar Sheep  | Books | Show</title>
    </Helmet>
  </HelmetProvider>
      <BookDetails />
    </div>
  );
};

export default ShowBooks;
