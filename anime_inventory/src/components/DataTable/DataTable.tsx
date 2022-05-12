import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api/server';
import { useGetData } from '../../custom-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { DroneForm } from '../../components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'dimensions',
    headerName: 'Dimensions',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },
];

interface gridData{
  data:{
    id?:string;
  }
}

export const DataTable = () => {
    let { droneData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
      setOpen(true);
    }

    let handleClose = () => {
      setOpen(false);
    }

    let deleteData = async () => {
      await serverCalls.delete(`${gridData[0]}`)
    }


    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2> Drones In Inventory </h2>
            <DataGrid
            rows={droneData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={newSelectionModel => {setData(newSelectionModel)}}
            {...droneData}
            />
            <Button onClick={handleOpen} color='primary'>Update</Button>
            <Button variant="contained" color="warning" onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update A Drone</DialogTitle>
                <DialogContent>
                  <DialogContentText>Drone id: {gridData[0]}</DialogContentText>
                  <DroneForm id={`${gridData[0]}`}/>
                </DialogContent>
                <DialogActions>
                  <Button onClick = {handleClose} color="primary">Cancel</Button>
                  <Button onClick={handleClose} color = "primary">Done</Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}