import { Navigate, Route, Routes } from "react-router-dom";

import {
  AuthProvider,
  AuthenticationProvider,
  ProtectedRoute,
} from "./context/AuthContext";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Checkin from "./pages/Checkin";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Guest from "./pages/Guest";
import Guests from "./pages/Guests";
import PageNotFound from "./pages/PageNotFound";
import RouteListing from "./pages/RouteListing";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
// import AuthProvider from "./ui/AuthProvider";

function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          element={
            <AuthenticationProvider>
              <AppLayout />
            </AuthenticationProvider>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                accessibleRoles={["guest"]}
                element={Dashboard}
                route="dashboard"
              />
            }
          />

          <Route
            path="bookings"
            element={<ProtectedRoute element={Bookings} route="bookings" />}
          />
          <Route
            path="bookings/:bookingId"
            element={<ProtectedRoute element={Booking} route="bookings" />}
          />
          <Route
            path="check-in/:bookingId"
            element={<ProtectedRoute element={Checkin} route="bookings" />}
          />
          <Route
            path="cabins"
            element={<ProtectedRoute element={Cabins} route="cabins" />}
          />
          <Route
            path="guests"
            element={<ProtectedRoute element={Guests} route="guests" />}
          />
          <Route
            path="guests/:guestId"
            element={<ProtectedRoute element={Guest} route="guests" />}
          />
          <Route
            path="routes"
            element={<ProtectedRoute element={RouteListing} route="routes" />}
          />
          <Route
            path="settings"
            element={<ProtectedRoute element={Settings} route="settings" />}
          />
          <Route
            path="users"
            element={<ProtectedRoute element={Users} route="users" />}
          />
          <Route path="account" element={<Account />} />
          {/* <Route path="guests/:guestId" element={<Guest />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
          {/* <Route path="users" element={<Users />} /> */}
          {/* <Route path="routes" element={<RouteListing />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
    // </BrowserRouter>
  );
}

export default Router;
