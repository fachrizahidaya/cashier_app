import { Route, Routes } from "react-router-dom";
import AdminLandingPage from "./pages/AdminLanding";
import { CashierLanding } from "./pages/CashierLanding";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import { useEffect } from "react";
import { loginUser } from "./redux/userSlice";
import { loginAdmin } from "./redux/adminSlice";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TransactionList } from "./pages/TransactionList";
import { AdminTransaction } from "./pages/AdminTransaction";
const url1 = `http://localhost:2000/admin/keepLogin`;
const url2 = `http://localhost:2000/user/keepLogin`;

function App() {
  const dispatch = useDispatch();
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const tokenUser = localStorage.getItem("tokenUser");

  const keepLoginAdmin = async () => {
    try {
      const admin = await Axios.get(url1, {
        headers: {
          Authorization: `Bearer ${tokenAdmin} `,
        },
      });
      dispatch(
        loginAdmin({
          id: admin.data.id,
          username: admin.data.username,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginUser = async () => {
    try {
      const user = await Axios.get(url2, {
        headers: {
          Authorization: `Bearer ${tokenUser} `,
        },
      });
      dispatch(
        loginUser({
          id: user.data.id,
          username: user.data.username,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => {
      tokenAdmin ? keepLoginAdmin() : console.log("Open Library");
    }
    // []
  );
  useEffect(
    () => {
      tokenUser ? keepLoginUser() : console.log("Open Library");
    }
    // []
  );

  return (
    <div>
      <Routes>
        <Route path="/" element={<CashierLanding />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/list" element={<TransactionList />}></Route>
        <Route path="/admin" element={<AdminLandingPage />}></Route>
        <Route path="/admin-home" element={<AdminPage />}></Route>
        <Route path="/admin-transaction" element={<AdminTransaction />}></Route>
      </Routes>
    </div>
  );
}

export default App;
