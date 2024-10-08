import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';
import CairoRegular from '../fonts/Cairo-Regular.ttf'; 
import CairoBold from '../fonts/Cairo-Bold.ttf'; 
import './VendorDetail.css'; 
import logo from '../group-17.png'; 

// تسجيل الخطوط
Font.register({
    family: 'Cairo',
    fonts: [
        { src: CairoRegular, fontWeight: 'normal' },
        { src: CairoBold, fontWeight: 'bold' },
    ],
});

// أنماط PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Cairo',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 80,
        marginVertical: 10,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1E5D87',
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    container: {
        marginBottom: 15,
        padding: 10,
        borderBottom: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontWeight: 'bold',
        color: '#1E5D87',
    },
    content: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
    },
    link: {
        color: '#1E5D87',
        textDecoration: 'underline',
    },
});

// Firebase URL
const firebaseUrl = 'https://new-e-learning-edecs-default-rtdb.firebaseio.com/';

const VendorDetail = () => {
    const { id } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await fetch(`${firebaseUrl}/vendors/${id}/vendorInfo.json`);
                if (!response.ok) {
                    throw new Error('Failed to load data: ' + response.statusText);
                }
                const data = await response.json();
                if (data && Object.keys(data).length > 0) {
                    setVendor(data);
                } else {
                    setError("No vendor data found.");
                }
            } catch (error) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchVendorData();
    }, [id]);

    const VendorDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ textAlign: 'center' }}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.subHeader}>Supplier Registration</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Registered Company Name:</Text>
                    <Text style={styles.content}>{vendor.vendorName || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}> Commercial Registration:</Text>
                    <Link style={styles.link} src={vendor.commercialRegistration}>
                        {vendor.commercialRegistration ? " Commercial Registration:" : 'N/A'}
                    </Link>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Company Email:</Text>
                    <Text style={styles.content}>{vendor.email || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Contact Person:</Text>
                    <Text style={styles.content}>{vendor.contactPerson || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.content}>{vendor.emailContact || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Contact Mobile No:</Text>
                    <Text style={styles.content}>{vendor.contactMobile || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Scope of Work:</Text>
                    <Text style={styles.content}>{vendor.scopeOfWork || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Project Proposed:</Text>
                    <Text style={styles.content}>{vendor.proposedProject || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Tax Card:</Text>
                    <Text style={styles.content}>{vendor.taxCard || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Federation Registration:</Text>
                    <Text style={styles.content}>{vendor.federation || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Classification:</Text>
                    <Text style={styles.content}>{vendor.classification || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Bank Account:</Text>
                    <Text style={styles.content}>{vendor.bankAccount || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Swift Code:</Text>
                    <Text style={styles.content}>{vendor.swiftCode || 'N/A'}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Remarks:</Text>
                    <Text style={styles.content}>{vendor.remarks || 'N/A'}</Text>
                </View>
            </Page>
        </Document>
    );

    if (loading) {
        return <div className="loading">Loading data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="vendor-detail" id="vendor-detail">
            <img src={logo} alt="EDCS Logo" className="logo" />
            <h2 className="sub-header">Supplier Registration</h2>
            <div className="container">
                <p><strong>Registered Company Name:</strong> {vendor.vendorName}</p>
                <p><strong> Commercial Registration:</strong> <a href={vendor.commercialRegistration}>{vendor.commercialRegistration ? " Commercial Registration:" : 'N/A'}</a></p>
                <p><strong>Company Email:</strong> {vendor.email}</p>
                <p><strong>Contact Person:</strong> {vendor.contactPerson}</p>
                <p><strong>Email:</strong> {vendor.emailContact}</p>
                <p><strong>Contact Mobile No:</strong> {vendor.contactMobile}</p>
                <p><strong>Scope of Work:</strong> {vendor.scopeOfWork}</p>
                <p><strong>Project Proposed:</strong> {vendor.proposedProject}</p>
                <p><strong>Tax Card:</strong> {vendor.taxCard}</p>
                <p><strong>Federation Registration:</strong> {vendor.federation}</p>
                <p><strong>Classification:</strong> {vendor.classification}</p>
                <p><strong>Bank Account:</strong> {vendor.bankAccount}</p>
                <p><strong>Swift Code:</strong> {vendor.swiftCode}</p>
                <p><strong>Remarks:</strong> {vendor.remarks}</p>
            </div>
            <PDFDownloadLink document={<VendorDocument />} fileName="vendor-details.pdf">
                {({ loading }) => (loading ? 'Preparing document...' : 'Download as pdf')}
            </PDFDownloadLink>
        </div>
    );
};

export default VendorDetail;
