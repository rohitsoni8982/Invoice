import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../components/image.png'
import numWords from "num-words";

const CreditPDF = ({ creditData }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      <View> 
        <Text style={styles.tax}>CREADIT NOTE</Text>
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
                    <Text style={styles.title}>{creditData.companyName}</Text>
                    <Text style={styles.subtitle}>{creditData.companyAddress}</Text>
                    <Text style={styles.subtitle}>GSTIN: {creditData.gstNumber}</Text>
                    <Text style={styles.subtitle}>Mobile: {creditData.companyMobile}</Text>
                  </View>
                </View>
              </View>

              {/* Invoice Details */}
              <View style={styles.invoice_section}>
                <View style={styles.invoice_item}>
                  <Text style={styles.text}>Credit No:</Text>
                  <Text style={styles.text}>{creditData.credit_number}</Text>
                </View>
                <View style={styles.invoice_item}>
                  <Text style={styles.text}>Credit Date:</Text>
                  <Text style={styles.text}>{creditData.creadit_note_data}</Text>
                </View>
                <View style={styles.invoice_item}>
                  <Text style={styles.text}>Invoice Date:</Text>
                  <Text style={styles.text}>{creditData.invoice_date}</Text>
                </View>
              </View>
            </View>
          </View>


          {/* Billing Details */}
          <View style={styles.bill_box_section}>
            <View style={styles.bill_section}>

              <View style={styles.customer_section}>
                <View>
                  <Text style={styles.text}>Bill To: {creditData.billing_name}</Text>
                </View>
                <View>
                  <Text style={styles.text}>GST:{creditData.billing_gst_number}</Text>
                </View>
                <View>
                  <Text style={styles.text}>Mobile:{creditData.billing_phone_number}</Text>
                </View>
              </View>

              <View style={styles.customer_address_section}>
                <Text style={styles.text}>Ship To:</Text>
                <Text style={styles.bill_address}>{creditData.billing_address}</Text>
              </View>
            </View>
          </View>

          {/* Items Table */}
          <View>
          {/* <View style={styles.section}> */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, { backgroundColor: '#f0f0f0' }]}>
                <View style={styles.tableColsr}><Text style={styles.tableCell}>Sr No</Text></View>
                <View style={styles.tableColdec}><Text style={styles.tableCell}>Description</Text></View>
                <View style={styles.tableColacc}><Text style={styles.tableCell}>Amount</Text></View>
              </View>

              {/* Table Rows */}
                  <View style={styles.tableRow}>
                    <View style={styles.tableColsr}><Text style={styles.tableCell}>{1}</Text></View>
                    <View style={styles.tableColdec}><Text style={styles.tableCell}>{creditData.description} invoice {creditData.invoice_number}</Text></View>
                    <View style={styles.tableColacc}><Text style={styles.tableCell}>{creditData.credit_amount}</Text></View>
                  </View>        
            </View>
          </View>
        </View>

        {/* Total Amount in Words */}
        <View style={styles.totalAmountSection}>
          <Text style={styles.text}>Total Amount (in words)</Text>
          <Text style={styles.text}>{numWords(creditData.credit_amount)}</Text>
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

export default CreditPDF;

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
    tableColsr: {
      width: '10.28%', // Distribute width evenly
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 5,
      textAlign: 'center',
    },
    tableColdec: {
      width: '70.28%', // Distribute width evenly
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 5,
      textAlign: 'center',
    },
    tableColacc: {
      width: '20.28%', // Distribute width evenly
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
  });