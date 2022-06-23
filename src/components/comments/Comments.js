import { useState,useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { getAllComments } from "../../library/api";
import useHttp from "../../hooks/use-http";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList"

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const {quoteId} =params
  const {sendRequest, data: loadedComments, status} = useHttp(getAllComments);

  useEffect(()=> {
    sendRequest(quoteId)
  },[sendRequest, quoteId])

  

  const addCommentsHandler =useCallback(() => {
    sendRequest(quoteId)

  },[sendRequest,quoteId]) ;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;

  if(status === 'pending') {
    comments = <div> className='centered<LoadingSpinner /></div>
  }

  if(status === 'completed' && (loadedComments && loadedComments.length > 0 )) {
    comments = <CommentsList comments={loadedComments} />
  }

  if(status === "completed" && (!loadedComments || loadedComments.length === 0)) {
    comments = <p className='centered'>No Comments Found.</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          showComments={addCommentsHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
