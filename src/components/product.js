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
            // const response = await axios.post('http://127.0.0.1:8000/product', productDetails
            const response = await axios.post('https://invoicebackend-rwos.onrender.com/products', productDetails
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
            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10"
            >
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Product Info
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="name"
                            value={productDetails.name}
                            onChange={handleChange}
                            className="p-3 border rounded-md w-full"
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            name="hsn"
                            value={productDetails.hsn}
                            onChange={handleChange}
                            className="p-3 border rounded-md w-full"
                            placeholder="HSN Number"
                        />
                        <input
                            type="number"
                            name="gst"
                            value={productDetails.gst}
                            onChange={handleChange}
                            className="p-3 border rounded-md w-full"
                            placeholder="CGST Rate (%)"
                        />
                        <input
                            type="number"
                            name="taxable_value"
                            value={productDetails.taxable_value}
                            onChange={handleChange}
                            className="p-3 border rounded-md w-full"
                            placeholder="Taxable Value"
                        />
                    </div>
                </div>
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

export default ProductForm;