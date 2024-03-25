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
import Guest from "./pages/Guest";
import Guests from "./pages/Guests";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import RouteListing from "./pages/RouteListing";
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

          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="check-in/:bookingId" element={<Checkin />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="guests" element={<Guests />} />
          <Route path="guests/:guestId" element={<Guest />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
          <Route path="users" element={<Users />} />
          <Route path="routes" element={<RouteListing />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
    // </BrowserRouter>
  );
}

export default Router;
