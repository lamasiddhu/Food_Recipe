import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/ProfilePage";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Pages/Home";
import ExploreRecipes from "./Pages/Recip";
import Settings from "./Pages/Settings";
import UserTable from "./Pages/UserTable";
import AddRecipeTable from "./Pages/AddRecipeTable";
import AdminDashboard from "./Pages/AdminDashboard"; // ✅ No space in file name
import Feedback from "./Pages/Feedback"; // ✅ Import the feedback page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editprofile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="usertable" element={<UserTable />} />
          <Route path="addrecipetable" element={<AddRecipeTable />} />
          <Route path="feedback" element={<Feedback />} /> {/* ✅ Feedback under Admin */}
        </Route>

        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editprofile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="usertable" element={<UserTable />} />
          <Route path="addrecipetable" element={<AddRecipeTable />} />
          <Route path="feedback" element={<Feedback />} /> {/* ✅ Feedback under Dashboard */}
        </Route>

        {/* Explore Recipes Page (Not nested) */}
        <Route path="/recipe" element={<ExploreRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
