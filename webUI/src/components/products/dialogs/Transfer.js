import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

import { memo } from 'react';

//  Render Dialog Transfer
export default memo(function Transfer({
    warehouse,
    openTransferDialog,
    Item,
    handleClose,
    handleOnChangeTransfer,
    transferProductApp }) {
    return (
        <>
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
        </>
    )
})