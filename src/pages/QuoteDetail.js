import React, { useEffect } from "react";
import { useParams ,Outlet } from "react-router-dom";

import { getSingleQuote } from "../library/api";
import useHttp from "../hooks/use-http";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();

  const {
    data: loadedQuote,
    error,
    status,
    sendRequest,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote) {
    return <p>No Quote Found!</p>;
  }
  return (
    <React.Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Outlet />
    </React.Fragment>
  );
};
export default QuoteDetail;
