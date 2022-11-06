import connection from '../configs/config.js';

//Read
//GET an warehouses
export const getWarehouses = (_, res) => {
    try {
        connection.query('SELECT * FROM warehouses', (err, rows) => {
            if (err) {
                res.status(400).send({ error: "Operation Failed!" });
                return
            }
            res.status(200).send(rows);
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Read
//GET an warehouse/:id
export const getWarehouseId = (req, res) => {
    const { id } = req?.params;
    try {
        connection.query('SELECT * FROM warehouses WHERE id = ?', id, (err, row) => {
            if (err) {
                res.status(400).send({ error: "Operation Failed!" });
                return
            }
            connection.query('SELECT * FROM prod_warehouse INNER JOIN products ON products.id=prod_warehouse.product_id WHERE warehouse_id = ?',
                id, (error, products) => {
                    if (error) {
                        res.status(400).send({ error: "Operation Failed!" });
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
//POST an warehouses
export const createWarehouses = (req, res) => {
    const product = req?.body;
    try {
        connection.query('INSERT INTO warehouses SET ?', product, (err) => {
            if (err) {
                res.status(400).send({ error: "Operation Failed!" });
                return
            }
            res.status(200).send('Completed successfully !');
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Delete
//DELETE an warehouses
export const deleteWarehouse = (req, res) => {
    const { id } = req?.params;
    try {
        connection.query('SELECT count, product_id FROM prod_warehouse WHERE warehouse_id = ?',
            id, (err, rows) => {
                if (err) {
                    res.status(400).send({ error: "Operation Failed!" });
                    return
                }
                rows.forEach(row => {
                    connection.query('UPDATE products SET unallocated = unallocated + ?  WHERE id =?',
                    [row.count, row.product_id], (error, _) => {
                        if (error) {
                            res.status(400).send({ error: "Operation Failed!" });
                            return
                        }
                    })
                });
            })
        connection.query('DELETE FROM prod_warehouse WHERE warehouse_id = ?', id, (err) => {
            if (err) {
                res.status(400).send({ error: "Operation Failed!" });
                return
            }
            connection.query('DELETE FROM warehouses WHERE id = ?', id, (error) => {
                if (error) {
                    res.status(400).send({ error: "Operation Failed!" });
                    return
                }
                res.status(200).send('Completed successfully !');
            })
        })
    } catch (error) {
        res.status(400).send({ error: "Operation Failed!" });
    }
}

//Update
//PUT an product
export const updateWarehouse = (req, res) => {
    const { id } = req?.params;
    const { name, address, phone, items_quantity } = req?.body;
    try {
        connection.query('UPDATE `warehouses` SET `name` = ?, `address` = ?,  `phone` = ?, `items_quantity` = ? '
            + 'WHERE `id` = ?', [name, address, phone, items_quantity, id], (err) => {
                if (err) {
                    res.status(400).send({ error: "Operation Failed!" });
                    return
                }
                res.status(200).send('Completed successfully !');
            })
    } catch (error) {
        res.status(400).send(error.message);
    }
}












































