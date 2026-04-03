import LogDetails from '../../Components/show/LogDetails';
import { HelmetProvider, Helmet } from 'react-helmet-async';
const ShowLogs = () => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Logs | Show</title>
        </Helmet>
      </HelmetProvider>
      <LogDetails />
    </div>
  );
};

export default ShowLogs;
