import React, { useState } from 'react'
import './dataTable.css'
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbar
} from "@mui/x-data-grid";
import { Link } from 'react-router-dom';




export default function DataTable(props) {
    const [rows, setRows] = useState(props.rows)
    const handleDelete = (id)=>{return (
        setRows(rows=>rows.filter(row=>{return (row.id !== id)})
    ))}
    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 120,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`/Dashboard/${props.slug}/${params.row.id}`}>
                        <img src="/view.svg" alt="" />
                    </Link>
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src="/delete.svg" alt="" />
                    </div>
                </div>
            );
        },
    };
    return (
        <div className='dataTable'>
            <Box sx={{ height: '99d%', width: '100%' }}>
                <DataGrid className='dataGrid'
                    rows={rows}
                    columns={[...props.columns, actionColumn]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 }
                        }
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                />
            </Box>
        </div>
    )
}
