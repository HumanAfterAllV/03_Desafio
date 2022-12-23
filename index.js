const ProductManager = require ('./productManagaer.js');


const Manager = new ProductManager('./data/products.json');
const test = async () => 
{
  try 
  {
    const product1 = await Manager.addProducts("Pepsi", "Refresco", 15, 4512, 20);
    const product2 = await Manager.addProducts("Sabritas", "Papas", 15, 9863, 30);
    const productfind = await Manager.getProductsByld(1);
  }
  catch(error) 
  {
    console.log(error);
  }
} 
    
test();