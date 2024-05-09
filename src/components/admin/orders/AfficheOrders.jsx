import React, { useState, useRef, useCallback, useMemo } from 'react';
import {useSelector} from "react-redux"
//npm i ag-grid-react
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional The
import ListArtOrder from './ListArtOrder'

const AfficheOrders = () => {
const {orders} = useSelector((state) =>state.order);
const gridRef = useRef(); // Optional - for accessing Grid's API

// Each Column Definition results in one Column.
const [columnDefsOrder, setColumnDefsOrders] = useState([
{field: 'user.nom', filter: true, filter: 'agTextColumnFilter',
floatingFilter: true,},
{field: 'amount', filter: true, filter: 'agNumberColumnFilter',
floatingFilter: true,},
{field: 'status', filter: 'agTextColumnFilter', floatingFilter: true, },
{field: 'createdAt' , filter: 'agNumberColumnFilter', floatingFilter:
true, },
{field: 'updatedAt', filter: 'agNumberColumnFilter', floatingFilter:
true,},
]);

// DefaultColDef sets props common to all Columns
const defaultColDef = useMemo( ()=> ({
sortable: true
}));

const[open,setOpen] = useState("");
const[params,setParams] = useState("");
const handleOpen=()=>{
setOpen(true)
}
const handleClose=()=>{
setOpen(false)
setParams("")
}
const onRowSelected = useCallback((event) => {
//console.log(event.node.data.allProduct)
handleOpen();
setParams(event.node.data.allProduct)
}, []);

return (
<div>
<div>
{open && (
<ListArtOrder

handleClose={handleClose}
open={open}
params={params}
/>
)}
</div>
{/* On div wrapping Grid a) specify theme CSS Class Class and b) sets
Grid size */}
{orders && orders?.length > 0 ? <div className="ag-theme-alpine"
style={{position:'fixed',top:200, left: 300, width: 1010, height: 400}}>
<AgGridReact
ref={gridRef} // Ref for accessing Grid's API
rowData={orders} // Row Data for Rows
columnDefs={columnDefsOrder} // Column Defs for Columns
defaultColDef={defaultColDef} // Default Column Properties
rowSelection={'multiple'}
onRowSelected={onRowSelected}
/>
</div>:null}
</div>
);
};
export default AfficheOrders;