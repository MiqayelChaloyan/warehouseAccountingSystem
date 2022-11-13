import Dialog from '@mui/material/Dialog';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import { memo } from 'react';


//  Render Dialog Delete
export default memo(function Delete({
    openDialog,
    handleClose,
    deleteItems }) {


    return (
        <>
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
        </>
    )
})