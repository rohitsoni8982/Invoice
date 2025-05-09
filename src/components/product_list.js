import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import NavePage from "./nav";

const ProductList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState('Loading...');

  // Fetch data (replace with your API endpoint or data source)
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(' https://invoicebackend-rwos.onrender.com/product_list'); // Replace with your API endpoint
        const data = await response.json();
        setInvoices(data);
        setLoading('');
      } catch (error) {
        setLoading('Data Not Found');
        console.error('Error fetching product:', error);
        setTimeout(() => {
          setLoading('');
        }, 5000);
      }
    };
    fetchInvoices();
  }, []);

  // Define columns for the grid
  const columns = [
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'hsn', headerName: 'HSN Number', width: 150 },
    { field: 'tax', headerName: 'GST(%)', width: 150 },
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
            getRowId={(row) => row._id} // Use a unique field as the row ID
          />
        </Box>
      </div>
    </div>
  );
};
export default ProductList;