import React from 'react';

const Comment = ({ log, comment }) => {
  // console.log('From comments', log, comments);
  const commentTitle = comment?.filter((comment) => {
    return log.log_id === comment.logs_id;
  });
  return <div>{commentTitle[0]?.teacher_comments}</div>;
};

export default Comment;
