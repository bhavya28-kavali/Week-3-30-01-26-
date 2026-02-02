import express from 'express'
import { userApp } from './APIs/userapi.js'
import { productApp } from './APIs/productapi.js'

const app = express();

// body parser
app.use(express.json());

// mount mini apps
app.use("/user-api", userApp);
app.use("/product-api", productApp);

// start server
app.listen(3000, () => {
  console.log("HTTP server running on port 3000");
});
