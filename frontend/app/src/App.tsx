import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import { ROUTE } from "@/constants/route";
import LandingPage from "@/pages";
import GitHubCallbackPage from "@/pages/github/callback";
import HomePage from "@/pages/home";
import JoinPage from "@/pages/home/join";
import RoomPage from "./pages/room/[roomId]";
import ProfilePage from "./pages/profile/[userId]";
import SettingsPage from "./pages/settings";
import QuestionsPage from "./pages/questions";
import QuestionsList from "./features/questions/components/QuestionsList";
import QuestionDetails from "./features/questions/components/QuestionDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout isNavbarBorderless />}>
          <Route path={ROUTE.ROOT} element={<LandingPage />} />
          <Route
            path={ROUTE.GITHUB_CALLBACK}
            element={<GitHubCallbackPage />}
          />
          <Route path={ROUTE.ROOM_ROOMID} element={<RoomPage />} />
        </Route>
        <Route element={<Layout requireAuthentication isNavbarBorderless />}>
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route path={ROUTE.HOME_JOIN} element={<JoinPage />} />
          <Route path={ROUTE.QUESTIONS} element={<QuestionsPage />}>
            <Route path={ROUTE.QUESTION_ID} element={<QuestionDetails />} />
            <Route index element={<QuestionsList />} />
          </Route>
          <Route path={ROUTE.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTE.PROFILE_USERID} element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
