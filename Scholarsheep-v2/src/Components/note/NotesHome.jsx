import { React } from 'react';
import NoteSideBar from './NoteSideBar';


const NotesHome = () => {
  return (
    <div>
      <div className='text-xl font-bold ml-2 md:ml-12'>Dashboard</div>
      <div className='flex gap-5'>
        <NoteSideBar />
        <div className='shadow-2xl flow-root my-12 mx-auto  p-10  md:w-9/12'>
          <div className='text-center my-10 mx-5 text-2xl font-bold'>
            Welcome to Notes app
          </div>

          <div className='text-center text-xl leading-8'>
            <div className='text-left w-11/12'>
              NotesApp is your digital canvas for capturing thoughts, organizing
              ideas, and staying productive. Seamlessly jot down to-do lists,
              important reminders, creative inspirations, or daily reflections.
              Keep all your notes in one place, easily accessible from any
              device. With customizable categories or labels, effortlessly sort
              and find your notes. Whether it's for work, study, or personal
              use, NotesApp is your go-to tool for staying organized, boosting
              productivity, and never missing a beat in your daily life.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesHome;
