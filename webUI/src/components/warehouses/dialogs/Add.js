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


//  Render Dialog Add
export default memo(function Add({
    openAdd,
    errorMessage,
    newWarehouse,
    handleClose,
    handleOnChangeNew,
    addWarehouse }) {


    return (
        <>
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
                    <Button onClick={() => handleClose()}> Cancel </Button>
                    <Button onClick={() => addWarehouse()}> Create </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})