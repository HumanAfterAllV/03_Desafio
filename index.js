const express = require ('express');

const ProductManager = require ('./productManagaer.js');
const products = require('./data/products.json');
const Manager = new ProductManager(products);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/products',  (request, response) => {
    console.log("Show products.");
    response.send(Manager);
});

app.get('/products',  (request, response) => {
    console.log(request.query);
    const {limit} = request.query;
    if(limit)
    {
        const prodLimit = products.slice(0, +limit);
        response.send(prodLimit);
    }
    response.send(products);
});

app.get('/products/:productsId', (request, response) => {
    console.log(request.params);
    const prodId = request.params.productsId;
    const id = products.find(prod => prod.id === +prodId);
    if(!id)
    {
        return response.status(404).send("Product not found");
    }
    response.send({id});
});

app.listen(8080, () => {
    console.log("Server is up and running on port 8080")
});
