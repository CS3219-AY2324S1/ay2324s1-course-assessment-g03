import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import { ROUTE } from "@/constants/route";
import LandingPage from "@/pages";
import GitHubCallbackPage from "@/pages/github/callback";
import HomePage from "@/pages/home";
import JoinPage from "@/pages/home/join";
import CreatePage from "@/pages/home/create";
import RoomPage from "./pages/room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* With borderless Navbar */}
        <Route element={<Layout isNavbarBorderless />}>
          <Route path={ROUTE.ROOT} element={<LandingPage />} />
          <Route
            path={ROUTE.GITHUB_CALLBACK}
            element={<GitHubCallbackPage />}
          />
          <Route path={ROUTE.ROOM} element={<RoomPage />} />
        </Route>
        {/* With border-ful Navbar */}
        {/* TODO: ENABLE AUTHENTICATION */}
        <Route element={<Layout />}>
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.HOME_JOIN} element={<JoinPage />} />
          <Route path={ROUTE.HOME_CREATE} element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
