import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../library/api";
import useHttp from "../hooks/use-http";
const NewQuote = () => {
  const navigate = useNavigate();

  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [status, navigate]);

  const onAddQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return <QuoteForm onAddQuote={onAddQuoteHandler} isLoading = {status==="pending"}/>;
};
export default NewQuote;
