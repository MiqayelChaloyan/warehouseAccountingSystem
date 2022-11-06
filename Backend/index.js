import express from 'express';
import cors from 'cors';
import { getProducts, getProductId, createProduct, deleteProduct, updateProduct } from './src/product.js';
import { getWarehouses, getWarehouseId, createWarehouses, deleteWarehouse, updateWarehouse } from './src/warehouse.js';
import { getProdWarehouse, createProdWarehouse, deleteItemFromWarehouse } from './src/prodWarehouse.js';
import { transfer } from './src/transfer.js';

const hostname = "127.0.0.1";
const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors())

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


// Product
app.get('/products', getProducts);
app.get('/product/:id', getProductId);
app.post('/products', createProduct);
app.delete('/product/:id', deleteProduct);
app.put('/product/:id', updateProduct);

// Warehouses
app.get('/warehouses', getWarehouses);
app.get('/warehouse/:id', getWarehouseId);
app.post('/warehouses', createWarehouses);
app.delete('/warehouse/:id', deleteWarehouse);
app.put('/warehouse/:id', updateWarehouse);

//prod_warehouse
app.get('/prod/warehouse', getProdWarehouse);
app.post('/prod/warehouse', createProdWarehouse);
app.delete('/prod/warehouse/:warehouseId/:prodId', deleteItemFromWarehouse);

// Transfer
app.post('/transfer/:prodId', transfer);

app.listen(PORT, hostname, (err) => {
    if (err) {
        return;
    }
    console.log(`Server running at http://${hostname}:${PORT}`);
})


