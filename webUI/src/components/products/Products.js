import { useEffect, useState } from 'react';
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
import SwapVerticalCircleRoundedIcon from '@mui/icons-material/SwapVerticalCircleRounded';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { getProducts, deleteProduct, updateProduct, createProduct, getWarehouses, transferProduct } from '../../utils/ApiUtils';
import { PRODUCTS_TABLE_COLUMS } from '../../constans/UIConstans';
import { MainStyles, Styles } from './Style';
import ExpandedComponent from './ExpandedComponent';
import './css/style.css';
import { currentDate } from '../../utils/Utils';

function Products() {
    const [data, setData] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [transferData, setTransferData] = useState({});
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [Item, setItem] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openTransferDialog, setOpenTransferDialog] = useState(false);
    const [products, setProducts] = useState({
        production_date: currentDate(),
        barcode: 0,
        quantity: 0
    });
    const [query, setSearchQuery] = useState('');
    const [pending, setPending] = useState(true);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openErr, setOpenErr] = useState(false);

    useEffect(() => {
        loadData();
        const timeout = setTimeout(() => {
            setPending(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [openAdd, open, openDialog, openTransferDialog]);

    const handleClose = () => {
        setOpen(false);
        setOpenAdd(false);
        setOpenAlert(false);
        setOpenDialog(false);
        setOpenTransferDialog(false);
        setErrorMessage(false);
        setOpenErr(false);
    };

    const handleOnChange = event => {
        const key = event.target.id;
        const value = event.target.value;
        if (key === 'quantity') {
            products['unallocated'] += value - products[key];
        }
        if (key === 'production_date' && !event.target.value) {
            event.target.value = currentDate();
        }
        products[key] = value;

    }

    const openDialogUpdate = (event) => {
        setProducts(data.filter(el => el.id == event.currentTarget.id)[0])
        setOpen(true)
    }

    const openDialogDelete = (event) => {
        setItem(event.currentTarget.id);
        setOpenDialog(true);
    }

    const openDialogTransfer = (event) => {
        setOpenTransferDialog(true);
        loadDataWarehouse()
        setItem(event.currentTarget.id)
    }

    const colums = [...PRODUCTS_TABLE_COLUMS,
    {
        name: 'Actions',
        button: true,
        selector: row => <div>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button>
                    <SwapVerticalCircleRoundedIcon style={Styles.transfer} onClick={openDialogTransfer} id={row.id} />
                </Button>
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
            const res = await getProducts();
            if (res?.status === 200) {
                setData(res.data);
                return;
            }
        } catch (err) {
            setOpenErr(true)
        }
    }

    // PUT
    const changeProduct = async () => {
        if (checkFields()) {
            setErrorMessage(true);
            return;
        }
        try {
            const res = await updateProduct(products.id, products);
            if (res?.status === 200) {
                handleToggleBackdrop();
                setOpen(false);
                handleClick();
                return;
            }
        }
        catch (err) {
            setOpenErr(true)
        }
    }

    // POST
    const addProduct = async () => {
        if (checkFields()) {
            setErrorMessage(true);
            return;
        }
        try {
            const res = await createProduct(products);
            if (res?.status === 200) {
                setOpenAdd(false);
                handleClick();
                return;
            }
        }
        catch (err) {
            setOpenErr(true)
        }
    }

    // DELETE
    const deleteItems = async () => {
        try {
            const res = await deleteProduct(Item);
            if (res?.status === 200) {
                setData(data.filter(item => item.id !== Item));
                setOpenDialog(false);
                handleClick();
                return;
            }
        } catch (err) {
            setOpenErr(true)
        }
    }

    // TRANSFER DATA
    // GET warehouse.name
    const loadDataWarehouse = async () => {
        try {
            const result = await getWarehouses();
            setWarehouse(result.data);
        } catch (err) {
            setOpenErr(true)
        }
    }

    const checkFields = () => {
        return (!products.name || !products.category || !products.barcode
            || !products.production_date
            || !products.quantity || products.quantity < 0);
    }

    const handleOnChangeTransfer = (event) => {
        const key = event.target.id || event.target.name;
        const value = event.target.value;
        transferData[key] = +value;
    }

    const transferProductApp = async () => {
        try {
            const res = await transferProduct(Item, transferData);
            if (res?.status === 200) {
                setOpenTransferDialog(false);
                handleClick();
                return;
            }
        } catch (err) {
            setOpenErr(true)
        }
    }

    const openDialogAdd = () => {
        setOpenAdd(true);
    }

    const handleClick = () => {
        setOpenAlert(true);
    };

    //  Search Bar
    const filterData = () => {
        if (!query) {
            return data;
        } else {
            return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase())
                || d.category.toLowerCase().includes(query.toLowerCase()));
        }
    };

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
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label={
                            (errorMessage && !products.name) ?
                                <label style={Styles.error}> Name cannot be empty </label> :
                                "Name"
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="category"
                        label={
                            errorMessage && !products.category ?
                                <label style={Styles.error}> Category cannot be empty </label> :
                                'Category'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="barcode"
                        label={
                            errorMessage && !products.barcode ?
                                <label style={Styles.error}> Barcode cannot be empty </label> :
                                'Barcode'
                        }
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue={0}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="production_date"
                        label={
                            errorMessage && !products.production_date ?
                                <label style={Styles.error}> Production date cannot be empty </label> :
                                ''
                        }
                        type="date"
                        fullWidth
                        variant="standard"
                        defaultValue={`${currentDate()}`}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label={
                            errorMessage && !products.quantity ?
                                <label style={Styles.error}> Quantity cannot be empty </label> :
                                'Quantity'
                        }
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        onChange={handleOnChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={addProduct}> Create </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const renderUpdateDialog = () => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                <DialogTitle> Product #{products.id} </DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label={
                            errorMessage && !products.name ?
                                <label style={Styles.error}> Name cannot be empty </label> :
                                'Name'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={products.name}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="category"
                        label={
                            errorMessage && !products.category ?
                                <label style={Styles.error}> Category cannot be empty </label> :
                                'Category'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={products.category}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="barcode"
                        label={
                            errorMessage && !products.barcode ?
                                <label style={Styles.error}> Barcode cannot be empty </label> :
                                'Barcode'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={products.barcode}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="production_date"
                        label={
                            errorMessage && !products.production_date ?
                                <label style={Styles.error}> Production Date cannot be empty </label> :
                                'Production Date'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={products.production_date}
                        onChange={handleOnChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label={
                            errorMessage && !products.quantity ?
                                <label style={Styles.error}> Quantity cannot be empty </label> :
                                'Quantity'
                        }
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={products.quantity}
                        onChange={handleOnChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={changeProduct}> Update </Button>
                </DialogActions>
            </Dialog>
        )
    }

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
        )
    }

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
        )
    }

    const renderTransferDialog = () => {
        return (
            <Dialog open={openTransferDialog} onClose={handleClose}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                <DialogTitle> Product #{Item} </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="count"
                        label="Count"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        onChange={handleOnChangeTransfer}
                    />
                    <FormControl sx={{ m: 0, minWidth: 200, marginBottom: 7, marginTop: 5 }}>
                        <TextField name="warehouseId" label="Warehouse Name" defaultValue="" select
                            onChange={handleOnChangeTransfer}>
                            {warehouse.map((item) => (
                                <MenuItem aria-label="None"
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={transferProductApp}> Send </Button>
                </DialogActions>
            </Dialog>
        )
    }



    return (
        <>
            {renderOpendialogHeader()}
            <DataTable
                title="Product List"
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
            {renderTransferDialog()}
            {onload()}

            <Snackbar open={openAlert} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
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

export default Products;