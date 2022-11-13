import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


import { memo } from 'react';
import { Styles } from '../Style';


//  Render Dialog Update
export default memo(function Update({
    open,
    products,
    errorMessage,
    handleOnChange,
    handleClose,
    changeProduct }) {
    return (
        <>
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
        </>
    )
})