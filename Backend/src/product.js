import connection from '../configs/config.js';

//Read
//GET an products
export const getProducts = (_, res) => {
    try {
        connection.query('SELECT * FROM products', (err, rows) => {
            if (err) {
                res.status(400).send({error: "Operation Failed!"});
                return
            }
            res.status(200).send(rows);
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Read
//GET an product/:id
export const getProductId = (req, res) => {
    const { id } = req?.params;
    try {
        connection.query('SELECT * FROM products WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(400).send({error: "Operation Failed!"});
                return
            }
            connection.query('SELECT * FROM prod_warehouse INNER JOIN warehouses ON warehouses.id=prod_warehouse.warehouse_id WHERE product_id = ?',
                id, (error, products) => {
                    if (error) {
                        res.status(400).send({error: "Operation Failed!"});
                        return
                    }
                    res.status(200).send({ ...row, products });
                })
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Create
//POST an products
export const createProduct = (req, res) => {
    const product = req?.body;
    try {
        connection.query('INSERT INTO products SET ?', { ...product, unallocated: product?.quantity }, (err) => {
            if (err) {
                res.status(400).send({error: "Operation Failed!"});
                return
            }
            res.status(200).send('Completed successfully!');
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Delete
//DELETE an products
export const deleteProduct = (req, res) => {
    const { id } = req?.params;
    try {
        connection.query('DELETE FROM prod_warehouse WHERE product_id = ?', id, (err) => {
            if (err) {
                res.status(400).send({error: "Operation Failed!"});
                return
            }
            connection.query('DELETE FROM products WHERE id = ?', id, (error) => {
                if (error) {
                    res.status(400).send({error: "Operation Failed!"});
                    return
                }
                res.status(200).send('Completed successfully !');
            })
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}


//Update
//PUT an product
export const updateProduct = (req, res) => {
    const { id } = req?.params;
    const { name, category, barcode, production_date, quantity } = req?.body;
    console.log(req?.body)
    try {
        connection.query('UPDATE products SET name = ?, category = ?,  barcode = ?,' +
            'production_date = ?, unallocated = unallocated + ? - quantity, quantity = ?  WHERE `id` = ?',
            [name, category, barcode, production_date, quantity, quantity, id],
            (err) => {
                if (err) {
                    res.status(400).send({error: "Operation Failed!"});
                    return
                }
                res.status(200).send('Completed successfully !');
            })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

























