import React from 'react';
import Card from 'react-bootstrap/Card';
import dayjs from 'dayjs';

const Comment = ({ comment }) => {
  return (
    <>
      <Card style={{ width: '24rem', marginTop: '1rem' }}>
        <Card.Body>
          <Card.Text>{comment?.message}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {comment?.name} on {dayjs(comment?.created).format(`dddd h a`)}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Comment;
