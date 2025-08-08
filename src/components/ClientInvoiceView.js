import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavePage from './nav';

const ClientInvoiceView = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientGst, setSelectedClientGst] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [error, setError] = useState('');
  const [updateMessage, setUpdateMessage] = useState("");
  const [editRemainingAmount, setEditRemainingAmount] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch all clients on mount
  useEffect(() => {
    axios.get('https://invoicebackend-rwos.onrender.com/get_client_list')
    // axios.get('http://127.0.0.1:8000/get_client_list')
      .then(res => {
        setClients(res.data);
        setLoadingClients(false);
      })
      .catch(() => {
        setError('Failed to fetch client list.');
        setLoadingClients(false);
      });
  }, []);

  // Fetch invoices for selected client
  useEffect(() => {
    if (selectedClientGst) {
      setLoadingInvoices(true);
      axios.post('https://invoicebackend-rwos.onrender.com/get_client_invoice', { gst_number: selectedClientGst })
      // axios.post('http://127.0.0.1:8000/get_client_invoice', { gst_number: selectedClientGst })
        .then(res => {
          setInvoices(res.data);
          setLoadingInvoices(false);
        })
        .catch(() => {
          setError('Failed to fetch invoices for client.');
          setLoadingInvoices(false);
        });
    } else {
      setInvoices([]);
      setInvoiceDetails(null);
    }
  }, [selectedClientGst]);

  // Set invoice details when invoice is selected
  useEffect(() => {
    if (selectedInvoiceId) {
      const invoice = invoices.find(inv => inv._id === selectedInvoiceId);
      setInvoiceDetails(invoice || null);
      setEditRemainingAmount(invoice ? invoice.remaining_amount : "");
      setAmount("");
      setUpdateMessage("");
    } else {
      setInvoiceDetails(null);
      setEditRemainingAmount("");
      setAmount("");
      setUpdateMessage("");
    }
  }, [selectedInvoiceId, invoices]);

  // When amount changes, update remaining amount
  useEffect(() => {
    if (invoiceDetails && invoiceDetails.remaining_amount !== undefined) {
      const originalRemaining = parseFloat(invoiceDetails.remaining_amount) || 0;
      if (amount === "") {
        setEditRemainingAmount(originalRemaining);
      } else {
        const amt = parseFloat(amount) || 0;
        const newRemaining = (originalRemaining - amt).toFixed(2);
        setEditRemainingAmount(newRemaining);
      }
    }
  }, [amount, invoiceDetails]);

  // Update remaining amount handler
  const handleUpdateAmount = () => {
    if (!invoiceDetails || !editRemainingAmount) return;
    axios.post('https://invoicebackend-rwos.onrender.com/update_remaining_amount', {
    // axios.post('http://127.0.0.1:8000/update_remaining_amount', {
      invoice_number: invoiceDetails.invoice_number,
      remaining_amount: editRemainingAmount
    })
      .then(res => {
        setUpdateMessage("Amount updated successfully!");
        // Optionally update local state
        setInvoiceDetails({ ...invoiceDetails, remaining_amount: editRemainingAmount });
      })
      .catch(() => {
        setUpdateMessage("Failed to update amount.");
      });
  };

  return (
    <div>
      <NavePage />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Client Invoice Viewer</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-medium mb-2">Select Client</label>
            <select
              className="p-3 border rounded-md w-full"
              value={selectedClientGst}
              onChange={e => {
                const gst = e.target.value;
                setSelectedClientGst(gst);
                setSelectedInvoiceId('');
              }}
              disabled={loadingClients}
            >
              <option value="">-- Select Client --</option>
              {clients.map(client => (
                <option key={client._id} value={client.billing_gst_number}>{client.billing_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Select Invoice</label>
            <select
              className="p-3 border rounded-md w-full"
              value={selectedInvoiceId}
              onChange={e => setSelectedInvoiceId(e.target.value)}
              disabled={!selectedClientGst || loadingInvoices}
            >
              <option value="">-- Select Invoice --</option>
              {invoices.map(inv => (
                <option key={inv._id} value={inv._id}>{inv.invoice_number}</option>
              ))}
            </select>
          </div>
        </div>
        {invoiceDetails && (
          <div className="bg-gray-50 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Invoice Details</h3>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <div className="font-medium text-gray-600">Invoice Number:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={invoiceDetails.invoice_number}
                  readOnly
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">Invoice Dates:</div>
                <input
                  className="p-2 border rounded w-full mb-1"
                  value={invoiceDetails.invoice_from_date}
                  readOnly
                />
                <input
                  className="p-2 border rounded w-full"
                  value={invoiceDetails.invoice_to_date}
                  readOnly
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">Biller Name:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={invoiceDetails.billing_name}
                  readOnly
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">Biller Phone:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={invoiceDetails.billing_phone_number}
                  readOnly
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">Biller Address:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={invoiceDetails.billing_address}
                  readOnly
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">GST Number:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={invoiceDetails.billing_gst_number}
                  readOnly
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">Total Amount:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={invoiceDetails.total_amount}
                  readOnly
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">Amount:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Enter amount to subtract"
                  type="number"
                  min="0"
                />
              </div>
              <div>
                <div className="font-medium text-gray-600">Remaining Amount:</div>
                <input
                  className="p-2 border rounded w-full"
                  value={editRemainingAmount}
                  onChange={e => setEditRemainingAmount(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded mb-4"
              onClick={handleUpdateAmount}
              type="button"
            >
              Update
            </button>
            {updateMessage && <div className="mb-2 text-green-600">{updateMessage}</div>}
            <div>
              <div className="font-medium text-gray-600 mb-2">Items:</div>
              <table className="min-w-full divide-y divide-gray-200 mb-2">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HSN</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoiceDetails.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.hsn}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.gst}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientInvoiceView; 