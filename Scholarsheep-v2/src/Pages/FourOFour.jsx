import PageNotFound from '../Components/pagenotfound/PageNotFound.jsx';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const FourOFour = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Not Found</title>
        </Helmet>
      </HelmetProvider>
      <PageNotFound />
    </div>
  );
};
export default FourOFour;
