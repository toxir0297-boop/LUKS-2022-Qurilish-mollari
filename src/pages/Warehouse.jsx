import { useEffect, useState } from "react";
import { getProducts } from "../data/storage";


export default function Warehouse(){

  const [products, setProducts] = useState([]);


  useEffect(()=>{

    setProducts(getProducts());

  },[]);



  return (

    <div className="content">

      <h1>🏪 Ombor</h1>


      {
        products.map(item=>(

          <div className="sale-box" key={item.id}>

            <h2>
              {item.name}
            </h2>


            <p>
              📂 Kategoriya: {item.category}
            </p>


            <p>
              💰 Sotuv narxi: {item.price.toLocaleString()} so'm
            </p>


            <h3>
              📦 Qoldiq: {item.stock} {item.unit}
            </h3>


          </div>

        ))
      }


    </div>

  );

}