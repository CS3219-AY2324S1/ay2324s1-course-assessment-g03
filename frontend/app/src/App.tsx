import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
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
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          PeerPrep - Let your peers help you ace technical interviews
        </title>
        <meta
          name="title"
          content="PeerPrep - Let your peers help you ace technical interviews"
        />
        <meta
          name="description"
          content="PeerPrep is a free tool to practice technical interviews with your peers. Join us today to work towards securing your next job!"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peerprep.net/" />
        <meta
          property="og:title"
          content="PeerPrep - Let your peers help you ace technical interviews"
        />
        <meta
          property="og:description"
          content="PeerPrep is a free tool to practice technical interviews with your peers. Join us today to work towards securing your next job!"
        />
        <meta property="og:image" content="/images/peerprep-meta.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://peerprep.net/" />
        <meta
          property="twitter:title"
          content="PeerPrep - Let your peers help you ace technical interviews"
        />
        <meta
          property="twitter:description"
          content="PeerPrep is a free tool to practice technical interviews with your peers. Join us today to work towards securing your next job!"
        />
        <meta property="twitter:image" content="/images/peerprep-meta.png" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout isNavbarBorderless />}>
            <Route path={ROUTE.ROOT} element={<LandingPage />} />
            <Route
              path={ROUTE.GITHUB_CALLBACK}
              element={<GitHubCallbackPage />}
            />
          </Route>
          <Route element={<Layout isNavbarHidden />}>
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
    </>
  );
}

export default App;
