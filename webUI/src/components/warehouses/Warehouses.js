import DataTable from 'react-data-table-component';
import { AiFillEdit, AiFillDelete, AiFillPlusSquare } from 'react-icons/ai'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';
import DialogContentText from '@mui/material/DialogContentText';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from 'react';
import { getWarehouses, deleteWarehouse, updateWarehouse, createWarehouse } from '../../utils/ApiUtils';
import { WAREHOUSES_TABLE_COLUMS } from '../../constans/UIConstans';
import { MainStyles, Styles } from './Style.js';
import ExpandedComponent from './ExpandedComponent';


function Warehouses() {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [deleteItem, setDeleteItem] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [warehouse, setWarehouse] = useState({});
    const [query, setSearchQuery] = useState('');
    const [pending, setPending] = useState(true);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [newWarehouse, setNewWarehouse] = useState({});
    const [openErr, setOpenErr] = useState(false);

    useEffect(() => {
        loadData();
        const timeout = setTimeout(() => {
            setPending(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [openAdd, openDialog]);

    const handleClose = () => {
        setOpen(false);
        setOpenAdd(false);
        setOpenAlert(false);
        setOpenDialog(false);
        setErrorMessage(false);
    }

    const handleOnChange = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        warehouse[key] = value;
    }

    const handleOnChangeNew = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        newWarehouse[key] = value;
    }

    const openDialogUpdate = (event) => {
        setWarehouse(data.filter(el => el.id == event.currentTarget.id)[0])
        setOpen(true)
    }

    const openDialogDelete = (event) => {
        setDeleteItem(event.currentTarget.id);
        setOpenDialog(true);
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
            setOpenErr(true)
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
            setOpenErr(true)
        }
    }

    // DELETE
    const deleteItems = async () => {
        try {
            await deleteWarehouse(deleteItem)
            setData(data.filter(item => item.id !== deleteItem));
            setOpenDialog(false);
            handleClick();
        } catch (err) {
            setOpenErr(true)
        }
    }

    const openDialogAdd = () => {
        setOpenAdd(true);
    }

    const handleClick = () => {
        setOpenAlert(true);
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
    const onload = () => {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                {handleCloseBackdrop()}
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    const handleCloseBackdrop = () => {
        const timeout = setTimeout(() => {
            setOpenBackdrop(false);
            clearTimeout(timeout)
        }, 1200);
    };

    const handleToggleBackdrop = () => {
        setOpenBackdrop(open);
    };

    //  Render Dialogs
    const renderAddDialog = () => {
        return (
            <Dialog open={openAdd} onClose={handleClose}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color="success" />
                </Box>
                <DialogTitle> Create new Item </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={
                            errorMessage && !newWarehouse.name ?
                                <label style={Styles.error}> Name cannot be empty </label> :
                                'Name'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=''
                        onChange={handleOnChangeNew}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label={
                            errorMessage && !newWarehouse.address ?
                                <label style={Styles.error}> Address cannot be empty </label> :
                                'Address'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=''
                        onChange={handleOnChangeNew}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label={
                            errorMessage && !newWarehouse.phone ?
                                <label style={Styles.error}> Phone cannot be empty </label> :
                                'Phone'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=''
                        onChange={handleOnChangeNew}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={addWarehouse}> Create </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderUpdateDialog = () => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                <DialogTitle>Warehouse #{warehouse.id}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={
                            errorMessage && warehouse.name === '' ?
                                <label style={Styles.error}> Name cannot be empty </label> :
                                'Name'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={warehouse.name}
                        onChange={handleOnChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label={
                            errorMessage && warehouse.address === '' ?
                                <label style={Styles.error}> Address cannot be empty </label> :
                                'Address'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={warehouse.address}
                        onChange={handleOnChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label={
                            errorMessage && warehouse.phone === '' ?
                                <label style={Styles.error}> Phone cannot be empty </label> :
                                'Phone'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={warehouse.phone}
                        onChange={handleOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={changeWarehouse}> Update </Button>
                </DialogActions>
            </Dialog>

        );
    };

    const renderDeleteDialog = () => {
        return (
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <LinearProgress color="inherit" />
                <DialogTitle id="alert-dialog-title">
                    {"Confirm if you want to delete ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once deleted, you can no longer restore.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={deleteItems}> Delete </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderOpendialogHeader = () => {
        return (
            <div style={Styles.addContainer}>
                <Button onClick={openDialogAdd} variant="text"><AiFillPlusSquare style={Styles.addButton} /> Add </Button>
                <Paper
                    component="form"
                    style={Styles.search.papper}
                >
                    <InputBase
                        style={Styles.search.inputBase}
                        placeholder="Search.."
                        inputProps={{ 'aria-label': 'search' }}
                        onInput={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon />
                </Paper>
            </div>
        );
    };



    return (
        <>
            {renderOpendialogHeader()}
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
            />

            {renderUpdateDialog()}
            {renderAddDialog()}
            {renderDeleteDialog()}
            {onload()}

            <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleClose}>
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