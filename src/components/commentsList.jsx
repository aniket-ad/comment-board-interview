import React from 'react';
import Comment from './Comment';

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
