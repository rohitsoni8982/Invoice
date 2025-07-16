import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavePage from './nav';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography } from '@mui/material';

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_client_list')
      .then(response => {
        setSellers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch seller list.');
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'billing_name', headerName: 'Name', width: 200 },
    { field: 'billing_phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'billing_address', headerName: 'Address', width: 200 },
    { field: 'billing_gst_number', headerName: 'GST Number', width: 180 },
    { field: 'billing_state_code', headerName: 'State Code', width: 150 },
  ];

  return (
    <div>
      <NavePage />
      <div className="container mx-auto mt-10">
        <Typography variant="h4" className="mb-4 font-bold">Seller List</Typography>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error" className="text-center">{error}</Typography>
        ) : (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={sellers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              getRowId={(row) => row._id || row.id} // Fallback if _id not available
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export default SellerList;
