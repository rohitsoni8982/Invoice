import React, { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from "./pdf";
import { useEffect } from "react";
import axios from "axios";
import NavePage from "./nav";

const InvoiceForm = () => {
  const [gstNumber] = useState("23HNNPS0665E1ZR");
  const [companyName] = useState("MG Traders");
  const [companyAddress] = useState("76, Ambika Puri Extension, Indore, MP");
  const [companyState] = useState("Madhya Pradesh");
  const [companyCity] = useState("Indore");
  const [companyPinCode] = useState("452005");
  const [companyMobile] = useState("9981230516");
  const [invoice_to_date, setInvoice_To_Date] = useState("");
  const [invoice_from_date, setInvoice_From_Date] = useState("");
  const [billing_name, setBilling_Name] = useState("");
  const [billing_phone_number, setBilling_Phone_Number] = useState("");
  const [billing_address, setBilling_Address] = useState("");
  const [billing_gst_number, setBilling_Gst_Number] = useState("");
  const [items, setItems] = useState([{ name: "", price: "", quantity: "" , gst: "", hsn: "" }]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoice_number , setInvoice_Number] = useState("");
  const [product_list , setProduct_List] = useState("");
  const [error, setError] = useState('');
  

  const handleInvoiceToDateChange = (e) => {
    const dateString = e.target.value; // YYYY-MM-DD
    if (dateString) {
      const [year, month, day] = dateString.split('-');
      const formatted = `${day}-${month}-${year}`;
      setInvoice_To_Date(formatted); // Store DD-MM-YYYY
    } else {
      setInvoice_To_Date('');
    }
  };
  
  const handleInvoiceFromDateChange = (e) => {
    const dateString = e.target.value; // YYYY-MM-DD
    if (dateString) {
      const [year, month, day] = dateString.split('-');
      const formatted = `${day}-${month}-${year}`;
      setInvoice_From_Date(formatted); // Store DD-MM-YYYY
    } else {
        setInvoice_From_Date('');
    }
  };


  // Add new item
  const handleAddItem = () => {
    setItems([...items, { name: "", price: "", quantity: "", gst: "", hsn: "" }]);
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
  
    // If the field is "name", auto-set the gst and hsn values
    if (field === "name") {
      const selectedProduct = product_list.find(product => product.name === value);
      if (selectedProduct) {
        newItems[index].gst = selectedProduct.gst; // Set gst from product_list
        newItems[index].hsn = selectedProduct.hsn; // Set HSN from product_list
      }
    }
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
      billing_gst_number,
      items,
      invoice_number,
    };
    setInvoiceData(invoiceData);
  };
  
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/last_invoice') // Replace with your API URL
      // axios.get('https://invoicebackend-rwos.onrender.com/last_invoice') // Replace with your API URL
        .then(response => {
          const data = response.data;
  
          // Check if invoice_number is present
          if (data.invoice_number) {
            setInvoice_Number(data.invoice_number);
            setError(''); // Clear any previous errors
          } else {
            setError('Invoice number is missing from the response.');
          }
        })
        .catch(error => {
          console.error('Error fetching API:', error);
          setError('Failed to fetch invoice number from the server.');
        });
    }, []);
    

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/product_list') // Replace with your API URL
    // axios.get('https://invoicebackend-rwos.onrender.com/product_list') // Replace with your API URL
      .then(response => setProduct_List(response.data)) // Assuming response.data is a list of products
      .catch(error => console.error('Error fetching product list:', error));
  }, []);

  const handleGenerateInvoice = () => {
    
    if (!invoice_number) {
      setError('Invoice number is required.');
      return;
    }

    if (!invoice_from_date) {
      setError('Invoice from date is required.');
      return;
    }

    if (!invoice_to_date) {
      setError('Invoice to date is required.');
      return;
    }

    if (!billing_name) {
      setError('Billing name is required.');
      return;
    }

    if (!billing_phone_number) {
      setError('Billing phone number is required.');
      return;
    }

    if (!billing_address) {
      setError('Billing address is required.');
      return;
    }

    if (!billing_gst_number) {
      setError('Billing GST number is required.');
      return;
    }

    if (!items || items.length === 0) {
      setError('At least one item is required.');
      return;
    }

    setError(''); // Clear error if all fields are valid

    const invoiceDatasend = {
      invoice_to_date,
      invoice_from_date,
      invoice_number,
      billing_name,
      billing_phone_number,
      billing_address,
      billing_gst_number,
      items,
    };
    axios.post('http://127.0.0.1:8000/add_card', invoiceDatasend)
    // axios.post('https://invoicebackend-rwos.onrender.com/add_card', invoiceDatasend)
      .then(response => {
        console.log('Invoice saved:', response.data);
        // You can show a success message or redirect here
      })
      .catch(error => {
        console.error('Error saving invoice:', error);
      });
  };

  return (
    <div>
      <NavePage></NavePage>
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Invoice Generator</h2>

      {/* Invoice Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Invoice Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="date"
            // value={invoice_to_date}
            onChange={handleInvoiceToDateChange}
            className="p-3 border rounded-md w-full"
            required
          />
          <input
            type="date"
            // value={invoice_from_date}
            onChange={handleInvoiceFromDateChange}
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
              {product_list && product_list.map((product, i) => (
                <option key={i} value={product.name}>{product.name}</option>
              ))}
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

      {invoiceData && (
        <PDFDownloadLink
          document={<InvoicePDF invoiceData={invoiceData} />}
          fileName={`invoice_${invoice_number}.pdf`}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md mt-4 text-center"
          onClick={() => {
            // Reload the page after the download
            setTimeout(() => {
              window.location.reload();
            }, 1000); // Add a slight delay to ensure the download starts before reload
          }}
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download Invoice')}
        </PDFDownloadLink>
      )}
    </form>
    </div>
  );
};

export default InvoiceForm;