import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const InvoiceGenerator = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const addItem = () => {
     // Validate input value
     if (invoiceNumber.trim() === '') {
      setErrorMessage(<span className='tdtext'>Invoice No. is required</span>);
     } else if (customerName.trim() === '') {
      setErrorMessage(<span className='tdtext'>Customer name is required</span>);
    } else if(description.trim() === ''){
      setErrorMessage(<span className='tdtext'>Item Name is required</span>);
    } else {
      const newItem = { description, quantity, price };
      setItems([...items, newItem]);
      setDescription('');
      setQuantity(0);
      setPrice(0);
    }

   
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach(item => {
      total += item.quantity * item.price;
    });
    return total;
  };
  const calculateTax = () =>{
      const taxValue = calculateTotal() * (tax / 100);
      const totalPrice = calculateTotal() + taxValue;
      return totalPrice;
  };


  const generatePDF = () => {
    const element = document.getElementById('invoice');
    const opt = {
      margin: 0.5,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className='container'>
      <h1>Invoice Generator</h1>
      <div className='row'>
      <div className='col col-md-4 p-2'>
        <p>{errorMessage}</p>
      <div className="input-group">
        <span className="input-group-text">Invoice Number:</span>
        <input
          type="text" 
          aria-label="Invoice Number:" 
          className="form-control" 
          value={invoiceNumber}
          onChange={e => setInvoiceNumber(e.target.value)} 
          required
        />
      </div>
      </div>
      </div>
      <div className='row'>
      <div className='col col-md-4 p-2'>
      <div className="input-group">
        <span className="input-group-text">Bill To:</span>
        <input
          required
          type="text" 
          aria-label="Customer Name:" 
          className="form-control" 
          value={customerName}
          onChange={e => setCustomerName(e.target.value)} 
        />
      </div>
      </div>
      </div>
      <div className='row'>
      <div className='col col-md-4 p-2'>
      <div className='input-group'>
        <span className='input-group-text'>Item Description:</span>
        <input
          required
          className='form-control'
          aria-label='Item Description:'
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      </div>
      </div>
      <div className='row'>
      <div className='col col-md-4 p-2'>
      <div className="input-group">
        <span className="input-group-text">Quantity:</span>
        <input type="number" aria-label="Quantity" className="form-control" value={quantity}
          onChange={e => setQuantity(Number(e.target.value))} />
        <span className ="input-group-text">Price:</span>
        <input type="number" aria-label="Price" className="form-control" value={price}
          onChange={e => setPrice(Number(e.target.value))} />
        <span className="input-group-text">Tax (%)</span>
        <input type='number' aria-label="Tax" className='form-control' value={tax} onChange={e => setTax(Number(e.target.value))} />
      </div>
      </div>
      </div>
      <div className='row'>
      <div className='col col-md-2 p-2'>
      <button type='button' className='btn btn-primary' onClick={addItem}>Add Item</button>
      </div>
      <div className='col col-md-2 p-2'>
      <button type='button' className='btn btn-success' onClick={generatePDF}>Download PDF</button>
      </div>
      </div>
    
    {/* PDF invoice Layout */}
      <div id="invoice">
        <h1>Invoice</h1>
      <div className='row'>
      <div className='col'>
        <p><b>Invoice Number:</b> {invoiceNumber}</p>
        <p><b>Customer Name:</b> {customerName}</p>
        </div>
      </div>
        <table className="table table-hover">
          <thead>
            <tr className='table-primary'>
              <th className='te'>Item</th>
              <th>Quantity</th>
              <th>Unite Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className='te'>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.price} AED</td>
                <td>{item.quantity * item.price} AED</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='tdtext' colSpan="3">Sub Total:</td>
              <td>{calculateTotal()} AED</td>
            </tr>
            <tr>
            <td className='tdtext' colSpan="3">Tax</td>
            <td colSpan='4'>%{tax}</td>
            </tr>
            <tr>
              <td className='tdtext' colSpan="3">Total Amount:</td>
              <td>{calculateTax()} AED</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default InvoiceGenerator;