import connection from '../configs/config.js';

//Read
//GET an warehouses
export const getWarehouses = async (_, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM warehouses');
        res.status(200).send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Read
//GET an warehouse/:id
export const getWarehouseId = async (req, res) => {
    const { id } = req?.params;
    try {
        const [row] = await connection.execute('SELECT * FROM warehouses WHERE id = ?', [id]);
        const [products] = await connection.execute('SELECT * FROM prod_warehouse INNER JOIN products ON products.id=prod_warehouse.product_id WHERE warehouse_id = ?',
            [id]);
        res.status(200).send({ ...row, products });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Create
//POST an warehouse
export const createWarehouses = async (req, res) => {
    const warehouse = req?.body;
    try {
        console.log(warehouse)
        await connection.query('INSERT INTO warehouses SET ?', [warehouse]);
        res.status(200).send('Completed successfully !');
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message);
    }
}

//Delete
//DELETE an warehouses
export const deleteWarehouse = async (req, res) => {
    const { id } = req?.params;
    try {

        await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await connection.beginTransaction();
        const [rows] = await connection.execute('SELECT count, product_id FROM prod_warehouse WHERE warehouse_id = ?', [id]);
        rows.forEach(async ({count, product_id}) => {
            await connection.execute('UPDATE products SET unallocated = unallocated + ?  WHERE id =?',
                [count, product_id]);
        });

        await connection.execute('DELETE FROM prod_warehouse WHERE warehouse_id = ?', [id])
        await connection.execute('DELETE FROM warehouses WHERE id = ?', [id])
        connection.commit();
        res.status(200).send('Completed successfully !');
    } catch (error) {
        res.status(400).send({ error: "Operation Failed!" });
        connection.rollback();
    }
}

//Update
//PUT an product
export const updateWarehouse = async (req, res) => {
    const { id } = req?.params;
    const { name, address, phone, items_quantity } = req?.body;
    try {

        await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await connection.beginTransaction();
        await connection.execute('UPDATE `warehouses` SET `name` = ?, `address` = ?,  `phone` = ?, `items_quantity` = ? '
            + 'WHERE `id` = ?', [name, address, phone, items_quantity, id])
        connection.commit();
        res.status(200).send('Completed successfully !');
    } catch (error) {
        connection.rollback();
        res.status(400).send(error.message);
    }
}
