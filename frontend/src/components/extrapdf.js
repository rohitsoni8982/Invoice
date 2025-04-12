import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Styles for PDF layout
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '14.28%',   // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 12,
  },
  totalRow: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  }
});

const InvoicePDF = ({ invoiceData }) => {

  // Ensure numeric values using parseFloat
  const totalAmount = invoiceData.items.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0; 
    const quantity = parseInt(item.quantity, 10) || 0; 
    const tax = parseFloat(item.tax) || 0;

    const amount = (price * quantity) + (price * quantity * (tax / 100));
    return acc + amount;
  }, 0).toFixed(2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Invoice Details */}
        <View style={styles.section}>
          <Text style={styles.heading}>Invoice</Text>
          <Text style={styles.text}>Invoice Number: {invoiceData.invoiceNumber}</Text>
          <Text style={styles.text}>Invoice Date: {invoiceData.invoiceDate}</Text>
          <Text style={styles.text}>Due Date: {invoiceData.dueDate}</Text>
        </View>

        {/* Company Details */}
        <View style={styles.section}>
          <Text style={styles.heading}>Company Details</Text>
          <Text style={styles.text}>GST Number: {invoiceData.gstNumber}</Text>
          <Text style={styles.text}>Company Name: {invoiceData.companyName}</Text>
          <Text style={styles.text}>Address: {invoiceData.companyAddress}</Text>
          <Text style={styles.text}>State: {invoiceData.companyState}</Text>
          <Text style={styles.text}>City: {invoiceData.companyCity}</Text>
          <Text style={styles.text}>Pin Code: {invoiceData.companyPinCode}</Text>
          <Text style={styles.text}>Mobile: {invoiceData.companyMobile}</Text>
        </View>

        {/* Billing Details */}
        <View style={styles.section}>
          <Text style={styles.heading}>Billing Details</Text>
          <Text style={styles.text}>Bill To: {invoiceData.billToName}</Text>
          <Text style={styles.text}>Mobile: {invoiceData.billToMobile}</Text>
          <Text style={styles.text}>Ship To: {invoiceData.shipToAddress}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <Text style={styles.heading}>Items</Text>
          <View style={styles.table}>
            
            {/* Table Header */}
            <View style={[styles.tableRow, { backgroundColor: '#f0f0f0' }]}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Sr No</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Item</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>HSN</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Rate</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Quantity</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Tax (%)</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Amount</Text></View>
            </View>

            {/* Table Rows */}
            {invoiceData.items.map((item, index) => {
              const price = parseFloat(item.price) || 0;
              const quantity = parseInt(item.quantity, 10) || 0;
              const tax = parseFloat(item.tax) || 0;

              const amount = (price * quantity) + (price * quantity * (tax / 100));

              return (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{index + 1}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{item.name}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{item.hsn || '-'}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{price.toFixed(2)}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{quantity}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{tax}%</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{amount.toFixed(2)}</Text></View>
                </View>
              );
            })}

            {/* Total Row */}
            <View style={[styles.tableRow, styles.totalRow]}>
              <View style={[styles.tableCol, { width: '85.72%' }]}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{totalAmount}</Text>
              </View>
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;