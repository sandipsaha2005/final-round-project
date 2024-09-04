/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy, Suspense, useCallback, useEffect } from "react";
import {
  Link,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "@/layout/main-layout";
import { SplashScreen } from "./components/splash-screen";
import { useSelector, useDispatch } from "react-redux";
import { useMeMutation } from "./redux/slices/auth";
import { setAuthUserState } from "./redux/slices/features-slice/user";
import { DashboardLayout } from "./layout/dashboard-layout";

const router = createBrowserRouter([
  {
    path: `/`,
    // element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate to={`${import.meta.env.VITE_SUBFOLDER_NAME}/home`} />
        ),
      },

      {
        path: "/",

        element: <MainLayout />,
        children: [
          {
            path: `/home`,

            lazy: () => import("./pages/home"),
          },
          {
            path: `/registration`,

            lazy: () => import("./pages/registration"),
          },

          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/login`,

            lazy: () => import("./pages/login"),
          },

          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/otp-verify`,

            lazy: () => import("./pages/otpVerify"),
          },

          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/forgot-password`,

            lazy: () => import("./pages/forgot"),
          },
          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/forgot-otp-verify`,

            lazy: () => import("./pages/passwordOtpVerify"),
          },
          // {
					// 	path: `${import.meta.env.VITE_SUBFOLDER_NAME}/faq`,

					// 	lazy: () => import('./pages/faq'),
					// },
					// {
					// 	path: `${import.meta.env.VITE_SUBFOLDER_NAME}/download`,

					// 	lazy: () => import('./pages/download'),
					// },
        ],
      },

      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/dashboard`,

            lazy: () => import("./pages/auth/home"),
          },
          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/forgot-password-auth`,

            lazy: () => import("./pages/auth/forgot-password"),
          },
          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/edit-fc`,

            lazy: () => import("./pages/auth/edit"),
          },
          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/edit-fc-capacity`,

            lazy: () => import("./pages/auth/edit-fc-capacity"),
          },
          {
            path: `${import.meta.env.VITE_SUBFOLDER_NAME}/create-sub-fc`,

            lazy: () => import("./pages/auth/create-fc"),
          },
        ],
      },

      {
        path: "*",
        element: (
          <Navigate to={`${import.meta.env.VITE_SUBFOLDER_NAME}/home`} />
        ),
      },
    ],
  },
]);

export default function Routes() {
  const dispatch = useDispatch();
  const [refreshAuth] = useMeMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const InitializeAuth = useCallback(async () => {
    try {
      // alert('Welcome');
      // console.log('auth');
      const data = await refreshAuth({}).unwrap();
      // console.log(data);
      dispatch(
        setAuthUserState({
          isAuthenticated: "authenticated",
          user: {
            username: data?.data?.username,
            userId: data?.data?.id,
            userrole: data?.data?.userrole,
            name: data?.data?.name,
            districtName: data?.data?.district_name,
            status1: data?.data?.status1,
            status2: data?.data?.status2,
            status3: data?.data?.status3,
          },
          isInitialized: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    InitializeAuth();
  }, [isAuthenticated]);

  return <RouterProvider router={router} fallbackElement={<SplashScreen />} />;
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to={`${import.meta.env.VITE_SUBFOLDER_NAME}/home`}>
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
