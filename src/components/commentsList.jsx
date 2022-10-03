import React from 'react';
import Comment from './comment';

const CommentsList = ({ commentsData }) => {
  return (
    <>
      {commentsData?.map((comment, index) => {
        return <Comment key={index} comment={comment} />;
      })}
    </>
  );
};

export default CommentsList;
