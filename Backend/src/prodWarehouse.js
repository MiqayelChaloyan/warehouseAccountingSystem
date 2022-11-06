import connection from '../configs/config.js';

//Read
//GET an prod_warehouse
export const getProdWarehouse = (_, res) => {
    try {
        connection.query('SELECT * FROM prod_warehouse', (err, rows) => {
            if (err) {
                res.status(400).send({ error: "Operation Failed!" });
                return
            }
            res.status(200).send(rows)
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}


//Create
//POST an prod/warehouse
export const createProdWarehouse = (req, res) => {
    const data = req?.body;
    try {
        connection.query('INSERT INTO prod_warehouse SET ?', data, (err, row) => {
            if (err) {
                res.status(400).send({ error: "Operation Failed!" });
                return
            }
            res.status(200).send(row)
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Delete
//DELETE item from warehouses
export const deleteItemFromWarehouse = (req, res) => {
    const { prodId, warehouseId } = req?.params;
    try {
        connection.query('SELECT count FROM prod_warehouse WHERE product_id = ? and warehouse_id = ?',
            [prodId, warehouseId], (err, row) => {
                if (err) {
                    res.status(400).send({ error: "Operation Failed!" });
                    return
                }
                connection.query('UPDATE products SET unallocated = unallocated + ?  WHERE id =?',
                    [row[0].count, prodId], (error, _) => {
                        if (error) {
                            res.status(400).send({ error: "Operation Failed!" });
                            return
                        }
                    })
            })
        connection.query('DELETE FROM prod_warehouse WHERE product_id = ? and warehouse_id = ?',
            [prodId, warehouseId], (err, row) => {
                if (err) {
                    res.status(400).send({ error: "Operation Failed!" });
                    return
                }
                res.status(200).send(row)
            })
    } catch (error) {
        res.status(400).send(error.message);
    }
}







