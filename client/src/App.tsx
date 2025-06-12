import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  useNavigate,
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
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import {
  fetchUsers,
  setCurrentUserToken,
  setCurrentUserUid,
} from "./store/userSlice";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { publicApi } from "./utils/axios";
import CreatePostPage from "./pages/CreatePostPage";

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
        <Route path="create-exchange" element={<CreatePostPage />} />
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUserUid(user.uid));
      } else {
        dispatch(setCurrentUserUid(null));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(setCurrentUserToken(token));
      } else {
        dispatch(setCurrentUserToken(null));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await publicApi.get(
          "http://localhost:8080/api/user"
        );
        dispatch(fetchUsers(userResponse.data));
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
