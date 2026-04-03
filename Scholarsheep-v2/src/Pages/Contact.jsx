import { HelmetProvider, Helmet } from 'react-helmet-async';
import ContactPage from '../Components/common/ContactPage';
function Contact() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Contact</title>
        </Helmet>
      </HelmetProvider>
      <h1 className='text-center text-teal-600 mt-6'>Contact Us</h1>
      <div>
        <ContactPage />
      </div>
    </div>
  );
}

export default Contact;
