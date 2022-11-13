import connection from '../configs/config.js';

export const transfer = async (req, res) => {
    const { prodId } = req?.params;
    const { count, warehouseId } = req?.body;
    if (count <= 0) {
        res.status(400).send('Invalid count ');
        return;
    }
    try {

        await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await connection.beginTransaction();
        const [currentRows] = await connection.execute('SELECT id FROM prod_warehouse WHERE product_id =? AND warehouse_id =? ',
            [prodId, warehouseId]);
        const [rows] = await connection.execute('SELECT unallocated FROM products WHERE id = ? ', [prodId]);
        if (rows[0].unallocated >= count) {
            await connection.execute('UPDATE products SET unallocated= unallocated - ?  WHERE id =?', [count, prodId]);
            if (currentRows.length > 0) {
                await connection.execute('UPDATE prod_warehouse SET count=count+?  WHERE product_id =? AND warehouse_id =?',
                    [count, prodId, warehouseId]);
            } else {
                await connection.execute('INSERT INTO prod_warehouse (product_id, warehouse_id, count) VALUES(?, ?, ?)',
                    [prodId, warehouseId, count]);
            }
            connection.commit();
            res.send('Completed successfully !');
        } else {
            res.status(400).send('Not enough items ');
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message);
        connection.rollback();
    }
}

