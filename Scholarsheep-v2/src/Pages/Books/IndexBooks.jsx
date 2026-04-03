import AllBooks from '../../Components/index/AllBooks';
import { HelmetProvider, Helmet } from "react-helmet-async";

const IndexBooks = () => {
  return (
   
    <div>
    <HelmetProvider>
    <Helmet>
      <title>Scholar Sheep  | Books | All</title>
    </Helmet>
  </HelmetProvider>
      <AllBooks />
   </div>
  );
};

export default IndexBooks;
