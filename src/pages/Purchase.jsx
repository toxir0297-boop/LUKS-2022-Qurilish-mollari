function addPurchase(){

  const data = getProducts();


  const updated = data.map(item=>{

    if(item.id === Number(productId)){


      return {

        ...item,

        stock: Number(item.stock) + Number(quantity),

        buyPrice: Number(buyPrice)

      };

    }


    return item;

  });



  saveProducts(updated);


  alert("✅ Omborga qo'shildi");


}