import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../components/image.png'
// Styles for PDF layout
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  container: {
    border: '1 solid #000', // Add border to the container
    // padding: 10,
  },
  header: {
    marginTop: 10,
    // textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 10,
    maxWidth: 160,
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  section: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '14.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 10,
  },
  totalRow: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  section_header: {
    display: 'flex',
    flexDirection: 'row',
  },
  section_box: {
    border: '1 solid #000',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  },
  section_company_box: {
    width: '50%',
    border: '1 solid #000',
    borderTop: 'none',
    borderLeft: 'none',
    borderBottom: 'none',
  },
  invoice_section: {
    paddingLeft: 10,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoice_item: {
    padding: 10, // Add margin bottom to create gap between items
  },
  bill_section: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  bill_box_section: {
    border: '1 solid #000',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  },
  customer_section: {
    width: 276.6,
    padding: 10,
    border: '1 solid #000',
    borderTop: 'none',
    borderLeft: 'none',
    borderBottom: 'none',
  },
  customer_address_section: {
    padding: 10,
  },
  bill_address: {
    fontSize: 10,
    maxWidth: 160,
    flexWrap: 'wrap',
  },
  totalAmountSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  bankDetailsSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: '1 solid #000',
    padding: 10,
  },
  bankDetails: {
    width: '50%',
  },
  signature: {
    width: '50%',
    textAlign: 'right',
  },
  GST_section: {
    border: '1 solid #000',
    marginTop: 10,
  },
});

const InvoicePDF = ({ invoiceData }) => {
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
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.section_box}>
            <View style={styles.section_header}>
              {/* Company Details */}
              <View style={styles.section_company_box}>
                <View style={styles.header}>
                  <View style={styles.section_image}>
                    <Image style={styles.logo} src={logo} />
                  </View>
                  <View style={styles.section_company}>
                    <Text style={styles.title}>MG Traders</Text>
                    <Text style={styles.subtitle}>{invoiceData.companyAddress}</Text>
                    <Text style={styles.subtitle}>GSTIN: 23AIPCP1582E1ZN</Text>
                    <Text style={styles.subtitle}>Mobile: 9303450422</Text>
                  </View>
                </View>
              </View>

              {/* Invoice Details */}
              <View style={styles.invoice_section}>
                <View style={styles.invoice_item}>
                  <Text style={styles.text}>Invoice No:</Text>
                  <Text style={styles.text}>{invoiceData.invoice_number}</Text>
                </View>
                <View style={styles.invoice_item}>
                  <Text style={styles.text}>Invoice Date:</Text>
                  <Text style={styles.text}>{invoiceData.invoice_to_date}</Text>
                </View>
                <View style={styles.invoice_item}>
                  <Text style={styles.text}>Due Date:</Text>
                  <Text style={styles.text}>{invoiceData.invoice_from_date}</Text>
                </View>
              </View>
            </View>
          </View>


          {/* Billing Details */}
          <View style={styles.bill_box_section}>
            <View style={styles.bill_section}>

              <View style={styles.customer_section}>
                <View>
                  <Text style={styles.text}>Bill To:</Text>
                  <Text style={styles.text}>{invoiceData.billing_name}</Text>
                </View>
                <View>
                  <Text style={styles.text}>Mobile:</Text>
                  <Text style={styles.text}>{invoiceData.billing_phone_number}</Text>
                </View>
              </View>

              <View style={styles.customer_address_section}>
                <Text style={styles.text}>Ship To:</Text>
                <Text style={styles.bill_address}>{invoiceData.billing_address}</Text>
              </View>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.section}>
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

          {/* Footer */}
          {/* <View style={styles.footer}>
            <Text style={styles.footerText}>Thank you for your business!</Text>
          </View> */}
        </View>
        
        {/* GST Items Table
        <View style={styles.GST_section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>HSN/SAC</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Taxable Value</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>CGST</Text>
                  <View style={[styles.displayFlex ,{flexDirection: 'row'},{justifyContent: 'space-between'}]}>
                    <Text style={styles.tableCell}>Rate</Text>
                    <Text style={styles.tableCell}>Amount</Text>
                  </View>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>SCGST</Text>
                  <View style={[styles.displayFlex , {flexDirection: 'row'},{justifyContent: 'space-between'}]}>
                    <Text style={styles.tableCell}>Rate</Text>
                    <Text style={styles.tableCell}>Amount</Text>
                  </View>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Total Tax Amount</Text>
                </View>
              </View>

              {invoiceData.items.map((item, index) => {
                const price = parseFloat(item.price) || 0;
                const quantity = parseInt(item.quantity, 10) || 0;
                const tax = parseFloat(item.tax) || 0;

                const amount = (price * quantity) + (price * quantity * (tax / 100));

                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item + 1}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.hsn || '-'}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{quantity}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{tax}%</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{amount.toFixed(2)}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            </View> */}

                  {/* GST Items Table */}
          <View style={styles.GST_section}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>HSN/SAC</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Taxable Value</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>CGST Rate</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>CGST Amount</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>SGST Rate</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>SGST Amount</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Total Tax Amount</Text></View>
              </View>

              {/* Table Rows */}
              {invoiceData.items.map((item, index) => {
                const price = parseFloat(item.price) || 0;
                const quantity = parseInt(item.quantity, 10) || 0;
                const tax = parseFloat(item.tax) || 0;
                const cgstRate = (tax / 2).toFixed(2);
                const sgstRate = (tax / 2).toFixed(2);
                const cgstAmount = ((price * quantity) * (cgstRate / 100)).toFixed(2);
                const sgstAmount = ((price * quantity) * (sgstRate / 100)).toFixed(2);
                const totalTaxAmount = (parseFloat(cgstAmount) + parseFloat(sgstAmount)).toFixed(2);

                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{item.hsn || '-'}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{(price * quantity).toFixed(2)}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{cgstRate}%</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{cgstAmount}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{sgstRate}%</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{sgstAmount}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{totalTaxAmount}</Text></View>
                  </View>
                );
              })}
            </View>
          </View>

        {/* Total Amount in Words */}
        <View style={styles.totalAmountSection}>
          <Text style={styles.text}>Total Amount (in words)</Text>
          {/* <Text style={styles.text}>{totalAmountInWords}</Text> */}
        </View>

        {/* Bank Details */}
        <View style={styles.bankDetailsSection}>
          <View style={styles.bankDetails}>
            <Text style={styles.text}>Bank Details</Text>
            <Text style={styles.text}>Name: Mahakaal Traders</Text>
            <Text style={styles.text}>IFSC Code: HDFC0000475</Text>
            <Text style={styles.text}>Account No: 50200051510016</Text>
            <Text style={styles.text}>Bank: HDFC Bank, RATLAM-MADHYA PRADESH</Text>
          </View>
          <View style={styles.signature}>
            <Text style={styles.text}>Authorised Signatory For</Text>
            <Text style={styles.text}>Mahakaal Traders</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;