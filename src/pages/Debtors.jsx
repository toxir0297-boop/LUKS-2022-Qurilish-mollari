import { useEffect, useState } from "react";


export default function Debtors() {


  const [debts, setDebts] = useState([]);



  useEffect(()=>{

    loadDebts();

  },[]);




  function loadDebts(){

    const data = JSON.parse(
      localStorage.getItem("debts")
    ) || [];


    setDebts(data);

  }





  function addPayment(id){


    const payment = Number(
      prompt("To'langan pul miqdorini kiriting:")
    );



    if(!payment || payment <= 0){

      return;

    }




    const updated = debts.map(item=>{


      if(item.id === id){


        return {

          ...item,

          paid: (item.paid || 0) + payment,


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

      item=>item.id !== id

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



      {
        debts.length === 0 ?


        (

          <div className="sale-box">

            <h3>
              Qarzdorlar mavjud emas
            </h3>

          </div>

        )


        :



        debts.map(item=>{


          const remaining =
          item.total - (item.paid || 0);



          return(


          <div

          className="sale-box"

          key={item.id}


          >



            <h2>
              👤 {item.customer}
            </h2>



            <p>
              📦 Mahsulot:
              {" "}
              {item.product}
            </p>



            <p>
              🔢 Miqdor:
              {" "}
              {item.quantity}
            </p>




            <p>
              💰 Jami qarz:
              {" "}
              {item.total.toLocaleString()}
              {" "}
              so'm
            </p>




            <p>
              ✅ To'langan:
              {" "}
              {(item.paid || 0).toLocaleString()}
              {" "}
              so'm
            </p>




            <h3>

              🔴 Qolgan qarz:

              {" "}

              {remaining.toLocaleString()}

              {" "}

              so'm


            </h3>




            <p>
              📅 Sana:
              {" "}
              {item.date}
            </p>





            <h3>
              📜 To'lov tarixi
            </h3>



            {
              item.history?.map((h,index)=>(


                <p key={index}>

                  {h.date}

                  {" - "}

                  {h.type}

                  :

                  {" "}

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
              remaining <=0 &&


              <button

              className="sell-btn"

              onClick={()=>closeDebt(item.id)}

              >

                ✅ Qarzni yopish

              </button>

            }




          </div>


          )


        })

      }



    </div>


  );


}