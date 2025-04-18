import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import NavePage from "./nav";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState('Loading...');

  // Fetch data (replace with your API endpoint or data source)
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(' http://127.0.0.1:8000/invoice_list'); // Replace with your API endpoint
        const data = await response.json();
        setInvoices(data);
        setLoading('');
      } catch (error) {
        setLoading('Data Not Found');
        console.error('Error fetching invoices:', error);
        setTimeout(() => {
          setLoading('');
        }, 5000);
      }
    };

    fetchInvoices();
  }, []);

  // Define columns for the grid
  const columns = [
    { field: 'invoice_number', headerName: 'Invoice Number', width: 200 },
    { field: 'billing_name', headerName: 'Billing Name', width: 200 },
    { field: 'billing_address', headerName: 'Billing Address', width: 300 },
    { field: 'billing_phone_number', headerName: 'Billing Phone', width: 150 },
    { field: 'invoice_from_date', headerName: 'Invoice From Date', width: 150 },
    { field: 'invoice_to_date', headerName: 'Invoice To Date', width: 150 },
  {
    field: 'items',
    headerName: 'Items',
    width: 400,
    renderCell: (params) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {params.value.map((item, index) => (
          <div key={index} style={{ marginBottom: '4px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
            {/* <strong>Item {index + 1}:</strong> */}
            <span>Name: {item.name} </span>
            <span>Quantity: {item.quantity} </span>
            <span>Price: {item.price} </span>
          </div>
        ))}
      </div>
    ),
  }, 
];  

  return (
    <div>
      <NavePage />
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">{loading}</h2>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={invoices}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            getRowId={(row) => row.invoice_number} // Use a unique field as the row ID
          />
        </Box>
      </div>
    </div>
  );
};

export default InvoiceList;