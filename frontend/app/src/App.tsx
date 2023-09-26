import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import { ROUTE } from "@/constants/route";
import LandingPage from "@/pages";
import GitHubCallbackPage from "@/pages/github/callback";
<<<<<<< HEAD
import { Layout } from "./components";
import { ROUTE } from "./constants/route";
import RoomPage from "./pages/room/room";
=======
import HomePage from "@/pages/home";
import JoinPage from "@/pages/home/join";
import CreatePage from "@/pages/home/create";
>>>>>>> 710372c (feat: setup auth gate and some pages)

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
        <Route element={<Layout requireAuthentication />}>
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.HOME_JOIN} element={<JoinPage />} />
          <Route path={ROUTE.HOME_CREATE} element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
