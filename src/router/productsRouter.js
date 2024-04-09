import express from "express";

let products = [];
let lastestId;

const  productsRouter = express.Router();

export default productsRouter;

//POST Request
productsRouter.route("/").post((req, res) => {
    if(
        !req.body.name || 
        !req.body.price || 
        isNaN(req.body.price) || 
        isNaN(req.body.stock)
    ) 
    return res.send("Invalid body").status(204);

    lastestId = lastestId ? lastestId : 0;
    
    const newProduct = {
        id          : lastestId + 1,
        name        : String(req.body.name),
        category    : String(req.body.category),
        price       : Number(req.body.price),
        stock       : Number(req.body.stock)    
    };

    lastestId = newProduct.id;

    products.push(newProduct);
    res.json(newProduct);

});

//GET Request
productsRouter.route("/").get((req, res) => {
    if(products.length === 0)
    return res.status(404).send("There are no products yet.");
    res.json(products);
});

productsRouter.route("/:id").get((req, res) => {
    const product =  products.find((p) => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).send("Product not found.");
    res.json(products);
});


//PUT (update) Request
productsRouter.route("/:id").put((req, res) => {
  const product =  products.find((p) => p.id === parseInt(req.params.id));
  if(!product) return res.status(404).res.send("Product not found.");

  if(
    !req.body.name ||
    !req.body.price ||
    isNaN(req.body.price) ||
    isNaN(req.body.stock)
    )
    return res.send("invalid body").status(204);

    product.name        = String(req.body.name);
    product.category    = String(req.body.category );
    product.price       = Number(req.body.price);
    product.stock       = Number(req.body.stock);
    
    res.json(product);
});

//DeLETE Request
productsRouter.route("/:id").delete((req, res) => {
    const productIndex = products.findIndex(
        (p) => p.id === parseInt(req.params.id)
    );
    if(productIndex === -1) return res.status(404).send("Product not found.");

    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
});