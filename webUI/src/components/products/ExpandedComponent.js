import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { PRODUCTS_EXPANDED_TABLE_COLUMS } from "../../constans/UIConstans";
import { deleteItemFromWarehouse, getProduct } from "../../utils/ApiUtils";
import { AiFillDelete } from 'react-icons/ai'
import { ExpandedStyles } from './Style';
import { useRouteLoaderData } from "react-router-dom";


function ExpandedComponent(props) {

    const [data, setData] = useState([]);
    const [deleteItemIds, setDeleteItemIds] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, [open, deleteItemIds, props.load]);


    const handleClose = () => {
        setOpen(false)
    };

    const colums = [...PRODUCTS_EXPANDED_TABLE_COLUMS,
    {
        name: 'Actions',
        button: true,
        selector: row => <AiFillDelete color="red" fontSize="20px" width="45" height="45"
            onClick={showDeleteItemDialog} id={row.id} />
    }];


    const showDeleteItemDialog = async (event) => {
        const warehouseId = event.currentTarget.id;
        setOpen(true);
        setDeleteItemIds({ warehouseId, prodId: props.data.id })
    }

    const deleteItem = async () => {
        const { warehouseId, prodId } = deleteItemIds;
        const res = await deleteItemFromWarehouse(warehouseId, prodId);
        if (res?.status === 200) {
            setData(data.filter(item => item.product_id !== prodId));
            setOpen(false);
            setDeleteItemIds({});
            props.reloadData();
        }
    }

    const loadData = async () => {
        const result = await getProduct(props.data.id);
        setData(result.data.warehouses);
    }

    return (
        <>
            <DataTable
                columns={colums}
                data={data}
                responsive
                customStyles={ExpandedStyles}
                noDataComponent={<div> No warehouses to show</div>}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Confirm if you want to delete Item? </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={deleteItem}> Delete </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default ExpandedComponent;