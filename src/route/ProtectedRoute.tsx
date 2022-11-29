import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import { MyRoutes } from "./MyRoutes";
import { SERVER_BASE_URL } from "../constants";
import axios from "axios"

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const token = localStorage.getItem("panda-token");
  const [check, setCheck] = useState("loading");

  const checkToken = async (t: string) => {
    const res = await axios.post(`${SERVER_BASE_URL}/access_check`,{}, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
    if (res.status === 200) {
      setCheck("logged");
    } else {
      setCheck("not found");
    }
  };

  useEffect(() => {
    if (token) {
      checkToken(token);
    }
  }, [token]);

  const location = useLocation();
  if (!token || check === "not found") {
    return <Navigate to={MyRoutes.login} replace state={{ from: location }} />;
  }
  if (check === "loading") {
    return <Loading />;
  }
  return children;
};

export default ProtectedRoute;
