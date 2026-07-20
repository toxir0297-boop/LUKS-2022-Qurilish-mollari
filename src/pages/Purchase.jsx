import { useState } from "react";
import { getProducts, saveProducts } from "../data/storage";

export default function Purchase() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  const products = getProducts();

  function addPurchase() {
    if (!productId || !quantity || !buyPrice) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }

    const updated = products.map((item) => {
      if (item.id === Number(productId)) {
        return {
          ...item,
          stock: Number(item.stock) + Number(quantity),
          buyPrice: Number(buyPrice),
        };
      }

      return item;
    });

    saveProducts(updated);

    alert("✅ Omborga qo'shildi");

    setProductId("");
    setQuantity("");
    setBuyPrice("");
  }

  return (
    <div className="content">
      <h1>🚚 Xarid</h1>

      <div className="sale-box">
        <h3>Omborga mahsulot qo'shish</h3>

        <select
          className="sale-input"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Mahsulotni tanlang</option>

          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          className="sale-input"
          type="number"
          placeholder="Miqdor"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className="sale-input"
          type="number"
          placeholder="Xarid narxi"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />

        <button className="sell-btn" onClick={addPurchase}>
          ➕ Omborga qo'shish
        </button>
      </div>
    </div>
  );
}