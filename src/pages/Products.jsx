import { useState } from "react";

export default function Products() {


  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);


  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sement",
      category: "Qurilish",
      unit: "qop",
      price: 75000,
      quantity: 120
    },
    {
      id: 2,
      name: "Kafel",
      category: "Pardoz",
      unit: "m²",
      price: 85000,
      quantity: 250
    }
  ]);




  const [form,setForm] = useState({

    name:"",
    category:"",
    unit:"",
    price:"",
    quantity:""

  });





  function saveProduct(){


    if(editId !== null){


      setProducts(

        products.map(item =>

          item.id === editId

          ?

          {
            ...item,
            ...form,
            price:Number(form.price),
            quantity:Number(form.quantity)
          }

          :

          item

        )

      );


    }

    else{


      const newProduct = {

        id:Date.now(),

        ...form,

        price:Number(form.price),

        quantity:Number(form.quantity)

      };


      setProducts([

        ...products,

        newProduct

      ]);


    }



    setForm({

      name:"",
      category:"",
      unit:"",
      price:"",
      quantity:""

    });


    setEditId(null);

    setShowForm(false);


  }





  function editProduct(item){


    setForm({

      name:item.name,

      category:item.category,

      unit:item.unit,

      price:item.price,

      quantity:item.quantity

    });


    setEditId(item.id);

    setShowForm(true);


  }





  function deleteProduct(id,name){


    const ok = window.confirm(

      `"${name}" mahsulotini o'chirmoqchimisiz?`

    );


    if(ok){

      setProducts(

        products.filter(item=>item.id!==id)

      );

    }


  }





  return (

    <div className="content">


      <h1>📦 Mahsulotlar</h1>


      <button

      className="add-btn"

      onClick={()=>{

        setShowForm(true);

        setEditId(null);

      }}

      >

        ➕ Yangi mahsulot

      </button>





      {
        showForm &&

        <div className="product-form">


          <input

          placeholder="Mahsulot nomi"

          value={form.name}

          onChange={(e)=>setForm({...form,name:e.target.value})}

          />



          <input

          placeholder="Kategoriya"

          value={form.category}

          onChange={(e)=>setForm({...form,category:e.target.value})}

          />



          <input

          placeholder="Birlik"

          
          value={form.unit}

          onChange={(e)=>setForm({...form,unit:e.target.value})}

          />



          <input

          placeholder="Narx"

          value={form.price}

          onChange={(e)=>setForm({...form,price:e.target.value})}

          />



          <input

          placeholder="Miqdor"

          value={form.quantity}

          onChange={(e)=>setForm({...form,quantity:e.target.value})}

          />



          <button

          className="save-btn"

          onClick={saveProduct}

          >

          {editId ? "Yangilash" : "Saqlash"}

          </button>


        </div>
      }







<table className="product-table">


<thead>

<tr>

<th>Nomi</th>

<th>Kategoriya</th>

<th>Birlik</th>

<th>Narx</th>

<th>Qoldiq</th>

<th>Amal</th>

</tr>

</thead>



<tbody>


{

products.map(item=>(


<tr key={item.id}>


<td>{item.name}</td>

<td>{item.category}</td>

<td>{item.unit}</td>

<td>{item.price.toLocaleString()} so'm</td>

<td>{item.quantity}</td>


<td>


<button

className="edit-btn"

onClick={()=>editProduct(item)}

>

✏️

</button>


<button

className="delete-btn"

onClick={()=>deleteProduct(item.id,item.name)}

>

🗑️

</button>


</td>


</tr>


))

}


</tbody>


</table>



    </div>

  );

}