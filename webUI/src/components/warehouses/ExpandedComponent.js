import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { WAREHOUSES_EXPANDED_TABLE_COLUMS } from "../../constans/UIConstans";
import { deleteItemFromWarehouse, getWarehouse } from "../../utils/ApiUtils";
import { AiFillDelete } from 'react-icons/ai'
import { ExpandedStyles } from './Style';


function ExpandedComponent(props) {

    const [data, setData] = useState([]);
    const [deleteItemIds, setDeleteItemIds] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, [open]);

    const handleClose = () => {
        setOpen(false)
    };

    const colums = [...WAREHOUSES_EXPANDED_TABLE_COLUMS,
    {
        name: 'Actions',
        button: true,
        selector: row => <AiFillDelete color="red" fontSize="20px" cursor="pointer" width="45" height="45"
            onClick={showDeleteItemDialog} id={row.id} />
    }];

    const showDeleteItemDialog = async (event) => {
        const prodId = event.currentTarget.id;
        const warehouseId = data.filter(() => prodId)[0]?.warehouse_id;
        setOpen(true);
        setDeleteItemIds({ warehouseId, prodId })
    }

    const deleteItem = async (event) => {
        const { warehouseId, prodId } = deleteItemIds;
        const res = await deleteItemFromWarehouse(warehouseId, prodId);
        if (res?.status === 200) {
            setData(data.filter(item => item.product_id !== prodId));
            setOpen(false);
            setDeleteItemIds({});
        }

    }

    const loadData = async () => {
        const result = await getWarehouse(props.data.id);
        if (result.data.products) setData(result.data.products);
    }

    return (
        <>
            <DataTable
                columns={colums}
                data={data}
                responsive
                customStyles={ExpandedStyles}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Confirm if you want to delete item? </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={deleteItem}> Delete </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default ExpandedComponent;