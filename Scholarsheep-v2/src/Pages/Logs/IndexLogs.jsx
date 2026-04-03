import AllLogs from '../../Components/index/AllLogs';
import { HelmetProvider, Helmet } from "react-helmet-async";

const IndexLogs = () => {
  return (
   
    <div>
    <HelmetProvider>
    <Helmet>
      <title>Scholar Sheep  | Logs| All</title>
    </Helmet>
  </HelmetProvider>
      <AllLogs />
   </div>
  );
};

export default IndexLogs;
