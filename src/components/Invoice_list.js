import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import NavePage from "./nav";
import { useNavigate } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState('Loading...');
  const navigate = useNavigate();

  // Fetch data (replace with your API endpoint or data source)
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(' https://invoicebackend-rwos.onrender.com/invoice_list'); // Replace with your API endpoint
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

  const handleViewDetails = (row) => {
    const encodedInvoice = encodeURIComponent(row.invoice_number);
    navigate(`/invoice_detail/${encodedInvoice}`);
  };
  
  const handleDownloadPDF = (row) => {
    // Trigger the PDF download logic
    console.log('Downloading PDF for:', row);
    alert(`Downloading PDF for Invoice Number: ${row.invoice_number}`);
    // You can integrate your PDF generation logic here
  };

  // Define columns for the grid
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleViewDetails(params.row)}
            className="text-blue rounded hover:bg-blue-600"
          >
            View Details
          </button>
          <button
            onClick={() => handleDownloadPDF(params.row)}
            className="text-green rounded hover:bg-green-600"
          >
            Download PDF
          </button>
        </div>
      ),
    },
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