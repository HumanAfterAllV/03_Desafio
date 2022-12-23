const fs = require('fs/promises');
const path = require('path');
const { existsSync } = require('fs' );

class ProductManager
{
    static idCount = 0;
    constructor(path)
    {
        this.path = path;
    }
    
    async readFile()
    {
        return await fs.readFile(this.path, 'utf-8');
    }

    async writeFile(data)
    {
        return await fs.writeFile(this.path, data, 'utf-8');
    }

    async getProducts()
    {
        try
        {
            if(existsSync(this.path))
            {
                const productsString = await this.readFile();
                const products = JSON.parse(productsString);
                return products;
            }
            else
            {
                return [];
            }
        }
        catch(error)
        {
            throw new Error(error)
        }   
    }

    async addProducts(title, description, price, code, stock)
    {
        try
        {
            const Thumb = "Sin imagen";
            const products = await this.getProducts();

            if (!products.length) 
            {
                ProductManager.idCount = 1;
            } 
            else 
            {
                ProductManager.idCount= products[products.length -1].id + 1;
            }
    
            const newProduct = 
            {
                id: ProductManager.idCount,
                title,
                description,
                price,
                code,
                stock,
                thumbnail: Thumb
            }
    
            products.push(newProduct);
            await this.writeFile(JSON.stringify(products, null, '\t'));
            console.log("Product saved succesfully!");
            return newProduct;
            
        }
        catch(error)
        {
            console.log(error)
        }

    }

    async updateProducts(id, newProperties)
    {
        try
        {
            const products = await this.getProducts();
            const foundId = await this.getProductsByld(id);
            if(foundId)
            {
                const updateProduct = {...foundId,...newProperties}
                const updateList =  products.map(prod =>{
                    if (prod.id === id)
                    {
                        return updateProduct;
                    }
                    else
                    {
                        return prod;
                    }
                });
                const productListString = JSON.stringify(updateList, null, '\t');
                await this.writeFile(productListString);
                console.log("Product successfully modified.")
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async deleteProducts(id)
    {
        try
        {
            const products = await this.getProducts();
            const ids = await this.getProductsByld(id);

            const filteredList = products.filter(prod => prod.id !== id);
            if(!ids)
            {
                throw new Error("ERROR: That Id doesn't exist.");
            }
            else
            {
                const productListString = JSON.stringify(filteredList, null, '\t');
                await this.writeFile(productListString);
                console.log(`"${ids.title}" has been successfully removed.`);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getProductsByld(id)
    {
        try
        {
            const ids = await this.getProducts();
            const foundId = ids.find(elem => elem.id === id);

            if (!foundId)
            {
                throw new Error("That Id doesn't exist.");
            }
            console.table(foundId);
            return foundId;

        }
        catch(error)
        {
            console.log(error.message);
        }


    }

    async getProductsShow()
    {
        const showProducts = await this.getProducts();
        console.table(showProducts);
    }

}

module.exports = ProductManager;