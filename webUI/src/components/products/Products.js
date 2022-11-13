import { useEffect, useState, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';
import SwapVerticalCircleRoundedIcon from '@mui/icons-material/SwapVerticalCircleRounded';

import { getProducts, deleteProduct, updateProduct, createProduct, getWarehouses, transferProduct } from '../../utils/ApiUtils';
import { PRODUCTS_TABLE_COLUMS } from '../../constans/UIConstans';
import { MainStyles, Styles } from './Style';
import ExpandedComponent from './ExpandedComponent';
import './css/style.css';
import { currentDate } from '../../utils/Utils';
import Add from './dialogs/Add';
import Update from './dialogs/Update';
import Delete from './dialogs/Delete';
import Header from './Header';
import Transfer from './dialogs/Transfer';
import Onload from '../onload/Onload';

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
    const [load, setLoad] = useState(false);

    useEffect(() => {
        loadData()
            .catch(() => setOpenErr(true))
            .finally(() => setPending(false));
    }, [openAdd, open, openDialog, openTransferDialog]);

    const handleClose = useCallback(() => {
        setOpen(false);
        setOpenAdd(false);
        setOpenAlert(false);
        setOpenDialog(false);
        setOpenTransferDialog(false);
        setErrorMessage(false);
        setOpenErr(false);
    }, []);

    const openDialogADD = useCallback(() => {
        setOpenAdd(true);
    }, []);

    const openDialogUpdate = useCallback((event) => {
        setProducts(data.filter(el => el.id == event.currentTarget.id)[0])
        setOpen(true)
    }, [data]);

    const openDialogDelete = useCallback((event) => {
        setItem(event.currentTarget.id);
        setOpenDialog(true);
    }, []);

    const openDialogTransfer = useCallback((event) => {
        setOpenTransferDialog(true);
        loadDataWarehouse()
        setItem(event.currentTarget.id)
    }, []);

    const handleOnChange = useCallback((event) => {
        const key = event.target.id;
        const value = event.target.value;
        if (key === 'quantity') {
            products['unallocated'] += value - products[key];
        }
        if (key === 'production_date' && !event.target.value) {
            event.target.value = currentDate();
        }
        products[key] = value;

    }, [products]);

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

    const handleOnChangeTransfer = useCallback((event) => {
        const key = event.target.id || event.target.name;
        const value = event.target.value;
        transferData[key] = +value;
    }, [])

    const transferProductApp = async () => {
        try {
            const res = await transferProduct(Item, transferData);
            if (res?.status === 200) {
                setOpenTransferDialog(false);
                handleClick();
                setLoad(!load);
                return;
            }
        } catch (err) {
            setOpenErr(true)
        }
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
                expandableRowsComponentProps={{reloadData: loadData}}
                progressPending={pending}
                customStyles={MainStyles}
                expandOnRowClicked
                noDataComponent={<div> No products to show</div>}
            />

            <Add
                products={products}
                openAdd={openAdd}
                errorMessage={errorMessage}
                handleOnChange={handleOnChange}
                handleClose={handleClose}
                addProduct={addProduct}
            />

            <Update
                open={open}
                products={products}
                errorMessage={errorMessage}
                handleOnChange={handleOnChange}
                handleClose={handleClose}
                changeProduct={changeProduct}
            />

            <Delete
                openDialog={openDialog}
                handleClose={handleClose}
                deleteItems={deleteItems}
            />

            <Transfer
                warehouse={warehouse}
                openTransferDialog={openTransferDialog}
                Item={Item}
                handleClose={handleClose}
                handleOnChangeTransfer={handleOnChangeTransfer}
                transferProductApp={transferProductApp}
            />

            <Onload
                openBackdrop={openBackdrop}
                setOpenBackdrop={setOpenBackdrop}
            />

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