import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import { ROUTE } from "@/constants/route";
import LandingPage from "@/pages";
import GitHubCallbackPage from "@/pages/github/callback";
import HomePage from "@/pages/home";
import JoinPage from "@/pages/home/join";
import CreatePage from "@/pages/home/create";
import RoomPage from "./pages/room/[roomId]";
import ProfilePage from "./pages/profile/[userId]";
import SettingsPage from "./pages/settings";
import AdminQuestionsPage from "./pages/admin/questions";

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
          <Route path={ROUTE.ROOM_ROOMID} element={<RoomPage />} />
        </Route>
        {/* With border-ful Navbar */}
        <Route element={<Layout requireAuthentication isNavbarBorderless />}>
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.HOME_JOIN} element={<JoinPage />} />
          <Route path={ROUTE.HOME_CREATE} element={<CreatePage />} />
          <Route
            path={ROUTE.ADMIN_QUESTIONS}
            element={<AdminQuestionsPage />}
          />
          <Route path={ROUTE.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTE.PROFILE_USERID} element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
