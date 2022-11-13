import { useEffect, useState, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';

import { getWarehouses, deleteWarehouse, updateWarehouse, createWarehouse } from '../../utils/ApiUtils';
import { WAREHOUSES_TABLE_COLUMS } from '../../constans/UIConstans';
import ExpandedComponent from './ExpandedComponent';
import Header from './Header';
import Add from './dialogs/Add';
import Update from './dialogs/Update';
import Delete from './dialogs/Delete';
import Onload from '../onload/Onload';
import { MainStyles, Styles } from './Style';


function Warehouses() {

    const [data, setData] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [deleteItem, setDeleteItem] = useState('');
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [pending, setPending] = useState(true);
    const [query, setSearchQuery] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [newWarehouse, setNewWarehouse] = useState({});
    const [open, setOpen] = useState(false);
    const [warehouse, setWarehouse] = useState({});
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        loadData()
            .catch(() => setOpenErr(true))
            .finally(() => setPending(false));
    }, [openAdd, openDialog]);

    const openDialogADD = useCallback(() => {
        setOpenAdd(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setOpenAdd(false);
        setOpenAlert(false);
        setOpenDialog(false);
        setErrorMessage(false);
    }, []);

    const handleOnChange = useCallback((event) => {
        const key = event.target.id;
        const value = event.target.value;
        warehouse[key] = value;
    }, [warehouse]);

    const openDialogUpdate = useCallback((event) => {
        setWarehouse(data.filter(el => el.id == event.currentTarget.id)[0]);
        setOpen(true);
    }, [data]);

    const handleOnChangeNew = useCallback((event) => {
        const key = event.target.id;
        const value = event.target.value;
        newWarehouse[key] = value;
    }, [newWarehouse]);

    const openDialogDelete = useCallback((event) => {
        setDeleteItem(event.currentTarget.id);
        setOpenDialog(true);
    }, []);

    const handleClick = () => {
        setOpenAlert(true);
    }

    const colums = [...WAREHOUSES_TABLE_COLUMS,
    {
        name: 'Actions',
        button: true,
        selector: row => <div>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button>
                    <AiFillEdit style={Styles.updateButton} onClick={openDialogUpdate} id={row.id} />
                </Button>
                <Button>
                    <AiFillDelete style={Styles.deleteButton} onClick={openDialogDelete} id={row.id} />
                </Button>
            </ButtonGroup>
        </div>
    }];

    // GET
    const loadData = async () => {
        try {
            const res = await getWarehouses();
            if (res?.status === 200) {
                setData(res.data);
                return;
            }
        } catch (err) {
            setOpenErr(true)
        }
    }

    // PUT
    const changeWarehouse = async () => {
        if (!warehouse.name || !warehouse.address || !warehouse.phone) {
            setErrorMessage(true);
            return;
        }
        try {
            const res = await updateWarehouse(warehouse.id, warehouse);
            if (res?.status === 200) {
                handleToggleBackdrop();
                setOpen(false);
                handleClick();
                return;
            }
        } catch (err) {
            setOpenErr(true);
        }
    }

    // POST
    const addWarehouse = async () => {
        if (!newWarehouse.name || !newWarehouse.address || !newWarehouse.phone) {
            setErrorMessage(true);
            return;
        }
        try {
            const res = await createWarehouse(newWarehouse);
            if (res?.status === 200) {
                setOpenAdd(false);
                handleClick();
                setNewWarehouse({});
                return;
            }
        } catch (err) {
            setOpenErr(true);
        }
    }

    // DELETE
    const deleteItems = async () => {
        try {
            await deleteWarehouse(deleteItem);
            setData(data.filter(item => item.id !== deleteItem));
            setOpenDialog(false);
            handleClick();
        } catch (err) {
            setOpenErr(true);
        }
    }

    //  Search Bar
    const filterData = () => {
        if (!query) {
            return data;
        } else {
            return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
        }
    }

    const searchData = filterData();

    // ONLOAD
    const handleToggleBackdrop = () => {
        setOpenBackdrop(open);
    };

    return (
        <>
            <Header
                openDialogADD={openDialogADD}
                setSearchQuery={setSearchQuery}
            />

            <DataTable
                title="Warehouse List"
                columns={colums}
                data={searchData}
                pagination
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                responsive
                expandableRows
                fixedHeader
                subHeader
                expandableRowsComponent={ExpandedComponent}
                progressPending={pending}
                customStyles={MainStyles}
                expandOnRowClicked
                noDataComponent={<div> No warehouses to show</div>}
            />

            <Add
                openAdd={openAdd}
                errorMessage={errorMessage}
                newWarehouse={newWarehouse}
                handleClose={handleClose}
                handleOnChangeNew={handleOnChangeNew}
                addWarehouse={addWarehouse}
            />

            <Update
                open={open}
                warehouse={warehouse}
                errorMessage={errorMessage}
                handleClose={handleClose}
                handleOnChange={handleOnChange}
                changeWarehouse={changeWarehouse}
            />

            <Delete
                openDialog={openDialog}
                handleClose={handleClose}
                deleteItems={deleteItems}
            />

            <Onload
                openBackdrop={openBackdrop}
                setOpenBackdrop={setOpenBackdrop}
            />

            <Snackbar open={openAlert} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" style={Styles.alert}>
                    Done successfully!
                </Alert>
            </Snackbar>

            <Snackbar open={openErr} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" style={Styles.alert}>
                    Operation Failed!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Warehouses;