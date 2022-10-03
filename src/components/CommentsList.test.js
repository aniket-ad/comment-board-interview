import { render } from '@testing-library/react';
import CommentsList from './CommentsList';

const mockComments = [
  {
    name: 'Foo',
    message: 'Bar'
  },
  {
    name: 'Foo2',
    message: 'Bar2'
  },
  {
    name: 'Foo3',
    message: 'Bar3'
  },
  {
    name: 'Foo4',
    message: 'Bar4'
  }
];

test('render 4 cards for 4 comments', () => {
  const { container } = render(<CommentsList commentsData={mockComments} />);
  expect(container.getElementsByClassName('card').length).toBe(4);
});
