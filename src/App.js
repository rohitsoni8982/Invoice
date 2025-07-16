import * as React from "react";
import './App.css';
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/Invoice_list";
import ProductForm from "./components/product";
import ProductList from "./components/product_list";
import InvoiceDetails from "./components/InvoiceDetails";
import CreditNote from "./components/credit_note";
import SellerForm from "./components/seller";
import SellerList from "./components/seller_list";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InvoiceForm />} />
          <Route path='/invoice_list' element={<InvoiceList />} />
          <Route path="/invoice_detail/:invoice_number" element={<InvoiceDetails />} />
          <Route path='/product' element={<ProductForm />} />
          <Route path='/product_list' element={<ProductList />} />
          <Route path='/credit_note' element={<CreditNote />} />
          <Route path='/seller_detail' element={<SellerForm />} />
          <Route path='/seller_list' element={<SellerList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;