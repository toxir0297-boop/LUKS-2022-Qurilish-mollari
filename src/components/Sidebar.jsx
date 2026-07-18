import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  return (

    <aside className="sidebar">

      <h2>LUKS ERP</h2>

      <ul>

        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            🏠 Dashboard
          </Link>
        </li>


        <li className={location.pathname === "/products" ? "active" : ""}>
          <Link to="/products">
            📦 Mahsulotlar
          </Link>
        </li>


        <li className={location.pathname === "/warehouse" ? "active" : ""}>
          <Link to="/warehouse">
            🏪 Ombor
          </Link>
        </li>


        <li className={location.pathname === "/sales" ? "active" : ""}>
          <Link to="/sales">
            🛒 Sotuv
          </Link>
        </li>


        <li className={location.pathname === "/debtors" ? "active" : ""}>
          <Link to="/debtors">
            💳 Qarzdorlar
          </Link>
        </li>


        <li className={location.pathname === "/purchase" ? "active" : ""}>
          <Link to="/purchase">
            🚚 Xarid
          </Link>
        </li>


        <li>
          <Link to="#">
            👥 Mijozlar
          </Link>
        </li>


        <li>
          <Link to="#">
            🏭 Ta'minotchilar
          </Link>
        </li>


        <li>
          <Link to="#">
            📊 Hisobotlar
          </Link>
        </li>


        <li>
          <Link to="#">
            ⚙️ Sozlamalar
          </Link>
        </li>


      </ul>

    </aside>

  );

}