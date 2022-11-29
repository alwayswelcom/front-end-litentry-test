import Login from "../pages/Login";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyRoutes } from "./MyRoutes";
import ProtectedRoute from "./ProtectedRoute";
import BaseLayout from "../layout/BaseLayout";
import Dashboard from "../pages/Dashboard";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={MyRoutes.login} element={<Login />} />
        <Route
          path={MyRoutes.secret}
          element={
            <ProtectedRoute>
              <BaseLayout />
            </ProtectedRoute>
          }
        >
          <Route path={MyRoutes.secret} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
