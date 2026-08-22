import {QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import DriverRegister from "./pages/DriverRegister";
import RootLayout from "./layout/RootLayout";
import ErrorBoundary from "./pages/Error";
import UserRegister from "./pages/UserRegister";
import BlogPost from "./pages/blog/[slug]";
import BlogList from "./pages/blog/index";
import {queryClient} from "./lib/queryClient";
import PartnerDriver from "./pages/PartnerDriver";
import About from "./pages/About";
import DeliveryServices from "./pages/DeliveryServices";
import UserRegisterAppView from "./pages/app-view/UserRegister";
import DriverRegisterAppView from "./pages/app-view/DriverRegister";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {path: "/", element: <Home />},
      {path: "/partner-driver", element: <PartnerDriver />},
      {path: "/delivery-services", element: <DeliveryServices />},
      {path: "/about", element: <About />},
      {path: "/driver-register", element: <DriverRegister />},
      {path: "/user-register", element: <UserRegister />},
      {
        path: "/blog",
        children: [
          {index: true, element: <BlogList />},
          {path: ":slug", element: <BlogPost />},
        ],
      },
    ],
  },
  {
    path: "app-view",
    children: [
      {path: "user-register", element: <UserRegisterAppView />},
      {path: "driver-register", element: <DriverRegisterAppView />},
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
