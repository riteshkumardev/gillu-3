import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser } from "./actions";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRoutes from "./components/PrivateRoute";
// import MiniDrawer from "./containers/HomePage/MiniDrawer";
// import TemporaryDrawer from "./components/Header/index1";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  return (
    <div className="App">
      {/* <Chat /> */}
      <Routes>
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        /> */}

        {/* <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route> */}

        <Route
          path="/"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
          // element={<HomePage />}
        />

        {/* <PrivateRoute path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
