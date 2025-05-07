import React, { useState } from 'react';
import axios from 'axios';
import NavePage from "./nav";

const ProductForm = () => {
    const [productDetails, setProductDetails] = useState({
        name: '',
        hsn: '',
        taxable_value: '',
        gst: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Product Details:', productDetails);

        try {
            const response = await axios.post('http://127.0.0.1:8000/product', productDetails
            // const response = await axios.post('https://invoicebackend-rwos.onrender.com/products', productDetails
            );

            if (response.status === 200 || response.status === 201) {
                console.log('Product saved successfully:', response.data);
                alert('Product saved successfully!');
                // Reset form fields
                setProductDetails({
                    name: '',
                    hsn: '',
                    taxable_value: '',
                    gst: '',
                });
            } else {
                console.error('Failed to save product:', response.statusText);
                alert('Failed to save product. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <NavePage />
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
                <h2 className="text-2xl font-bold mb-4">Product Details Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={productDetails.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">HSN Number</label>
                        <input
                            type="text"
                            name="hsn"
                            value={productDetails.hsn}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            placeholder="Enter HSN number"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">CGST Rate (%)</label>
                        <input
                            type="number"
                            name="gst"
                            value={productDetails.gst}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            placeholder="Enter GST"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Taxable Value</label>
                        <input
                            type="number"
                            name="taxable_value"
                            value={productDetails.taxable_value}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            placeholder="Enter taxable value"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;