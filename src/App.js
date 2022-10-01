import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewAllTransactions from "./pages/ViewAllTransactions";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/viewAllTransactions"
            element={<ViewAllTransactions />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
