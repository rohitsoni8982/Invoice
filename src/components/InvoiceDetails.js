import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InvoiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathParts = location.pathname.split('/');
  const invoiceNumber = pathParts[pathParts.length - 1]; // Extract the invoice number from the URL
  const [invoice, setInvoice] = useState(null); // State to store the invoice details
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        // Replace with your API endpoint to fetch invoice details by invoice number
        const response = await fetch(`https://your-api-endpoint.com/invoices/${invoiceNumber}`);
        const data = await response.json();
        setInvoice(data); // Set the fetched invoice data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchInvoice();
  }, [invoiceNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>No invoice data available.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Back
      </button>
      <div className="bg-white shadow-md rounded p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Invoice Number:</label>
            <input
              type="text"
              value={invoice.invoice_number || ''}
              readOnly
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Billing Name:</label>
            <input
              type="text"
              value={invoice.billing_name || ''}
              readOnly
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Billing Address:</label>
            <input
              type="text"
              value={invoice.billing_address || ''}
              readOnly
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Billing Phone:</label>
            <input
              type="text"
              value={invoice.billing_phone_number || ''}
              readOnly
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Invoice From Date:</label>
            <input
              type="date"
              value={invoice.invoice_from_date || ''}
              readOnly
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Invoice To Date:</label>
            <input
              type="date"
              value={invoice.invoice_to_date || ''}
              readOnly
              className="p-3 border rounded-md w-full"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-6">Items:</h3>
        <div className="mt-4">
          {invoice.items && invoice.items.length > 0 ? (
            invoice.items.map((item, index) => (
              <div key={index} className="border-b py-4">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block font-medium mb-1">Name:</label>
                    <input
                      type="text"
                      value={item.name || ''}
                      readOnly
                      className="p-3 border rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity || ''}
                      readOnly
                      className="p-3 border rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Price:</label>
                    <input
                      type="number"
                      value={item.price || ''}
                      readOnly
                      className="p-3 border rounded-md w-full"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items available for this invoice.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;