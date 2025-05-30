import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../components/image.png'
import numWords from "num-words";
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
    maxWidth: 220,
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  section: {
    marginBottom: 0,
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
    // marginBottom: 10,
    // marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '5.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColSrNo: {
    width: '5.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColItm: {
    width: '35.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColHsn: {
    width: '14.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColRat: {
    width: '12.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColtaxval: {
    width: '14.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColQut: {
    width: '10.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColGst: {
    width: '10.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableColAmt: {
    width: '14.28%', // Distribute width evenly
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 8,
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
    maxWidth: 240,
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
  tax: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
});

const InvoicePDF = ({ invoiceData }) => {
  const totalAmount = invoiceData.items.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    const tax = parseFloat(item.gst) || 0;

    const amount = (price * quantity) + (price * quantity * (tax / 100));
    return acc + amount;
  }, 0).toFixed(2);

  {/* Initialize totals */}
  // let totalRate = 0;
  let totalCGST = 0;
  let totalSGST = 0;
  let totalIGST = 0;
  let totaltaxableamount = 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      <View> 
        <Text style={styles.tax}>TAX INVOICE</Text>
      </View>
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
                    <Text style={styles.title}>{invoiceData.companyName}</Text>
                    <Text style={styles.subtitle}>{invoiceData.companyAddress}</Text>
                    <Text style={styles.subtitle}>GSTIN: {invoiceData.gstNumber}</Text>
                    <Text style={styles.subtitle}>Mobile: {invoiceData.companyMobile}</Text>
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
                  <Text style={styles.text}>Bill To: {invoiceData.billing_name}</Text>
                </View>
                <View>
                  <Text style={styles.text}>GST:{invoiceData.billing_gst_number}</Text>
                </View>
                <View>
                  <Text style={styles.text}>Mobile:{invoiceData.billing_phone_number}</Text>
                </View>
              </View>

              <View style={styles.customer_address_section}>
                <Text style={styles.text}>Ship To:</Text>
                <Text style={styles.bill_address}>{invoiceData.billing_address}</Text>
              </View>
            </View>
          </View>

          {/* Items Table */}
          <View>
          {/* <View style={styles.section}> */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, { backgroundColor: '#f0f0f0' }]}>
                <View style={styles.tableColSrNo}><Text style={styles.tableCell}>Sr No</Text></View>
                <View style={styles.tableColItm}><Text style={styles.tableCell}>Item</Text></View>
                <View style={styles.tableColHsn}><Text style={styles.tableCell}>HSN</Text></View>
                <View style={styles.tableColRat}><Text style={styles.tableCell}>Rate</Text></View>
                <View style={styles.tableColQut}><Text style={styles.tableCell}>Quantity</Text></View>
                <View style={styles.tableColtaxval}><Text style={styles.tableCell}>Taxable Value (Exc. GST)</Text></View>
                <View style={styles.tableColGst}><Text style={styles.tableCell}>CGST (%)</Text></View>
                <View style={styles.tableColGst}><Text style={styles.tableCell}>SGST (%)</Text></View>
                <View style={styles.tableColGst}><Text style={styles.tableCell}>IGST (%)</Text></View>
                <View style={styles.tableColAmt}><Text style={styles.tableCell}>Amount (Incl. GST)</Text></View>
              </View>

              {/* Table Rows */}
              {invoiceData.items.map((item, index) => {
                let price = parseFloat(item.price) || 0;
                let quantity = parseInt(item.quantity, 10) || 0;
                let gst = parseFloat(item.gst) || 0;
                let amount = (price * quantity) * (1 + gst / 100);
                let cgst = (gst / 2).toFixed(2);
                let sgst = (gst / 2).toFixed(2);
                let igst = 0;
                let cgstAmount = ((price * quantity) * (cgst / 100)).toFixed(2);
                let sgstAmount = ((price * quantity) * (sgst / 100)).toFixed(2);
                let igstAmount = 0;
                let totalTaxAmount = (parseFloat(cgstAmount) + parseFloat(sgstAmount)).toFixed(2);
                
                // Accumulate totals
                // totalRate += price ;
                // totalRate += price * quantity;
                totalCGST += parseFloat(cgstAmount);
                totalSGST += parseFloat(sgstAmount);
                totalIGST += parseFloat(igstAmount);
                totaltaxableamount += parseFloat((price * quantity))

                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableColSrNo}><Text style={styles.tableCell}>{index + 1}</Text></View>
                    <View style={styles.tableColItm}><Text style={styles.tableCell}>{item.name}</Text></View>
                    <View style={styles.tableColHsn}><Text style={styles.tableCell}>{item.hsn || '-'}</Text></View>
                    <View style={styles.tableColRat}><Text style={styles.tableCell}>{price.toFixed(2)}</Text></View>
                    <View style={styles.tableColQut}><Text style={styles.tableCell}>{quantity}</Text></View>
                    <View style={styles.tableColtaxval}><Text style={styles.tableCell}>{quantity*price}</Text></View>
                    <View style={styles.tableColGst}>
                      <Text style={styles.tableCell}>{cgstAmount}</Text>
                      <Text style={[{fontSize:"6"}]}>({cgst}%)</Text>
                      </View>
                    <View style={styles.tableColGst}>
                      <Text style={styles.tableCell}>{sgstAmount}</Text>
                      <Text style={[{fontSize:"6"}]}>({sgst}%)</Text>
                      </View>
                    <View style={styles.tableColGst}>
                      <Text style={styles.tableCell}>{igstAmount}</Text>
                      <Text style={[{fontSize:"6"}]}>({igst}%)</Text>
                      </View>
                    <View style={styles.tableColAmt}><Text style={styles.tableCell}>{amount.toFixed(2)}</Text></View>
                  </View>
                );
              })}

              {/* Total Row */}
              <View style={[styles.tableRow, styles.totalRow]}>
                <View style={[styles.tableCol, { width: '77.28%' }]}>
                {/* <View style={[styles.tableCol, { width: '54.28%' }]}> */}
                  <Text style={styles.tableCell}>Total</Text>
                </View>
                {/* <View style={styles.tableColRat}>
                  <Text style={styles.tableCell}>{totalRate.toFixed(2)}</Text>
                </View> */}
                <View style={styles.tableColtaxval}>
                  <Text style={styles.tableCell}>{totaltaxableamount}</Text>
                </View>
                <View style={styles.tableColGst}>
                  <Text style={styles.tableCell}>{totalCGST.toFixed(2)}</Text>
                </View>
                <View style={styles.tableColGst}>
                  <Text style={styles.tableCell}>{totalSGST.toFixed(2)}</Text>
                </View>
                <View style={styles.tableColGst}>
                  <Text style={styles.tableCell}>{totalIGST.toFixed(2)}</Text>
                </View>
                <View style={styles.tableColAmt}>
                  <Text style={styles.tableCell}>{totalAmount}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

          {/* GST Items Table */}
          {/* <View style={styles.GST_section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>HSN/SAC</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Taxable Value (Exc. GST)</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>CGST Rate</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>CGST Amount</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>SGST Rate</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>SGST Amount</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>IGST Rate</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>IGST Amount</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Total GST Amount</Text></View>
              </View>

              {invoiceData.items.map((item, index) => {
                const price = parseFloat(item.price) || 0;
                const quantity = parseInt(item.quantity, 10) || 0;
                const tax = parseFloat(item.gst) || 0;
                const cgstRate = (tax / 2).toFixed(2);
                const sgstRate = (tax / 2).toFixed(2);
                const igstRate = 0;
                const cgstAmount = ((price * quantity) * (cgstRate / 100)).toFixed(2);
                const sgstAmount = ((price * quantity) * (sgstRate / 100)).toFixed(2);
                const igstAmount = 0;
                const totalTaxAmount = (parseFloat(cgstAmount) + parseFloat(sgstAmount)).toFixed(2);

                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{item.hsn || '-'}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{(price * quantity).toFixed(2)}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{cgstRate}%</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{cgstAmount}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{sgstRate}%</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{sgstAmount}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{igstRate}%</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{igstAmount}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{totalTaxAmount}</Text></View>
                  </View>
                );
              })}
            </View>
          </View> */}

        {/* Total Amount in Words */}
        <View style={styles.totalAmountSection}>
          <Text style={styles.text}>Total Amount (in words)</Text>
          <Text style={styles.text}>{numWords(totalAmount)}</Text>
          {/* <Text style={styles.text}>{formatCurrencyInWords(totalAmount)}</Text> */}
        </View>

        {/* Bank Details */}
        <View style={styles.bankDetailsSection}>
          <View style={styles.bankDetails}>
            <Text style={styles.text}>Bank Details</Text>
            <Text style={styles.text}>Name: MG Traders</Text>
            <Text style={styles.text}>IFSC Code: CNRB0005984</Text>
            <Text style={styles.text}>Account No: 110005366346</Text>
            <Text style={styles.text}>Bank: CANARA BANK INDORE KESAR BAGH ROAD</Text>
          </View>
          <View style={styles.signature}>
            <Text style={styles.text}>Authorised Signatory For</Text>
            <Text style={styles.text}>MG Traders</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;