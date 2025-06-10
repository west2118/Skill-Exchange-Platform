import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Layout from "./components/app/Layout";
import HomePage from "./pages/HomePage";
import NewsfeedPage from "./pages/NewsfeedPage";
import OnboardingPage from "./pages/OnboardingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfilePage from "./pages/UserProfilePage";
import DealStatusPage from "./pages/DealStatusPage";
import ChatPage from "./pages/ChatPage";
import CompletionPage from "./pages/CompletionPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<NewsfeedPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="deals" element={<DealStatusPage />} />
        <Route path="messages" element={<ChatPage />} />
        <Route path="completion" element={<CompletionPage />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
