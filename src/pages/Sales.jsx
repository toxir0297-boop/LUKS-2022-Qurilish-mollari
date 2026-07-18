import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../data/storage";


export default function Sales() {


  const [products, setProducts] = useState([]);

  const [paymentType, setPaymentType] = useState("cash");

  const [customer, setCustomer] = useState("");

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState("1");



  useEffect(()=>{


    const data = getProducts();


    setProducts(data);


    setProduct(data[0]);


  },[]);





  const total = product
  ? product.price * Number(quantity || 0)
  : 0;






  function handleSale(){


    if(!product){

      return;

    }




    if(product.stock < Number(quantity)){


      alert(
        "❌ Omborda mahsulot yetarli emas!"
      );


      return;


    }





    if(paymentType === "credit" && customer.trim()===""){


      alert(
        "Nasiya uchun mijoz ismini kiriting!"
      );


      return;


    }





    // OMBORDAN AYIRISH


    const warehouse = getProducts();



    const updatedWarehouse = warehouse.map(item=>{


      if(item.id === product.id){


        return {

          ...item,

          stock:item.stock - Number(quantity)

        };


      }


      return item;


    });




    saveProducts(updatedWarehouse);


    setProducts(updatedWarehouse);







    // NAQD SOTUV


    if(paymentType==="cash"){


      alert(

        "✅ Naqd sotuv amalga oshdi!\n\n"+

        product.name+

        "\nMiqdor: "+quantity+

        "\nJami: "+

        total.toLocaleString()+

        " so'm"

      );


      setQuantity("1");


      return;


    }







    // NASIYA SOTUV



    const debts = JSON.parse(

      localStorage.getItem("debts")

    ) || [];





    const index = debts.findIndex(

      item=>item.customer===customer

    );





    if(index!==-1){


      debts[index].total += total;



      debts[index].history.push({


        product:product.name,

        quantity:Number(quantity),

        amount:total,

        date:new Date().toLocaleString()


      });



    }

    else{


      debts.push({


        id:Date.now(),


        customer:customer,


        product:product.name,


        quantity:Number(quantity),


        total:total,


        paid:0,


        date:new Date().toLocaleString(),



        history:[{


          product:product.name,

          quantity:Number(quantity),

          amount:total,

          date:new Date().toLocaleString()


        }]



      });


    }





    localStorage.setItem(

      "debts",

      JSON.stringify(debts)

    );





    alert(

      "✅ Nasiya sotuv saqlandi!"

    );




    setCustomer("");

    setQuantity("1");



  }








  return (

    <div className="content">


      <h1>🛒 Sotuv</h1>



      <div className="sale-box">


        <h3>To'lov turi</h3>



        <label>

          <input

          type="radio"

          checked={paymentType==="cash"}

          onChange={()=>setPaymentType("cash")}

          />

          Naqd

        </label>





        <label>

          <input

          type="radio"

          checked={paymentType==="credit"}

          onChange={()=>setPaymentType("credit")}

          />

          Nasiya

        </label>





        {
          paymentType==="credit" && (

            <input

            className="sale-input"

            placeholder="Mijoz ismi"

            value={customer}

            onChange={e=>setCustomer(e.target.value)}

            />

          )

        }






        <h3>Mahsulot</h3>



        <select

        className="sale-input"

        value={product?.id || ""}


        onChange={e=>{


          const selected = products.find(

            item=>item.id===Number(e.target.value)

          );


          setProduct(selected);


        }}


        >


        {
          products.map(item=>(


            <option

            key={item.id}

            value={item.id}

            >

              {item.name} (qoldiq: {item.stock})

            </option>


          ))

        }


        </select>






        <h3>Miqdor</h3>



        <input

        className="sale-input"

        type="number"

        min="1"

        value={quantity}

        onChange={e=>setQuantity(e.target.value)}

        />





        <h2>

        Jami:

        {" "}

        {total.toLocaleString()}

        so'm

        </h2>





        <button

        className="sell-btn"

        onClick={handleSale}

        >

        🛒 SOTISH

        </button>



      </div>


    </div>

  );

}