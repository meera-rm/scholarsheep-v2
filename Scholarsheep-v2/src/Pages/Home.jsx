import { HelmetProvider, Helmet } from 'react-helmet-async';

import Carousel from './Carousel';
import ScrollToTop from './ScrollToTop';
import UpcomingBooks from './UpcomingBooks/UpcomingBooks';
import SubscriptionForm from './Subscriptions/SubscriptionForm';
import Introduction from './Introduction/Introduction';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50">
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Home</title>
        </Helmet>
      </HelmetProvider>

      <div className="text-center">
        <p className="text-center text-5xl font-bold z-20 pt-10 text-teal-700">
          Welcome to Scholar Sheep
        </p>

        <div className="flex flex-col md:flex-row justify-center">
          <div>
            <div className="flex justify-center items-center py-20">
              <Carousel />
            </div>
            <div className="flex justify-center items-center py-5">
              <Introduction />
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center py-20 px-20">
              <UpcomingBooks />
            </div>
            <div className="flex justify-center items-center py-5 px-20">
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Home;
