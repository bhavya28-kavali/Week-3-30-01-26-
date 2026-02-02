//create HTTP server
// import express module
import exp from 'express';
//create server
const app=exp();
//assign p/ort number 
app.listen(3000,()=>console.log('HTTP server listening in port 3000..'));

//body parser middleware
app.use(exp.json());//to parse json data from request body

let products=[];
app.get("/products",(req, res)=>{
    //send users data to res 
    res.status(200).json({message:"all products", payload:products }) //payload.message

});

//post req handling route c
app.post('/products', (req, res) => {
    let newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({message: "product created",payload: newProduct})
});

app.put('/products/:id', (req, res) => {
    // get product id from URL
    let productId = req.params.id;

    // get modified product from request body
    let modifiedProduct = req.body;

    // find product index
    let index = products.findIndex(product => product.id == productId);

    // if product not found
    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    // modify the product
    products.splice(index, 1, modifiedProduct);

    // send response
    res.status(200).json({message: "Product updated",payload: modifiedProduct})
});
