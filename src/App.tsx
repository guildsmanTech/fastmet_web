import {QueryClientProvider} from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements, // Converts <Route> JSX into the route objects the router needs
  Navigate,
  Route, // Declarative route component
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
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
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicy";
import TermsPage from "./pages/legal/Terms";
import PrivacyPolicyPageAppView from "./pages/app-view/legal/PrivacyPolicyApp";
import TermsPageAppView from "./pages/app-view/legal/TermsApp";
import DeleteAccountPage from "./pages/DeleteAccount";
// import SubscriptionPage from "./pages/Subscription";
// import SubscriptionResultPage from "./pages/SubscriptionResult";
import GetQuotePage from "./pages/GetQuote";

const router = createBrowserRouter(
  // Turn the JSX <Route> tree below into route objects
  createRoutesFromElements(
    <>
      {/* Pathless layout route: wraps all children with RootLayout, no URL segment added */}
      <Route element={<RootLayout />} errorElement={<ErrorBoundary />}>
        <Route path="/" element={<Home />} />
        <Route path="/partner-driver" element={<PartnerDriver />} />
        <Route path="/delivery-services" element={<DeliveryServices />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-register" element={<UserRegister />} />

        {/* /blog -> list, /blog/:slug -> single post */}
        <Route path="/blog">
          <Route index element={<BlogList />} /> {/* index = renders at exactly /blog */}
          <Route path=":slug" element={<BlogPost />} />
        </Route>

        {/* /legal/privacy-policy and /legal/terms redirect to /user by default */}
        <Route path="/legal">
          <Route path="privacy-policy">
            <Route index element={<Navigate to="user" replace />} />
            <Route path=":type" element={<PrivacyPolicyPage />} />
          </Route>
          <Route path="terms">
            <Route index element={<Navigate to="user" replace />} />
            <Route path=":type" element={<TermsPage />} />
          </Route>
        </Route>

        <Route path="/get-a-quote" element={<GetQuotePage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />

        {/*
        <Route path="/subscription">
          <Route index element={<SubscriptionPage />} />
          <Route path="result" element={<SubscriptionResultPage />} />
        </Route>
        */}
      </Route>

      {/* App-view routes: no RootLayout, so no navbar/footer inside the mobile app webview */}
      <Route path="app-view">
        <Route path="user-register" element={<UserRegisterAppView />} />
        <Route path="legal">
          {/* Children of /app-view/legal redirect to /app-view/legal/user by default */}
          <Route path="privacy-policy">
            <Route index element={<Navigate to="user" replace />} />
            <Route path=":type" element={<PrivacyPolicyPageAppView />} />
          </Route>
          
          <Route path="terms">
            <Route index element={<Navigate to="user" replace />} />
            <Route path=":type" element={<TermsPageAppView />} />
          </Route>
        </Route>
      </Route>
    </>,
  ),
);

function App() {
  return (
    // Provides the React Query cache to every component in the tree
    <QueryClientProvider client={queryClient}>
      {/* Renders whichever route matches the current URL */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;