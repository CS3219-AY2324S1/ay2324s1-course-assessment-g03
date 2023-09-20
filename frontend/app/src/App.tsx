import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages";
import GitHubCallbackPage from "@/pages/github/callback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/github/callback" element={<GitHubCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
