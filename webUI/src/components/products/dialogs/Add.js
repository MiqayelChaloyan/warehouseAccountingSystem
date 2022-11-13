import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import { memo } from 'react';
import { currentDate } from '../../../utils/Utils';
import { Styles } from '../Style';


//  Render Dialog Add
export default memo(function Add({
    products,
    openAdd,
    errorMessage,
    handleOnChange,
    handleClose,
    addProduct }) {

    return (
        <>
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
        </>
    )
})