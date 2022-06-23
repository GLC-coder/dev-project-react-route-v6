import { useRef, useEffect } from 'react';
import { addComment } from '../../library/api';
import useHttp from '../../hooks/use-http';

import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest, error, status } = useHttp(addComment);

  const {showComments, quoteId} =props

  useEffect(()=> {
    if(status === "completed" && !error){
      showComments();
    }

  }, [status, error, showComments])


  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText =  commentTextRef.current.value;

    sendRequest({
      commentData: {text:enteredText},
      quoteId : quoteId
    })

  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
    {status === "pending" && <div className='centered'><LoadingSpinner /></div>}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
