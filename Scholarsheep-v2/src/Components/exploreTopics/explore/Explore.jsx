
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import GradeSelector from '../gradeSelector/GradeSelector';
import AutoMenuSelector from '../menuSelector/AutoMenuSelector';
import './Explore.scss';
import gradebanner from '../gradebanner.png';

const options = [
  'All Grades',
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
];

let bookdata = [
  {
    title: 'tom sawuyer',
    author: 'mark twain',
    grade: '1st Grade',
    topic: 'science',
  },
  {
    title: 'tom sawuyer 2',
    author: 'mark twain',
    grade: '2nd Grade',
    topic: 'science',
  },
  {
    title: 'tom sawuyer3',
    author: 'mark twain',
    grade: '1st Grade',
    topic: 'math',
  },
  {
    title: 'tom sawuyer 4',
    author: 'mark twain',
    grade: '5th Grade',
    topic: 'science',
  },
  {
    title: 'tom sawuyer 5',
    author: 'mark twain',
    grade: '1st Grade',
    topic: 'english',
  },
  {
    title: 'tom sawuyer 6',
    author: 'mark twain',
    grade: '1stGrade',
    topic: 'science',
  },
  {
    title: 'tom sawuyer 7',
    author: 'mark twain',
    grade: '1stGrade',
    topic: 'social studies',
  },
];



const Explore = () => {
  const [gradeLevel, setGradeLevel] = useState('1st Grade');
  const [topic, setTopic] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
 
  const booksByGrade =
    gradeLevel !== 'AllGrades'
      ? bookdata.filter((ele) => ele.grade === gradeLevel)
      : bookdata;

  const booksByTopic = topic 
    ? booksByGrade.filter((ele) => ele.topic === topic)
    : booksByGrade;


  return (
    <div className='explore'>
   
      {/* <img
        src={gradebanner}
        style={{
          width: '400px',
          height: '70px',
          textAlign: 'center',
          margin: '100px auto 60px',
        }}
        alt=''
      /> */}

      {/* <div className='explore__container'>
        <GradeSelector gradeLevel={gradeLevel} setGradeLevel={setGradeLevel} />
        <AutoMenuSelector 
        topic={topic} 
        setTopic={setTopic} 
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        
       /> */}

        {/* <div className='testbooklist'>
          {booksByTopic.map((book,index) => {
            return (
              <div className='testbook'  key={index}>
                <div>{book.title}</div>
                <div>{book.author}</div>
              </div>
            );
          })}
          
        </div> 
      </div>*/}
    </div>
  );
};
export default Explore;
