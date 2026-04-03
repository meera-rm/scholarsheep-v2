import React from 'react';

const Student = ({ log, studentData }) => {
  const studentName = studentData.filter((student) => {
    return log.students_id === student.student_id;
  });
  return <div>{studentName[0]?.student_name}</div>;
};

export default Student;
