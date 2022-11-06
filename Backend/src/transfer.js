import connection from '../configs/config.js';

export const transfer = (req, res) => {
    const { prodId } = req?.params;
    const { count, warehouseId } = req?.body;
    if (count <= 0) {
        res.status(400).send('Invalid count ');
        return;
    }
    try {
        connection.query('SELECT id FROM prod_warehouse WHERE product_id =? AND warehouse_id =? ',
            [prodId, warehouseId], (err, currentRows) => {
                if (err) {
                    res.status(400).send({ error: "Operation Failed!" });
                    return
                }
                connection.query('SELECT unallocated FROM products WHERE id = ? ', [prodId], (error, rows) => {
                    if (error) {
                        res.status(400).send({ error: "Operation Failed!" });
                        return
                    }
                    if (rows[0].unallocated >= count) {
                        connection.query('UPDATE products SET unallocated= unallocated - ?  WHERE id =?', [count, prodId],
                            (productsUpdateError, rows) => {
                                if (productsUpdateError) {
                                    res.status(400).send({ error: "Operation Failed!" });
                                    return
                                }
                            })
                        if (currentRows.length > 0) {
                            connection.query('UPDATE prod_warehouse SET count=count+?  WHERE product_id =? AND warehouse_id =?',
                                [count, prodId, warehouseId], (prodWarehouseUpdateError, rows) => {
                                    if (prodWarehouseUpdateError) {
                                        res.status(400).send({ error: "Operation Failed!" });
                                        return
                                    }
                                    res.send(rows)
                                })
                        } else {
                            connection.query('INSERT INTO prod_warehouse (product_id, warehouse_id, count) VALUES(?, ?, ?)',
                                [prodId, warehouseId, count], ( prodWarehouseInsertError, rows) => {
                                    if (prodWarehouseInsertError) {
                                        res.status(400).send({ error: "Operation Failed!" });
                                        return
                                    }
                                    res.send(rows)
                                })
                        }
                    } else {
                        res.status(400).send('Not enough items ')
                    }
                })
            })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

