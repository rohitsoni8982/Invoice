import React, { useState } from "react";
import axios from "axios";
import NavePage from "./nav";

const SellerForm = () => {
  const [billing_name, setBilling_Name] = useState("");
  const [billing_phone_number, setBilling_Phone_Number] = useState("");
  const [billing_address, setBilling_Address] = useState("");
  const [billing_gst_number, setBilling_Gst_Number] = useState("");
  const [billing_state_code, setBilling_State_Code] = useState(""); // New state for state code
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Add this line for success message

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Billing name: only letters and spaces
    if (!billing_name) {
      setError("Billing name is required.");
      return;
    }
    if (!/^[A-Za-z ]+$/.test(billing_name)) {
      setError("Billing name must contain only letters and spaces.");
      return;
    }

    // Phone number: exactly 10 digits, only numbers
    if (!billing_phone_number) {
      setError("Billing phone number is required.");
      return;
    }
    if (!/^\d{10}$/.test(billing_phone_number)) {
      setError("Billing phone number must be exactly 10 digits.");
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

    // State code: only numbers
    if (!billing_state_code) {
      setError("Billing state code is required.");
      return;
    }
    if (!/^\d+$/.test(billing_state_code)) {
      setError("Billing state code must be a number.");
      return;
    }

    setError(""); // Clear error if all fields are valid
    setSuccess(""); // Clear previous success message

    const invoiceDatasend = {
      billing_name,
      billing_phone_number,
      billing_address,
      billing_gst_number,
      billing_state_code, // Add state code to API payload
    };

    // Make the API call to store client data
    axios.post('http://127.0.0.1:8000/client_details', invoiceDatasend)
    // axios.post('https://invoicebackend-rwos.onrender.com/client_details', invoiceDatasend)
      .then(response => {
        if (response.data && response.data === "successfully data stored") {
          setSuccess("Client data stored successfully!");
          // Optionally, clear the form fields:
          setBilling_Name("");
          setBilling_Phone_Number("");
          setBilling_Address("");
          setBilling_Gst_Number("");
          setBilling_State_Code(""); // Clear state code
        } else if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError("Unexpected response from server.");
        }
      })
      .catch(error => {
        setError("Error saving client data: " + (error.response?.data?.error || error.message));
      });
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
              onChange={(e) => setBilling_Name(e.target.value.toUpperCase())}
              className="p-3 border rounded-md w-full"
              required
            />
            <input
              type="tel"
              placeholder="Bill To Mobile"
              value={billing_phone_number}
              onChange={(e) => {
                // Only allow numbers, then uppercase (for consistency, though numbers are unaffected)
                const val = e.target.value.replace(/[^\d]/g, "").toUpperCase();
                setBilling_Phone_Number(val);
              }}
              maxLength={10}
              className="p-3 border rounded-md w-full"
              required
            />
            <input
              type="text"
              placeholder="Shipping Address"
              value={billing_address}
              onChange={(e) => setBilling_Address(e.target.value.toUpperCase())}
              className="p-3 border rounded-md w-full"
              required
            />
            <input
              type="text"
              placeholder="GST Number"
              value={billing_gst_number}
              onChange={(e) => setBilling_Gst_Number(e.target.value.toUpperCase())}
              className="p-3 border rounded-md w-full"
              required
            />
            <input
              type="text"
              placeholder="State Code"
              value={billing_state_code}
              onChange={(e) => {
                // Only allow numbers, then uppercase (for consistency, though numbers are unaffected)
                const val = e.target.value.replace(/[^\d]/g, "").toUpperCase();
                setBilling_State_Code(val);
              }}
              className="p-3 border rounded-md w-full"
              required
            />
          </div>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>
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
