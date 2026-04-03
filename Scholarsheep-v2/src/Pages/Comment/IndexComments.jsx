import AllComments from '../../Components/index/AllComments';
import { HelmetProvider, Helmet } from "react-helmet-async";

const IndexComments = () => {
  return (
   
    <div>
    <HelmetProvider>
    <Helmet>
      <title>Scholar Sheep  | Comments | All</title>
    </Helmet>
  </HelmetProvider>
      <AllComments />
   </div>
  );
};

export default IndexComments;
