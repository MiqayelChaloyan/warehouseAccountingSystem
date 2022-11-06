const WAREHOUSES_TABLE_COLUMS = [
    {
        name: 'Id',
        sortable: true,
        selector: row => row.id,
    },
    {
        name: 'Name',
        sortable: true,
        selector: row => row.name,
    },
    {
        name: 'Address',
        reorder: true,
        selector: row => row.address,
    },
    {
        name: 'Phone',
        reorder: true,
        selector: row => row.phone,
    }
];

const WAREHOUSES_EXPANDED_TABLE_COLUMS = [
    {
        name: 'Id',
        selector: row => row.id,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Barcode',
        selector: row => row.barcode,
    },
    {
        name: 'Count',
        sortable: true,
        selector: row => row.count,
    }
];




// PRODUCTS COLUMS
const PRODUCTS_TABLE_COLUMS = [
    {
        name: 'Id',
        sortable: true,
        selector: row => row.id,
    },
    {
        name: 'Name',
        sortable: true,
        selector: row => row.name,
    },
    {
        name: 'Category',
        reorder: true,
        selector: row => row.category,
    },
    {
        name: 'Barcode',
        reorder: true,
        selector: row => row.barcode,
    },
    {
        name: 'Production_Date',
        sortable: true,
        reorder: true,
        selector: row => row.production_date,
    },
    {
        name: 'Quantity',
        sortable: true,
        reorder: true,
        selector: row => row.quantity,
    },
    {
        name: 'Unallocated',
        sortable: true,
        reorder: true,
        selector: row => row.unallocated,
    }
];


const PRODUCTS_EXPANDED_TABLE_COLUMS = [
    {
        name: 'Id',
        selector: row => row.id,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Address',
        selector: row => row.address,
    },
    {
        name: 'Count',
        sortable: true,
        selector: row => row.count,
    }
];



export {
    WAREHOUSES_TABLE_COLUMS,
    WAREHOUSES_EXPANDED_TABLE_COLUMS,
    PRODUCTS_TABLE_COLUMS,
    PRODUCTS_EXPANDED_TABLE_COLUMS
};