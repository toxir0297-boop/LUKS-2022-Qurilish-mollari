import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Debtors from "./pages/Debtors";
import Warehouse from "./pages/Warehouse";
import Purchase from "./pages/Purchase";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function App() {

  return (

    <BrowserRouter>

      <div className="app-layout">

        <Sidebar />

        <div className="main-area">

          <Header />

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />


            <Route
              path="/products"
              element={<Products />}
            />


            <Route
              path="/warehouse"
              element={<Warehouse />}
            />


            <Route
              path="/sales"
              element={<Sales />}
            />


            <Route
              path="/debtors"
              element={<Debtors />}
            />


            <Route
              path="/purchase"
              element={<Purchase />}
            />


          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );

}