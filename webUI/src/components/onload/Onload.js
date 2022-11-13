import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import { memo } from 'react';


//  Render Dialog Onload
export default memo(function Onload({ openBackdrop, setOpenBackdrop }) {
    const timeout = setTimeout(() => {
        setOpenBackdrop(false);
        clearTimeout(timeout)
    }, 1200);
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
})