import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setCurrentUserId,
  setCurrentUserToken,
  setCurrentUserUid,
} from "./store/userSlice";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { publicApi } from "./utils/axios";
import CreatePostPage from "./pages/CreatePostPage";
import { fetchPosts } from "./store/postSlice";
import { fetchExchanges } from "./store/exchangeSlice";
import ProtectedLayout from "./utils/ProtectedLayout";
import { SessionExchangeForm } from "./pages/SessionExchangeForm";
import { fetchDeals } from "./store/dealSlice";
import AdminDashboardPage from "./admin/Pages/AdminDashboardPage";
import AdminLayout from "./admin/Components/AdminLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<NewsfeedPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="profile/:id" element={<UserProfilePage />} />
          <Route path="deals" element={<DealStatusPage />} />
          <Route path="messages/:id" element={<ChatPage />} />
          <Route path="completion/:id" element={<CompletionPage />} />
          <Route
            path="create-exchange"
            element={<CreatePostPage isEdit={false} />}
          />
          <Route
            path="edit-exchange/:id"
            element={<CreatePostPage isEdit={true} />}
          />
          <Route
            path="add-session/:id"
            element={<SessionExchangeForm isEdit={false} />}
          />
          <Route
            path="edit-session/:id"
            element={<SessionExchangeForm isEdit={true} />}
          />
        </Route>
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();
  const userUid = useSelector((state: any) => state.user.currentUserUid);
  const users = useSelector((state: any) => state.user.users);

  useEffect(() => {
    const user = users?.find((user: any) => user.uid === userUid);

    if (user) {
      dispatch(setCurrentUserId(user._id));
    }
  }, [userUid, users]);

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

        const postResponse = await publicApi.get(
          "http://localhost:8080/api/post"
        );
        dispatch(fetchPosts(postResponse.data));

        const exchangeResponse = await publicApi.get(
          "http://localhost:8080/api/exchange"
        );
        dispatch(fetchExchanges(exchangeResponse.data));

        const dealResponse = await publicApi.get(
          "http://localhost:8080/api/deal"
        );
        dispatch(fetchDeals(dealResponse.data));
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
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
