import connection from '../configs/config.js';

//Read
//GET an products
export const getProducts = async (_, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM products');
        res.status(200).send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Read
//GET an product/:id
export const getProductId = async (req, res) => {
    const { id } = req?.params;
    try {
        const [row] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
        const [warehouses] = await connection.execute('SELECT * FROM prod_warehouse INNER JOIN warehouses ON warehouses.id=prod_warehouse.warehouse_id WHERE product_id = ?',
            [id]);
        res.status(200).send({ ...row, warehouses });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Create
//POST an products
export const createProduct = async (req, res) => {
    const product = req?.body;
    try {
        await connection.query('INSERT INTO products SET ?', [{ ...product, unallocated: product?.quantity }]);
        res.status(200).send('Completed successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Delete
//DELETE an products
export const deleteProduct = async (req, res) => {
    const { id } = req?.params;
    try {
        await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await connection.beginTransaction();
        await connection.execute('DELETE FROM prod_warehouse WHERE product_id = ?', [id]);
        await connection.execute('DELETE FROM products WHERE id = ?', [id]);
        connection.commit();
        res.status(200).send('Completed successfully !');
    } catch (error) {
        res.status(400).send(error.message);
        connection.rollback();
    }
}


//Update
//PUT an product
export const updateProduct = async (req, res) => {
    const { id } = req?.params;
    const { name, category, barcode, production_date, quantity } = req?.body;
    try {
        await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await connection.beginTransaction();
        await connection.execute('UPDATE products SET name = ?, category = ?,  barcode = ?,' +
            'production_date = ?, unallocated = unallocated + ? - quantity, quantity = ?  WHERE `id` = ?',
            [name, category, barcode, production_date, quantity, quantity, id]);
        connection.commit();
        res.status(200).send('Completed successfully !');
    } catch (error) {
        res.status(400).send(error.message);
        connection.rollback();
    }
}
