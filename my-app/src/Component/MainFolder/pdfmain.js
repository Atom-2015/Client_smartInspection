    import React, { useEffect, useState } from 'react';
    import { Text, View, StyleSheet, Image, Svg, Polygon } from '@react-pdf/renderer';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    // import imagehai from '../../Media/atom1.png'; // Default logo
    import imagehai from '../Media/atom1.png'

    function Generatepdfdocumentmain(reportId) {
    const [imagedata, setImagedata] = useState([]);
    const [executive_summary, setExecutive_summary] = useState(null);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [uploadedLogo, setUploadedLogo] = useState(null);
    // let reportId
    // useEffect(()=>{
    //     reportId = Cookies.get('reportIdpdf');
    // },[])
    

    useEffect(() => {
        console.log("REport id in pdf data : ",reportId)
        const fetchImageData = async () => {
        try {
            const response = await axios.get('/api/main/getpdfdata', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
                'x-report-id': reportId,
            },
            });

            const data = response.data.data;
            setMainImage(data.main_image || null);
            const filteredImages = data.images.filter((img) =>
            img.reportDetails.length > 0
            );
            setImagedata(filteredImages);
        } catch (error) {
            setError('Error fetching image data from API');
        }
        };

        fetchImageData();
    }, [reportId]);

    useEffect(() => {
        const fetchExecutiveSummary = async () => {
        try {
            const response = await axios.get('/api/main/exesummary', {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'x-report-id': reportId,
            },
            });

            if (response.status === 200) {
            setExecutive_summary(response.data.data.executive_summary);
            }
        } catch (error) {
            console.error(`Error While getting the executive summary: ${error}`);
        }
        };

        fetchExecutiveSummary();
    }, [reportId]);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedLogo(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const styles = StyleSheet.create({
        container: {
        margin: 10,
        padding: 10,
        },
        logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        },
        logo: {
        width: 150,
        height: 150,
        borderRadius: 8,
        objectFit: 'cover',
        },
        summaryContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        },
        summaryHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#333',
        },
        summaryText: {
        fontSize: 10,
        lineHeight: 1.5,
        },
        section: {
        marginBottom: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        },
        imageContainer: {
        position: 'relative',
        width: 200,
        height: 150,
        },
        image: {
        width: 150,
        height: 120,
        borderRadius: 8,
        objectFit: 'cover',
        },
        rectangle: {
        position: 'absolute',
        borderColor: 'white',
        fill:"rgba(255,255,255,0.3)",
        borderWidth: 2,
        },
        table: {
        flex: 1,
        },
        tableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        marginBottom: 5,
        },
        tableHeaderCell: {
        flex: 1,
        paddingVertical: 4,
        marginHorizontal: 2,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 10,
        },
        tableDataRow: {
        flexDirection: 'row',
        marginBottom: 5,
        },
        tableDataCell: {
        flex: 1,
        padding: 4,
        textAlign: 'center',
        fontSize: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        },
        errorText: {
        color: 'red',
        },
    });
    

    return (
        <View style={styles.container}>
        {/* Logo Upload */}
        <View style={styles.logoContainer}>
            <input type="file" onChange={handleLogoUpload} accept="image/*" />
            <Image
            src={uploadedLogo || imagehai}
            style={styles.logo}
            alt="Company Logo"
            />
        </View>

        {/* Executive Summary */}
        {executive_summary && (
            <View style={styles.summaryContainer}>
            <Text style={styles.summaryHeader}>Executive Summary</Text>
            <Text style={styles.summaryText}>{executive_summary}</Text>
            </View>
        )}

        {/* Issue Details */}
        {imagedata.length > 0 ? (
            imagedata.map((imageData, index) => {
            const originalWidth = 1024;
            const originalHeight = 768;
            const scaleX = styles.imageContainer.width / originalWidth;
            const scaleY = styles.imageContainer.height / originalHeight;

            return (
                <View key={index} style={styles.section}>
                <View style={styles.imageContainer}>
                    <Image
                    src={imageData.imageUrl}
                    style={styles.image}
                    alt={`Image ${index + 1}`}
                    />

                    {/* Overlay Rectangles */}
                    {imageData.shapes.rectangles.map((rect, rectIndex) => (
                    <View
                        key={rectIndex}
                        style={{
                        ...styles.rectangle,
                        top: rect.y * scaleY,
                        left: rect.x * scaleX,
                        width: rect.width * scaleX,
                        height: rect.height * scaleY,
                        }}
                    />
                    ))}

                    {/* Overlay Polygons */}
                    {imageData.shapes.polygons.map((polygon, polyIndex) => {
                    const pointsString = polygon.points
                        .map((point) => `${point.x * scaleX},${point.y * scaleY}`)
                        .join(' ');

                    return (
                        <Svg
                        key={polyIndex}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        >
                        <Polygon
                            points={pointsString}
                            stroke="white"
                            fill="none"
                            strokeWidth={1}
                        />
                        </Svg>
                    );
                    })}
                </View>

                {/* Display Report Details Table */}
                <View style={styles.table}>
                    {/* Single Row of Headers */}
                    <View style={styles.tableHeaderRow}>
                    <Text style={styles.tableHeaderCell}>Component</Text>
                    <Text style={styles.tableHeaderCell}>Issue Type</Text>
                    <Text style={styles.tableHeaderCell}>Severity</Text>
                    <Text style={styles.tableHeaderCell}>Remedy Action</Text>
                    <Text style={styles.tableHeaderCell}>Repair Cost</Text>
                    <Text style={styles.tableHeaderCell}>Comment</Text>
                    </View>

                    {/* Data Row for Each Detail */}
                    {imageData.reportDetails.map((detail, detailIndex) => (
                    <View key={detailIndex} style={styles.tableDataRow}>
                        <Text style={styles.tableDataCell}>{detail.component}</Text>
                        <Text style={styles.tableDataCell}>{detail.Issuetype}</Text>
                        <Text style={styles.tableDataCell}>{detail.severity}</Text>
                        <Text style={styles.tableDataCell}>
                        {detail.remedy_action || detail.remedyAction || '-'}
                        </Text>
                        <Text style={styles.tableDataCell}>
                        {detail.repair_cost || detail.repairCost || '-'}
                        </Text>
                        <Text style={styles.tableDataCell}>{detail.comment || '-'}</Text>
                    </View>
                    ))}
                </View>
                </View>
            );
            })
        ) : (
            <View style={styles.section}>
            <Text>No relevant data available for this report.</Text>
            </View>
        )}

        {/* Error Message */}
        {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
    }

    export default Generatepdfdocumentmain;
 