import React,{Suspense} from 'react';
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Layout from "./layout/Layout";
import Comments from "./components/comments/Comments";
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(()=> import('./pages/NewQuote'))
const AllQuotes = React.lazy(()=> import('./pages/AllQuotes'))
const QuoteDetail = React.lazy(()=> import('./pages/QuoteDetail'))
const NotFound = React.lazy(()=> import('./pages/NotFound'))

function App() {
  return (
    <Layout>
    <Suspense fallback ={<div className='centered'><LoadingSpinner /></div>} >
      <Routes>
        <Route path="/" element={<Navigate to="/quotes" replace />} />
        <Route path="/quotes" element={<AllQuotes />} />
        <Route path="/new-quote" element={<NewQuote />} />
        <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
          <Route
            path=""
            element={
              <div className="centered">
                <Link className="btn--flat" to={`comments`}>
                  Loads comments.
                </Link>
              </div>
            }
          />

          <Route path={`comments`} element={<Comments />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
