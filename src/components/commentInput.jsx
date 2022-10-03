import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const initialDefaultFormState = {
  name: '',
  message: ''
};

const CommentInput = () => {
  const [submitted, setSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const [form, setForm] = useState(initialDefaultFormState);

  const handleNameChange = event => {
    event.persist();
    setForm(form => ({
      ...form,
      name: event.target.value
    }));
  };

  const handleMessageChange = event => {
    event.persist();
    setForm(form => ({
      ...form,
      message: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    // We convert the React state to a formBody to url encode and send it as the POST body
    const formBody = Object.keys(form)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(form[key]))
      .join('&');

    fetch('http://localhost:3001/createComment', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(async response => {
        if (response.ok) {
          return response;
        }

        // either backend is down or validation error
        if (response.status === 400) {
          // bad inputs to request
          // validation errors are json
          const validationErrors = await response.json();
          setGlobalError(validationErrors.message);
        } else {
          // backend is probably down
          throw new Error('Something went wrong talking to backend'); // go to catch
        }
      })
      .then(response => response?.json())
      .then(response => {
        if (response) {
          // successfully commented
          setSubmitted(true);
          // remove errors
          setGlobalError('');
          // reset input fields
          setForm(initialDefaultFormState);
        }
      })
      .catch(async error => {
        console.log('Should not reach here');
        setGlobalError(error.message);
      });

    setSubmitted(true);

    return false;
  };
  return (
    <>
      {!globalError && submitted && (
        <Alert variant="success">Success! Thank you for commenting</Alert>
      )}

      {globalError && <Alert variant="danger">{globalError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form?.name}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Control
            as="textarea"
            name="message"
            value={form?.message}
            onChange={handleMessageChange}
            type="text"
            placeholder="Enter your comment"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Comment
        </Button>
      </Form>
    </>
  );
};

export default CommentInput;
