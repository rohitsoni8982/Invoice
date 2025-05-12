import React, { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import CreditPDF from "./credit_pdf"
import { useEffect } from "react";
import axios from "axios";
import NavePage from "./nav";

const CreditNote = () => {
  const [gstNumber] = useState("23HNNPS0665E1ZR");
  const [companyName] = useState("MG Traders");
  const [companyAddress] = useState("76, Ambika Puri Extension, Indore, MP");
  const [companyState] = useState("Madhya Pradesh");
  const [companyCity] = useState("Indore");
  const [companyPinCode] = useState("452005");
  const [companyMobile] = useState("9981230516");
  const [creadit_note_data, setCreaditNoteData] = useState("");
  const [invoice_date, setInvoiceData] = useState("");
  const [billing_name, setBilling_Name] = useState("");
  const [billing_phone_number, setBilling_Phone_Number] = useState("");
  const [billing_address, setBilling_Address] = useState("");
  const [billing_gst_number, setBilling_Gst_Number] = useState("");
  const [credit_amount, setCreditAmount] = useState("");
  const [credit_number, setCreditNumber] = useState("");
  const [creditData, setCreditData] = useState(null);
  const [invoice_number , setInvoice_Number] = useState("");
  const [description , setDescription] = useState("");
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    const dateString = e.target.value; // YYYY-MM-DD
    if (dateString) {
      const [year, month, day] = dateString.split('-');
      const formatted = `${day}-${month}-${year}`;
      setCreaditNoteData(formatted); // Store DD-MM-YYYY
    } else {
      setCreaditNoteData('');
    }
  };
  
  const handleInvoiceDateChange = (e) => {
    const dateString = e.target.value; // YYYY-MM-DD
    if (dateString) {
      const [year, month, day] = dateString.split('-');
      const formatted = `${day}-${month}-${year}`;
      setInvoiceData(formatted); // Store DD-MM-YYYY
    } else {
        setInvoiceData('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const creditData = {
      gstNumber,
      companyName,
      companyAddress,
      companyState,
      companyCity,
      companyPinCode,
      companyMobile,
      creadit_note_data,
      billing_name,
      billing_phone_number,
      billing_address,
      billing_gst_number,
      credit_amount,
      description,
      invoice_number,
      credit_number,
      invoice_date,
    };
    setCreditData(creditData);
  };

  useEffect(() => {
    axios.get('https://invoicebackend-rwos.onrender.com/last_credit') // Replace with your API URL
      .then(response => {
        const data = response.data;

        // Check if invoice_number is present
        if (data.credit_number) {
            setCreditNumber(data.credit_number);
          setError(''); // Clear any previous errors
        } else {
          setError('credit number is missing from the response.');
        }
      })
      .catch(error => {
        console.error('Error fetching API:', error);
        setError('Failed to fetch credit number from the server.');
      });
  }, []);

  const handleGenerateInvoice = () => {

    setError('');

    const creditDatasend = {
      creadit_note_data,
      credit_number,
      billing_name,
      billing_phone_number,
      billing_address,
      billing_gst_number,
      invoice_number,
      invoice_date,
      credit_amount,
      description,
    };
    axios.post('https://invoicebackend-rwos.onrender.com/credit_note', creditDatasend)
      .then(response => {
        console.log('Credit saved:', response.data);
        // You can show a success message or redirect here
      })
      .catch(error => {
        console.error('Error saving credit:', error);
      });
  };

  return (
    <div>
      <NavePage></NavePage>
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Credit Note</h2>

      {/* Invoice Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Credit Details</h3>
        <div className="grid grid-cols-2 gap-6">
        <div className="grid grid-cols-1 gap-4">
          <span className="text-bold"> Creadit Data</span>
          <input
            type="date"
            onChange={handleDateChange}
            className="p-3 border rounded-md w-full"
            required
          />
          </div>
          <div className="grid grid-cols-1 gap-4">
          <span className="text-bold"> Invoice Data</span>
          <input
            type="date"
            onChange={handleInvoiceDateChange}
            className="p-3 border rounded-md w-full"
            required
          />
        </div>
        </div>
      </div>

      {/* Billing & Shipping Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Billing & Shipping Info</h3>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Bill To Name"
            value={billing_name}
            onChange={(e) => setBilling_Name(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="tel"
            placeholder="Bill To Mobile"
            value={billing_phone_number}
            onChange={(e) => setBilling_Phone_Number(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="Shipping Address"
            value={billing_address}
            onChange={(e) => setBilling_Address(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="GST Number"
            value={billing_gst_number}
            onChange={(e) => setBilling_Gst_Number(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
        </div>
      </div>

      {/* Credit Note */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Credit</h3>
        <div className="grid grid-cols-2 gap-6">
        <select
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
            >
            <option value="">Select Item</option>
            <option value="Price Adjustment">Price Adjustment</option>
            <option value="Return">Return</option>
            <option value="Discount">Discount</option>
        </select>
        <input
            type="number"
            placeholder="Credit Amount"
            value={credit_amount}
            onChange={(e) => setCreditAmount(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
        </div> 
      </div>
      
      {/* Invoice Number */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Invoice Number</h3>
        <input
            type="text"
            placeholder="Invoice Number"
            value={invoice_number}
            onChange={(e) => setInvoice_Number(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
      </div>

      <div className="mb-6">
        <p className="text-gray-600">Credit Number: {credit_number}</p>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md"
        onClick={handleGenerateInvoice}
      >
        Generate Invoice
      </button>

      {creditData && (
        <PDFDownloadLink
          document={<CreditPDF creditData={creditData} />}
          fileName={`invoice_${credit_number}.pdf`}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md mt-4 text-center"
          onClick={() => {
            // Reload the page after the download
            setTimeout(() => {
              window.location.reload();
            }, 1000); // Add a slight delay to ensure the download starts before reload
          }}
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download Credit')}
        </PDFDownloadLink>
      )}
    </form>
    </div>
  );
};

export default CreditNote;