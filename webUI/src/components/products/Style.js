const MainStyles = {
    rows: {
        style: {
            minHeight: '72px',
            "&:hover": {
            backgroundColor: '#96a9bc3b'
            },
            "&:nth-child(even)": {
                background: "#584f4f29"
            },
        }
    },
    headCells: {
        style: {
            backgroundColor: '#778899',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        }
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        }
    },
};

const ExpandedStyles = {
    rows: {
        style: {
            backgroundColor: '#d4d5d6',
            minHeight: '72px',
        },
    },
    headCells: {
        style: {
            // backgroundColor: '#d5d7db',
            backgroundColor: '#2F4F4F',
            color: 'white',
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
};

const Styles = {
    updateButton: {
        color: "#5996a7",
        fontSize: "20px",
        cursor: "pointer",
    },
    deleteButton: {
        color: "red",
        fontSize: "20px",
        cursor: "pointer",
    },
    addButton: {
        color: "#5996a7",
        fontSize: "35px",
        cursor: "pointer",
    },
    transfer: {
        color: "#394653",
    },
    search: {
        papper: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 250,
        },
        inputBase: {
            marginLeft: 1,
            flex: 1,
        },
    },
    alert: {
        width: '100%',
    },
    addContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'gray',
    }

};


export {
    ExpandedStyles,
    MainStyles,
    Styles
};
