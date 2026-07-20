import { useEffect, useState } from "react";
import { getProducts, saveProducts } from "../data/storage";
import SearchBox from "../components/SearchBox";


export default function Products() {


  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");



  const [form, setForm] = useState({

    name:"",
    category:"",
    unit:"",
    buyPrice:"",
    price:"",
    stock:""

  });




  useEffect(()=>{


    const data = getProducts();


    setProducts(data);


  },[]);






  function saveProduct(){



    if(form.name===""){

      alert("Mahsulot nomini kiriting");

      return;

    }




    let updated;



    if(editId !== null){



      updated = products.map(item=>


        item.id === editId

        ? {

          ...item,

          name:form.name,

          category:form.category,

          unit:form.unit,

          buyPrice:Number(form.buyPrice),

          price:Number(form.price),

          stock:Number(form.stock)

        }

        : item


      );



    }

    else{


      const newProduct = {


        id:Date.now(),


        name:form.name,

        category:form.category,

        unit:form.unit,

        buyPrice:Number(form.buyPrice),

        price:Number(form.price),

        stock:Number(form.stock)


      };



      updated=[

        ...products,

        newProduct

      ];



    }




    setProducts(updated);


    saveProducts(updated);





    setForm({

      name:"",
      category:"",
      unit:"",
      buyPrice:"",
      price:"",
      stock:""

    });



    setEditId(null);

    setShowForm(false);



  }






  function editProduct(item){



    setForm({


      name:item.name,

      category:item.category,

      unit:item.unit,

      buyPrice:item.buyPrice,

      price:item.price,

      stock:item.stock


    });



    setEditId(item.id);

    setShowForm(true);



  }







  function deleteProduct(id){



    const updated = products.filter(

      item=>item.id!==id

    );


    setProducts(updated);


    saveProducts(updated);


  }





function isLowStock(item) {
  switch (item.unit) {
    case "qop":
      return item.stock < 50;

    case "metr":
      return item.stock < 50;

    case "m²":
      return item.stock < 50;

    case "dona":
      return item.stock < 10;

    case "kg":
      return item.stock < 10;

    case "litr":
      return item.stock < 10;

    default:
      return false;
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

        onChange={e=>setForm({...form,name:e.target.value})}

        />



        <input

        placeholder="Kategoriya"

        value={form.category}

        onChange={e=>setForm({...form,category:e.target.value})}

        />



        <select
  value={form.unit}
  onChange={e=>setForm({...form,unit:e.target.value})}
>
  <option value="">Birlikni tanlang</option>
  <option value="qop">Qop</option>
  <option value="dona">Dona</option>
  <option value="kg">Kg</option>
  <option value="metr">Metr</option>
  <option value="m²">m²</option>
  <option value="litr">Litr</option>
</select>



        <input

        placeholder="Kelish narxi"

        value={form.buyPrice}

        onChange={e=>setForm({...form,buyPrice:e.target.value})}

        />



        <input

        placeholder="Sotuv narxi"

        value={form.price}

        onChange={e=>setForm({...form,price:e.target.value})}

        />



        <input

        placeholder="Boshlang'ich qoldiq"

        value={form.stock}

        onChange={e=>setForm({...form,stock:e.target.value})}

        />





        <button

        className="save-btn"

        onClick={saveProduct}

        >

          {editId ? "Yangilash" : "Saqlash"}

        </button>


      </div>


      }






<SearchBox
  value={search}
  onChange={setSearch}
  placeholder="Mahsulot nomini qidiring..."
/>

<br />
<table className="product-table">


<thead>

<tr>

<th>Nomi</th>

<th>Kategoriya</th>

<th>Birlik</th>

<th>Kelish</th>

<th>Sotuv</th>

<th>Qoldiq</th>

<th>Amal</th>


</tr>

</thead>




<tbody>


{

products
.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
)
.map(item => (


<tr key={item.id}>


<td>{item.name}</td>

<td>{item.category}</td>

<td>{item.unit}</td>

<td>{item.buyPrice?.toLocaleString()} so'm</td>

<td>{item.price?.toLocaleString()} so'm</td>

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
    {isLowStock(item) && " ⚠️"}
  </span>
</td>


<td>


<button

className="edit-btn"

onClick={()=>editProduct(item)}

>

✏️

</button>



<button

className="delete-btn"

onClick={()=>deleteProduct(item.id)}

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