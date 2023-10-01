import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages";
import GitHubCallbackPage from "@/pages/github/callback";
import { Layout } from "./components";
import { ROUTE } from "./constants/route";
import RoomPage from "./pages/room/room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.ROOT} element={<Layout />}>
          <Route path={ROUTE.ROOT} element={<HomePage />} />
          <Route
            path={ROUTE.GITHUB_CALLBACK}
            element={<GitHubCallbackPage />}
          />
          <Route path={ROUTE.ROOM} element={<RoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
