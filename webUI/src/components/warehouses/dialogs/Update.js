import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { memo } from 'react';
import { Styles } from '../Style';


//  Render Dialog Update
export default memo(function Update({ open,
    warehouse,
    errorMessage,
    handleOnChange,
    handleClose,
    changeWarehouse }) {


    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                <DialogTitle> Warehouse #{warehouse.id} </DialogTitle>
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
                    <Button onClick={() => handleClose()}> Cancel </Button>
                    <Button onClick={() => changeWarehouse()}> Update </Button>
                </DialogActions>
            </Dialog>
        </>
    );
})