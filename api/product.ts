const requestHeader = {
  'Content-Type': 'application/json',
}


export const getProduct = async (productId:number) => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  return await response.json();
}


export const addANewProduct = async (product:any) => {
  // console.log(product);
  
  const response = await fetch(`https://dummyjson.com/products/add`, {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(product),
  });

  return await response.json();
}