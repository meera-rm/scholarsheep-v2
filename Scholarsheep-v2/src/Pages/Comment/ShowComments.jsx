import CommentDetails from '../../Components/show/CommentDetails';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const ShowComments = () => {
  return (
    <div>
    <HelmetProvider>
    <Helmet>
      <title>Scholar Sheep  | Comments | Show</title>
    </Helmet>
  </HelmetProvider>
      <CommentDetails />
    </div>
  );
};

export default ShowComments;
