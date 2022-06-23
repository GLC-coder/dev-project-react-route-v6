//# sourceURL=dynamicScript.js 
import { Route, Routes, Navigate, Link } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";
import Comments from "./components/comments/Comments";

function App() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
