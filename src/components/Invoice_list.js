import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  // Fetch data (replace with your API endpoint or data source)
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoices'); // Replace with your API endpoint
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  // Define columns for the grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'customerName', headerName: 'Customer Name', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'date', headerName: 'Date', width: 200 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={invoices}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </Box>
  );
};

export default InvoiceList;