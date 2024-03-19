import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home-page/HomePage";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";
import Header from "./components/header/Header";
import LeaderBoardPage from "./pages/leader-board-page/LeaderBoardPage";
import Login from "./pages/login-page/Login";
import DetailQuestion from "./pages/detail-question-page/DetailQuestion";
import NewQuestion from "./pages/new-question-page/NewQuestion";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/leader-board",
        element: <LeaderBoardPage />,
      },
      {
        path: "/questions/:question_id",
        element: <DetailQuestion />,
      },
      {
        path: "/add",
        element: <NewQuestion />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
