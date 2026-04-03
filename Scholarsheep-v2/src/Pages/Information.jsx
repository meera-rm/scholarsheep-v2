import { HelmetProvider, Helmet } from 'react-helmet-async';
import leaders from '../Components/asset/readers.webp';
import stressed from '../Components/asset/stressedteacher.jpeg';
import childreadinglog from '../Components/asset/childlogs.jpeg';
import img7 from '../Components/asset/imagine7.jpeg';

function Information() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Scholar Sheep | Information</title>
        </Helmet>
      </HelmetProvider>
      <h1 className='text-center text-teal-600 text-5xl font-bold mt-10'>
        Scholar Sheep
      </h1>


      <div className='mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl w-full'>
        <div className='md:flex'>
          <div className=' md:shrink-0'>
            <img
              className='mt-8 h-96 w-full object-cover md:h-full md:w-80'
              src={leaders}
              alt='a quote readers are leaders'
            />
          </div>
          <div className='p-8 '>
            <h5>
              <b>Develop critical thinking</b>
            </h5>
            <p className='text-left w-full'>
              Instilling a love of reading early gives a child a head start on
              expanding their vocabulary and building independence and
              self-confidence. It helps children learn to make sense not only of
              the world around them but also people, building social-emotional
              skills and of course, imagination. Reading exposes us to other
              styles, other voices, other forms, and other genres of writing.
              Importantly, it exposes us to writing that’s better than our own
              and helps us to improve.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl w-full'>
        <div className='md:flex'>
          <div className=' md:shrink-0'>
            <img
              className='mt-8 h-96 w-full object-cover md:h-full md:w-80'
              src={img7}
              alt='a quote readers are leaders'
            />
          </div>
          <div className='p-8 '>
            <h5>
              <b>Why Scholar sheep</b>
            </h5>
            <p className='text-left w-full'>
              As a company we understand the importance and value of education.
              We are aware of the struggles the teachers go through in order of
              help their students and the lack of funds in schools that makes
              their job harder. Today's children are less interested in reading
              books and gravitate more towards the techonological devices and
              the attractions they offer. At ScholarSheep we are offering our
              ditigized services to bridge the gap to help students read books.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl w-full'>
        <div className='md:flex'>
          <div className=' md:shrink-0'>
            <img
              className='mt-8  w-full object-cover md:h-full md:w-80'
              src={stressed}
              alt='a quote readers are leaders'
            />
          </div>
          <div className='p-8 '>
            <h5>
              <b>Benefits for Teachers</b>
            </h5>
            <p>
              As a teacher , you're able to add your class to keep track of your
              students reading when the student logs on their account. You are
              able to add Books to the growing list of books so that each
              student will have a choice to select books at their reading level.
              As a teacher , you can give feedback to their thoughts about
              reading.As it is ditigized there is no reminding students to
              submit their logs, no handing and printing reading logs to
              distribute and at the click of a button you will be able to view
              the entire class and monitor their progress
            </p>
          </div>
        </div>
      </div>

      <div className='mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl w-full'>
        <div className='md:flex'>
          <div className=' md:shrink-0'>
            <img
              className='mt-8  w-full object-cover md:h-full md:w-80'
              src={childreadinglog}
              alt='a quote readers are leaders'
            />
          </div>
          <div className='p-8 '>
            <h5>
              <b>Benefits for Students</b>
            </h5>
            <h5>Reading—the good and the bad—inspires you</h5>
            <p>
              As a student, you're able to view the list of books at your
              reading level. Once the student has finished with the reading,
              he/she can log in using their parent credentials and enter all the
              details about their reading and their inference of their reading.
              Reading is a critical foundation for developing logic and
              problem-solving skills, exposure to new information, about
              culture, diversity and so on.
            </p>
          </div>
        </div>
      </div>

      {/* 
      <div className='w-11/12'>
        <img  className='flex' width='300' height='300'src={stressed} alt=''/>
         <div className='mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
     
        <h5>
          <b>Benefits for Teachers</b>
        </h5>
        <p>
          As a teacher , you're able to add your class to keep track of your
          students reading when the student logs on their account. You are able
          to add Books to the growing list of books so that each student will
          have a choice to select books at their reading level. As a teacher ,
          you can give feedback to their thoughts about reading.As it is
          ditigized there is no reminding students to submit their logs, no
          handing and printing reading logs to distribute and at the click of a
          button you will be able to view the entire class and monitor their
          progress
        </p>
      </div>
      </div>

      <div className=' w-11/12'>
      <img  className='flex' src={r1} alt='' width='300' height='300'/>
        <div className='mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
     
        <h5>
          <b>Benefits for Students</b>
        </h5>
        <h5>Reading—the good and the bad—inspires you</h5>
        <p>
          As a student, you're able to view the list of books at your reading
          level. Once the student has finished with the reading, he/she can log
          in using their parent credentials and enter all the details about
          their reading and their inference of their reading. Reading is a
          critical foundation for developing logic and problem-solving skills,
          exposure to new information, about culture, diversity and so on.
        </p>
         </div>
      </div> */}
      {/* </div>
      <img className='senior-image'src="https://us.123rf.com/450wm/rumkavodki/rumkavodki2010/rumkavodki201000254/158148260-woman-helping-to-elderly-lady-with-shopping-cartoon-characters-of-volunteer-and-old-woman-at-decorat.jpg?ver=6" />*/}
    </div>
    // </div>
  );
}

export default Information;
