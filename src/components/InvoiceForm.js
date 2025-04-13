import React, { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from "./pdf";
import { useEffect } from "react";
import axios from "axios";
const InvoiceForm = () => {
  const [gstNumber] = useState("1234567890");
  const [companyName] = useState("MG");
  const [companyAddress] = useState("1234 Your Street, Your City, Your State, 123456");
  const [companyState] = useState("Your State");
  const [companyCity] = useState("Your City");
  const [companyPinCode] = useState("123456");
  const [companyMobile] = useState("1234567890");
  const [invoice_to_date, setInvoice_To_Date] = useState("");
  const [invoice_from_date, setInvoice_From_Date] = useState("");
  const [billing_name, setBilling_Name] = useState("");
  const [billing_phone_number, setBilling_Phone_Number] = useState("");
  const [billing_address, setBilling_Address] = useState("");
  const [items, setItems] = useState([{ name: "", price: "", quantity: "" }]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoice_number , setInvoice_Number] = useState("");

  // Add new item
  const handleAddItem = () => {
    setItems([...items, { name: "", price: "", quantity: 1 }]);
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Update item details
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      gstNumber,
      companyName,
      companyAddress,
      companyState,
      companyCity,
      companyPinCode,
      companyMobile,
      invoice_to_date,
      invoice_from_date,
      billing_name,
      billing_phone_number,
      billing_address,
      items,
      invoice_number,
    };
    setInvoiceData(invoiceData);
  };
  
  useEffect(() => {
    axios.get(' http://127.0.0.1:8000/last_invoice') // Replace with your API URL
      .then(response => setInvoice_Number(response.data.invoice_number))
      .catch(error => console.error('Error fetching API:', error));
  }, []);

  const handleGenerateInvoice = () => {
    const invoiceDatasend = {
      invoice_to_date,
      invoice_from_date,
      invoice_number,
      billing_name,
      billing_phone_number,
      billing_address,
      items,
    };
    axios.post('http://127.0.0.1:8000/add_card', invoiceDatasend)
      .then(response => {
        console.log('Invoice saved:', response.data);
        // You can show a success message or redirect here
      })
      .catch(error => {
        console.error('Error saving invoice:', error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Invoice Generator</h2>

      {/* Company Details Section
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Company Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="GST Number"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="Company Address"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="State"
            value={companyState}
            onChange={(e) => setCompanyState(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={companyCity}
            onChange={(e) => setCompanyCity(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="Pin Code"
            value={companyPinCode}
            onChange={(e) => setCompanyPinCode(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={companyMobile}
            onChange={(e) => setCompanyMobile(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
        </div>
      </div> */}

      {/* Invoice Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Invoice Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="date"
            value={invoice_to_date}
            onChange={(e) => setInvoice_To_Date(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="date"
            value={invoice_from_date}
            onChange={(e) => setInvoice_From_Date(e.target.value)}
            className="p-3 border rounded-md w-full"
            required
          />
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
        </div>
      </div>

      {/* Items Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Items</h3>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <select
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              className="p-3 border rounded-md w-full"
              required
            >
              <option value="">Select Item</option>
              <option value="Item 1">Item 1</option>
              <option value="Item 2">Item 2</option>
              <option value="Item 3">Item 3</option>
            </select>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              placeholder="Qty"
              className="p-3 border rounded-md w-1/4"
              min="1"
              required
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              placeholder="Price"
              className="p-3 border rounded-md w-1/4"
              required
            />
            
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ${items.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={items.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">Invoice Number: {invoice_number}</p>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md"
        onClick={handleGenerateInvoice}
      >
        Generate Invoice
      </button>

      {invoiceData && (
        <PDFDownloadLink
          document={<InvoicePDF invoiceData={invoiceData} />}
          fileName={`invoice_${invoiceData.invoiceNumber}.pdf`}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md mt-4 text-center"
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download Invoice')}
        </PDFDownloadLink>
      )}
    </form>
  );
};

export default InvoiceForm;