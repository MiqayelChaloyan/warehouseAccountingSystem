import Button from '@mui/material/Button';
import { AiFillPlusSquare } from 'react-icons/ai';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { memo } from 'react';
import { Styles } from './Style';



export default memo(function Header({ openDialogADD, setSearchQuery }) {
    return (
        <div style={Styles.addContainer}>
            <Button onClick={openDialogADD} variant="text">
                <AiFillPlusSquare style={Styles.addButton} />
                Add
            </Button>
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
})