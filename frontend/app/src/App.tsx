import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages";
import GitHubCallbackPage from "@/pages/github/callback";
import { Layout } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/github/callback" element={<GitHubCallbackPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
