import products from "./products";


export function getProducts(){

  const data = localStorage.getItem("products");


  if(data){

    return JSON.parse(data);

  }


  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );


  return products;

}



export function saveProducts(data){

  localStorage.setItem(
    "products",
    JSON.stringify(data)
  );

}