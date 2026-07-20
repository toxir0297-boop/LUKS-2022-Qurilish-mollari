import { useEffect, useState } from "react";
import { getProducts } from "../data/storage";
import SearchBox from "../components/SearchBox";

export default function Warehouse() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function isLowStock(item) {
    const stock = Number(item.stock);

    switch (item.unit) {
      case "qop":
      case "metr":
      case "m²":
        return stock <= 50;

      case "dona":
      case "kg":
      case "litr":
        return stock <= 10;

      default:
        return false;
    }
  }

  return (
    <div className="content">

      <h1>🏪 Ombor</h1>

      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Mahsulot qidiring..."
      />

      <br />

      <table className="product-table">

        <thead>
          <tr>
            <th>№</th>
            <th>Mahsulot</th>
            <th>Kategoriya</th>
            <th>Birlik</th>
            <th>Sotuv narxi</th>
            <th>Qoldiq</th>
            <th>Holati</th>
          </tr>
        </thead>

        <tbody>

          {products
            .filter(item =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.category.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.unit}</td>

                <td>{item.price.toLocaleString()} so'm</td>

                <td>
                  <span
                    style={{
                      background: isLowStock(item) ? "#ff4d4f" : "#4CAF50",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    {item.stock} {item.unit}
                  </span>
                </td>

                <td>
                  {isLowStock(item)
                    ? "🔴 Kam"
                    : "🟢 Yetarli"}
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}