import SearchBox from "../components/SearchBox";
import { useEffect, useState } from "react";

export default function Debtors() {

  const [debts, setDebts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  loadDebts();
}, []);

function loadDebts() {
  let data = JSON.parse(localStorage.getItem("debts")) || [];

  // Eski formatlarni yangi formatga o'tkazish
  data = data.map((item) => ({
    ...item,

    // Qarzdor nomi
    customer:
      item.customer ||
      item.customerName ||
      item.name ||
      "",

    // To'langan summa
    paid: item.paid || 0,

    // Tarix bo'lmasa bo'sh massiv
    history: item.history || [],

    // Jami qarz
    total: Number(item.total || 0),
  }));

  // Yangilangan ma'lumotni saqlash
  localStorage.setItem("debts", JSON.stringify(data));

  setDebts(data);
}







  function addPayment(id){


    const payment = Number(
      prompt("To'langan pul miqdorini kiriting:")
    );



    if(!payment || payment<=0){

      return;

    }






    const updated = debts.map(item=>{


      if(item.id===id){


        return {


          ...item,


          paid:(item.paid || 0) + payment,



          history:[

            ...(item.history || []),


            {

              type:"To'lov",

              amount:payment,

              date:new Date().toLocaleString()

            }


          ]


        };


      }



      return item;


    });







    setDebts(updated);



    localStorage.setItem(

      "debts",

      JSON.stringify(updated)

    );



  }









  function closeDebt(id){


    const updated = debts.filter(

      item=>item.id!==id

    );



    setDebts(updated);



    localStorage.setItem(

      "debts",

      JSON.stringify(updated)

    );


  }









  return (


    <div className="content">


      <h1>👥 Qarzdorlar</h1>
<SearchBox
  value={search}
  onChange={setSearch}
  placeholder="Mijozni qidiring..."
/>

<br />




      {
        debts.length===0 ?



        <div className="sale-box">

          <h3>
            Qarzdorlar mavjud emas
          </h3>


        </div>



        :



        debts
  .filter(item => {
    const customer =
      item.customer ||
      item.customerName ||
      item.name ||
      "";

    return customer
      .trim()
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  })
  .map(item => {

          const remaining =
          item.total - (item.paid || 0);




          return (



          <div

          className="sale-box"

          key={item.id}

          >





            <h2>
              👤 {item.customer}
            </h2>






            <h3>
              📦 Olingan mahsulotlar:
            </h3>





            {
              item.history?.map((h,index)=>{


                if(h.type==="To'lov"){

                  return null;

                }



                return (

                  <p key={index}>

                    📦 {h.product}

                    {" | "}

                    🔢 {h.quantity} dona

                    {" | "}

                    💰 {h.amount.toLocaleString()} so'm

                    <br/>

                    📅 {h.date}

                  </p>


                );


              })

            }







            <hr/>






            <p>

              💰 Jami qarz:

              {" "}

              {item.total.toLocaleString()}

              so'm

            </p>






            <p>

              ✅ To'langan:

              {" "}

              {(item.paid || 0).toLocaleString()}

              so'm

            </p>







            <h3>

              🔴 Qolgan qarz:

              {" "}

              {remaining.toLocaleString()}

              so'm

            </h3>









            <h3>
              📜 Tarix
            </h3>





            {

              item.history?.map((h,index)=>(


                <p key={index}>


                  {h.date}

                  {" - "}



                  {

                    h.type==="To'lov"

                    ?

                    "💵 To'lov: "

                    :

                    "📦 Sotuv: "

                  }



                  {h.amount.toLocaleString()}

                  so'm


                </p>


              ))

            }







            <button

            className="sell-btn"

            onClick={()=>addPayment(item.id)}

            >

              💵 To'lov qo'shish

            </button>







            {

              remaining<=0 &&


              <button

              className="sell-btn"

              onClick={()=>closeDebt(item.id)}

              >

                ✅ Qarzni yopish

              </button>


            }







          </div>


          );


        })


      }





    </div>


  );


}