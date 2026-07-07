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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setCurrentUserId,
} from "./store/userSlice";
import { publicApi } from "./utils/axios";
import CreatePostPage from "./pages/CreatePostPage";
import { fetchPosts } from "./store/postSlice";
import { fetchExchanges } from "./store/exchangeSlice";
import ProtectedLayout from "./utils/ProtectedLayout";
import { SessionExchangeForm } from "./pages/SessionExchangeForm";
import { fetchDeals } from "./store/dealSlice";
import AdminDashboardPage from "./admin/Pages/AdminDashboardPage";
import AdminLayout from "./admin/Components/AdminLayout";
import { EditProfile } from "./pages/EditProfile";
import { useAuth } from "./utils/AuthProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
          <Route path="dashboard" element={<NewsfeedPage />} />
          <Route path="edit-profile/:id" element={<EditProfile />} />
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
  const { user: authUser } = useAuth();

  useEffect(() => {
    if (authUser && authUser._id) {
      dispatch(setCurrentUserId(authUser._id));
    } else {
      dispatch(setCurrentUserId(null));
    }
  }, [authUser, dispatch]);


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
