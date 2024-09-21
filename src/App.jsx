import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import Login from "./routes/Login";
import Signup from "./routes/SignUp";
import Profile from "./routes/Profile";
import { fetchUserData } from "./services/userServices";
import NotFound from "./routes/NotFound";
import Loading from "./routes/Loading";
import Home from "./routes/Home";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
        }
      })
      .finally(() => {
        // Authentication check is complete, set loading to false
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Return a loading indicator or some other UI
    return <Loading />;
  }

  return (
    <div className="text-white">
      <BrowserRouter>
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/chatwithbot" element={<Layout></Layout>} />
              <Route path="/healthhistory" element={<Layout></Layout>} />
              <Route path="/nearbydoctors" element={<Layout></Layout>} />
              <Route path="/helpcenter" element={<Layout></Layout>} />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/helpcenter" element={<Layout></Layout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;