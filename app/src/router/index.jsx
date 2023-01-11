import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import App from "../App";

import AuthGuard from "./guards/AuthGuard";
import LoggedGuard from "./guards/LoggedGuard";
import LoginView from "../views/auth/LoginView";
import LogoutView from "../views/auth/LogoutView";
import RegisterView from "../views/auth/RegisterView";

import HomeView from "../views/HomeView";
import HelpCenterView from "../views/HelpCenterView";
import PageNotFoundView from "../views/PageNotFoundView";
import ProfileView from "../views/account/ProfileView";
import MyTicketsView from "../views/account/MyTicketsView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "/help",
        element: <HelpCenterView />,
      },
      {
        path: "/account",
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ),
        children: [
          {
            path: "profile",
            element: <ProfileView />,
          },
          {
            path: "tickets",
            element: <MyTicketsView />,
          },
          {
            path: "",
            element: <Navigate to="profile" replace />,
          },
          {
            path: "*",
            element: <Navigate to="profile" replace />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LoggedGuard>
        <LoginView />
      </LoggedGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <LoggedGuard>
        <RegisterView />
      </LoggedGuard>
    ),
  },
  {
    path: "/logout",
    element: <LogoutView />,
  },
  {
    path: "*",
    element: <PageNotFoundView />,
  },
]);
