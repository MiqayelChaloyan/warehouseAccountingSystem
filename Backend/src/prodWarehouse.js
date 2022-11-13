import connection from '../configs/config.js';

//Read
//GET an prod_warehouse
export const getProdWarehouse = async (_, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM prod_warehouse');
        res.status(200).send(rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


//Create
//POST an prod/warehouse
export const createProdWarehouse = async (req, res) => {
    const data = req?.body;
    try {
        await connection.query('INSERT INTO prod_warehouse SET ?', [data]);
        res.send('Completed successfully !');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Delete
//DELETE item from warehouses
export const deleteItemFromWarehouse = async (req, res) => {
    const { prodId, warehouseId } = req?.params;
    try {
        await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await connection.beginTransaction();
        const [row] = await connection.execute('SELECT count FROM prod_warehouse WHERE product_id = ? and warehouse_id = ?',
            [prodId, warehouseId]);
        await connection.execute('UPDATE products SET unallocated = unallocated + ?  WHERE id =?',
            [row[0].count, prodId]);
        await connection.execute('DELETE FROM prod_warehouse WHERE product_id = ? and warehouse_id = ?',
            [prodId, warehouseId]);
        connection.commit();
        res.send('Completed successfully !');
    } catch (error) {
        res.status(400).send(error.message);
        connection.rollback();
    }
}
