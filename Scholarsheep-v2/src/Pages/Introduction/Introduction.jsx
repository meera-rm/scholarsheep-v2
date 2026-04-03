import React from 'react';
import homepic from '../../Components/asset/boyandmother.webp';
import aboutpic from '../../Components/asset/studentstable.jpeg';

const Introduction =()=>{
    return(
        <div className='mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl '>
<div className='md:flex'>
            <div className=' md:shrink-0'>
              <img
                className='h-96 w-full object-cover md:h-full md:w-80'
                src={homepic}
                alt='Modern building architecture'
              />
            </div>
            <div className='p-8'>
              <p className='block mt-1 text-lg leading-tight font-medium text-black hover:underline'>
                Cultivating reading habits among children{' '}
              </p>

              <p className='mt-2 text-slate-500 text-left'>
                The average American has a reading level equivalent to a seventh
                or eight grade child. During the pandemic children's reading
                scores fell across the nation. Scholar Sheep hopes to improve
                the reading and ignite the passion for reading in today's
                children.
              </p>
            </div>
          </div>
          <div className='md:flex'>
            <div className=' md:shrink-0'>
              <img
                className='h-96 w-full object-cover md:h-full md:w-80'
                src={aboutpic}
                alt='Modern building architecture'
              />
            </div>
            <div className='py-12 px-8'>
              <p className='mt-2 text-slate-500 text-left'>
                We at Scholar Sheep want to get parents involved with their
                children's education. It has been proven that children perform
                better when parents take an active role. We are bridging the gap
                between parent child relationships.
              </p>
            </div>
            </div>

        </div>
    )
}
export default Introduction;