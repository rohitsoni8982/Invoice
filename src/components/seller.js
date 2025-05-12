import React, { useState } from "react";
import axios from "axios";
import NavePage from "./nav";

const SellerForm = () => {
  const [billing_name, setBilling_Name] = useState("");
  const [billing_phone_number, setBilling_Phone_Number] = useState("");
  const [billing_address, setBilling_Address] = useState("");
  const [billing_gst_number, setBilling_Gst_Number] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!billing_name) {
      setError("Billing name is required.");
      return;
    }

    if (!billing_phone_number) {
      setError("Billing phone number is required.");
      return;
    }

    if (!billing_address) {
      setError("Billing address is required.");
      return;
    }

    if (!billing_gst_number) {
      setError("Billing GST number is required.");
      return;
    }

    setError(""); // Clear error if all fields are valid

    const invoiceDatasend = {
      billing_name,
      billing_phone_number,
      billing_address,
      billing_gst_number,
    };

    // Send data to the backend (uncomment when backend is ready)
    // axios.post('https://invoicebackend-rwos.onrender.com/add_card', invoiceDatasend)
    //   .then(response => {
    //     console.log('Invoice saved:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error saving invoice:', error);
    //   });
  };

  return (
    <div>
      <NavePage />
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Seller Detail</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Billing & Shipping Info
          </h3>
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

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SellerForm;
