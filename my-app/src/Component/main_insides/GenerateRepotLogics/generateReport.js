  import React, { useState, useRef } from 'react';
  import { PDFDownloadLink, PDFViewer, Document, Page } from '@react-pdf/renderer';
  import Generatepdfdocument from './generatepdfdocument';
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import RichtextEditor from './richtextEditor';


  const GenerateReport = () => {
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);
    // const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue()); // Editor state
    const fileInputRef = useRef(null); // Functional ref for file input

    const handleUpload = async (file) => {
      if (!file) {
        alert('Please select a file to upload');
        return;
      }
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://13.201.248.202:3001/api/main/storepdfimg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': localStorage.getItem('token'),
            'x-report-id': Cookies.get('reportId'),
          },
        });

        if (response.status === 200) {
          setUploadSuccess(true);
          setUploadError(null);
        }
      } catch (error) {
        setUploadError('Error uploading the image');
      }
    };

    const triggerFileUpload = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleUpload(file);
      }
    };

    const closePopup = () => {
      setUploadSuccess(false);
      setUploadError(null);
    };

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f7f7f7',
      },
      button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
      },
      summaryButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
      },
      uploadButton: {
        backgroundColor: '#1E90FF',
        color: 'white',
      },
      pdfContainer: {
        marginTop: '20px',
        width: '100%',
        height: '100%',
      },
      popup: {
        position: 'fixed',
        top: '10%',
        right: '10%',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      closeButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '25px',
        height: '25px',
        cursor: 'pointer',
        textAlign: 'center',
      },
    };

    return (
      <>
        {/* Button Container */}
        <div style={styles.container}>
          <button
            style={{ ...styles.button, ...styles.summaryButton }}
            onClick={() => setEditorOpen(!editorOpen)} // Toggle editor visibility
          >
            Summary
          </button>

          {/* Upload Image Button */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button
            onClick={triggerFileUpload}
            style={{ ...styles.button, ...styles.uploadButton }}
          >
            Upload Logo
          </button>

          {/* Download PDF Button */}
          <PDFDownloadLink
            document={
              <Document>
                <Page size="A4">
                  <Generatepdfdocument />
                </Page>
              </Document>
            }
            fileName="sample.pdf"
          >
            {({ loading }) => (
              <button style={styles.button}>
                {loading ? 'Loading...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        {/* Rich Text Editor */}
        {editorOpen && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <RichtextEditor/>
          </div>
        )}

        {/* Popup Notification */}
        {uploadSuccess && (
          <div style={styles.popup}>
            <p style={{ margin: 0, color: 'green' }}>Image uploaded successfully!</p>
            <button style={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
          </div>
        )}

        {uploadError && (
          <div style={styles.popup}>
            <p style={{ margin: 0, color: 'red' }}>{uploadError}</p>
            <button style={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
          </div>
        )}

        {/* PDF Viewer */}
        <div style={styles.pdfContainer}>
          <h1 className="text-4xl font-bold text-white">Preview Your PDF</h1>
          <PDFViewer style={{ width: '100%', height: '90%' }}>
            <Document>
              <Page size="A4">
                <Generatepdfdocument />
              </Page>
            </Document>
          </PDFViewer>
        </div>
      </>
    );
  };

  export default GenerateReport;




//   import React, { useEffect, useState } from 'react';
// import { Text, View, StyleSheet, Image, Svg, Polygon } from '@react-pdf/renderer';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import imagehai from '../../Media/atom1.png'; // Default logo
// import building from '../../img/Building.png';
// import bridge from '../../img/bridge1.png';
// import bridge2 from '../../img/bridge2.png';
// import bridge3 from '../../img/bridge3.png';
// import celltower from '../../img/celltower.png';
// import celltower2 from '../../img/celltower2.png';
// import infrastructure from '../../img/infrastructure.png';
// import powerline from '../../img/powerline.png';
// import solarpanel from '../../img/solarpanel.png';
// import solar_panel from '../../img/solar_panel.png';
// import solar_power from '../../img/solar_power.png';
// import windturbine3 from '../../img/windturbine3.jpg';


// function Generatepdfdocument(data) {
//   const [imagedata, setImagedata] = useState([]);
//   const [executive_summary, setExecutive_summary] = useState(null);
//   const [error, setError] = useState(null);
//   const [mainImage, setMainImage] = useState(null);
//   const [uploadedLogo, setUploadedLogo] = useState(null);

//   let reportId = Cookies.get('reportId');

//   useEffect(() => {
//     console.log(data)
//     // if(localStorage.getItem('reportpdf')=== undefined){
//     //   alert(Cookies.get('reportId'));
//     //   reportId=Cookies.get('reportId');
//     // }else{
//     //   reportId= localStorage.getItem('reportpdf');
//     // } 
//   }, []);

//   const getImageByInspectionType = (type) => {
//     let inspectionType = type?.toLowerCase().trim();
//     let ans = '';
//     let i = 0;
//     while (i < inspectionType.length) {
//       if (inspectionType.charAt(i) != ' ') {
//         ans += inspectionType.charAt(i);
//         i++;
//       } else {
//         i++;
//       }
//     }
//     // console.log(ans , "YEE Inspaction type hai report ke andar")
//     switch (ans) {
//       case 'building':
//         return building;
//       case 'bridge':
//         return bridge;
//       case 'bridge2':
//         return bridge2;
//       case 'bridge3':
//         return bridge3;
//       case 'celltower':
//         return celltower;
//       case 'celltower2':
//         return celltower2;
//       case 'infrastructure':
//         return infrastructure;
//       case 'powerline':
//         return powerline;
//       case 'solarpanel':
//         return solarpanel;
//       case 'solar_panel':
//         return solar_panel;
//       case 'solar_power':
//         return solar_power;

//       case 'windturbine':
//         return windturbine3;
//       default:
//         return imagehai; // Default image if no match
//     }
//   };


//   useEffect(() => {
//     const fetchImageData = async () => {
//       try {
//         const response = await axios.get('http://13.201.248.202:3001/api/main/getpdfdata', {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': localStorage.getItem('token'),
//             'x-report-id': reportId,
//           },
//         });

//         const data = response.data.data;
//         setMainImage(data.main_image || null);
//         const filteredImages = data.images.filter((img) =>
//           img.reportDetails.length > 0
//         );
//         setImagedata(filteredImages);
//       } catch (error) {
//         setError('Error fetching image data from API');
//       }
//     };

//     fetchImageData();
//   }, [reportId]);

//   useEffect(() => {
//     const fetchExecutiveSummary = async () => {
//       try {
//         const response = await axios.get('http://13.201.248.202:3001/api/main/exesummary', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'x-report-id': reportId,
//           },
//         });

//         if (response.status === 200) {
//           setExecutive_summary(response.data.data.executive_summary);
//         }
//       } catch (error) {
//         console.error(`Error While getting the executive summary: ${error}`);
//       }
//     };

//     fetchExecutiveSummary();
//   }, [reportId]);

//   const handleLogoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedLogo(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const findimage = () => {
//     const value = Cookies.get('inspactiontype');
//     value.toLocaleLowerCase().trim();
//     //  for(let i=0;i<value.length;i++){

//     //  }
//     return value;
//   }

//   const styles = StyleSheet.create({
//     container: {
//       margin: 10,
//       padding: 10,
//     },
//     logoContainer: {
//       alignItems: 'center',
//       marginBottom: 20,
//     },
//     logo: {
//       width: 150,
//       height: 150,
//       borderRadius: 8,
//       objectFit: 'cover',
//     },

//     imageCriteria: {
//       width: '80%',
//     height: 400,
//     margin: '0 auto',
//     borderRadius: '20px', // Adjust the value for more or less rounded edges
//     overflow: 'hidden'

//     },
//     summaryContainer: {
//       marginBottom: 20,
//       padding: 10,
//       backgroundColor: '#f1f5f9',
//       borderRadius: 8,
//     },
//     summaryHeader: {
//       fontSize: 12,
//       fontWeight: 'bold',
//       marginBottom: 5,
//       textAlign: 'center',
//       color: '#333',
//     },
//     // summaryText: {
//     //   fontSize: 10,
//     //   lineHeight: 1.5,
//     // },
//     section: {
//       marginBottom: 15,
//       padding: 10,
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//       backgroundColor: '#ffffff',
//       borderRadius: 8,
//     },
//     imageContainer: {
//       position: 'relative',
//       width: 200,
//       height: 150,
//     },
//     // image: {
//     //   width: 150,
//     //   height: 120,
//     //   borderRadius: 8,
//     //   objectFit: 'cover',
//     // },
//     rectangle: {
//       position: 'absolute',
//       borderColor: 'white',
//       fill: "rgba(255,255,255,0.3)",
//       borderWidth: 2,
//     },
//     table: {
//       flex: 1,
//     },
//     tableHeaderRow: {
//       flexDirection: 'row',
//       backgroundColor: '#000000',
//       marginBottom: 5,
//     },
//     tableHeaderCell: {
//       flex: 1,
//       paddingVertical: 4,
//       marginHorizontal: 2,
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//       fontSize: 10,
//     },
//     tableDataRow: {
//       flexDirection: 'row',
//       marginBottom: 5,
//     },
//     tableDataCell: {
//       flex: 1,
//       padding: 4,
//       textAlign: 'center',
//       fontSize: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: '#ddd',
//     },
//     errorText: {
//       color: 'red',
//     },
//     // footer: {
//     //   position: 'absolute',
//     //   bottom: 10,
//     //   right: 10,
//     //   fontSize: 10,
//     //   color: 'blue',
//     // },
//     page: {
//       width: '210mm',  // A4 width
//       height: '297mm', // A4 height
//       padding: 20,
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     grid: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//       gap: 20,
//       marginTop: 10,
//     },
//     imageWrapper: {
//       width: '48%', // 2 images per row (2x2 grid)
//       height: 200,  // Fixed height for each image section
//       marginBottom: 10,
//       position: 'relative',
//     },
//     image: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       borderRadius: 8,
//     },
//     text: {
//       textAlign: 'center',
//       fontSize: 12,
//       fontWeight: 'bold',
//       marginTop: 5,
//     },
//     summaryText: {
//       fontSize: 10,
//       lineHeight: 1.5,
//       textAlign: 'center',
//     },
//     footer: {
//       position: 'absolute',
//       bottom: 10,
//       textAlign: 'center',
//       fontSize: 10,
//       color: 'blue',
//     },

//   });

//   return (
//     <View style={styles.container}>


//       {error && <Text style={styles.errorText}>{error}</Text>}
//       <View>
//         {/* <Image src={Cookies.get('inspactiontype').toLowerCase().trim()} /> */}
//         <Image
//           src={getImageByInspectionType(Cookies.get('inspactiontype'))}
//           style={styles.imageCriteria}
//           alt="Inspection Type Image"
//         />
//       </View>
//       {/* Logo Upload */}
//       <View style={styles.logoContainer}>
//         <input type="file" onChange={handleLogoUpload} accept="image/*" />
//         <Image
//           src={uploadedLogo || imagehai}
//           style={styles.logo}
//           alt="Company Logo"
//         />
//       </View>



//       {/* Executive Summary */}
//       {executive_summary && (
//         <View style={styles.summaryContainer}>
//           <Text style={styles.summaryHeader}>Executive Summary</Text>
//           <Text style={styles.summaryText}>{executive_summary}</Text>
//         </View>
//       )}

//       {/* Issue Details */}
//       {imagedata.length > 0 ? (
//         imagedata.map((imageData, index) => {
//           const originalWidth = 1024;
//           const originalHeight = 768;
//           const scaleX = styles.imageContainer.width / originalWidth;
//           const scaleY = styles.imageContainer.height / originalHeight;

//           return (
//             <View key={index} style={styles.section}>
//               <View style={styles.imageContainer}>
//                 <Image
//                   src={imageData.imageUrl}
//                   style={styles.image}
//                   alt={`Image ${index + 1}`}
//                 />

//                 {/* Overlay Rectangles */}
//                 {imageData.shapes.rectangles.map((rect, rectIndex) => (
//                   <View
//                     key={rectIndex}
//                     style={{
//                       ...styles.rectangle,
//                       top: rect.y * scaleY,
//                       left: rect.x * scaleX,
//                       width: rect.width * scaleX,
//                       height: rect.height * scaleY,
//                     }}
//                   />
//                 ))}

//                 {/* Overlay Polygons */}
//                 {imageData.shapes.polygons.map((polygon, polyIndex) => {
//                   const pointsString = polygon.points
//                     .map((point) => `${point.x * scaleX},${point.y * scaleY}`)
//                     .join(' ');

//                   return (
//                     <Svg
//                       key={polyIndex}
//                       style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//                     >
//                       <Polygon
//                         points={pointsString}
//                         stroke="white"
//                         fill="none"
//                         strokeWidth={1}
//                       />
//                     </Svg>
//                   );
//                 })}
//                 {imageData.fastInspection.map((shape, fastIndex) => (
//                   <View
//                     key={`fast-${fastIndex}`}
//                     style={{
//                       position: 'absolute',
//                       top: shape.y * scaleY,
//                       left: shape.x * scaleX,
//                       width: shape.width * scaleX,
//                       height: shape.height * scaleY,
//                       borderWidth: 1.3,
//                       borderColor: 'yellow',
//                       backgroundColor: 'rgba(255, 255, 0, 0.3)',
//                     }}
//                   />
//                 ))}
//               </View>

//               {/* Display Report Details Table */}
//               <View style={styles.table}>
//                 {/* Single Row of Headers */}
//                 <View style={styles.tableHeaderRow}>
//                   <Text style={styles.tableHeaderCell}>Component</Text>
//                   <Text style={styles.tableHeaderCell}>Issue Type</Text>
//                   <Text style={styles.tableHeaderCell}>Severity</Text>
//                   <Text style={styles.tableHeaderCell}>Remedy Action</Text>
//                   <Text style={styles.tableHeaderCell}>Repair Cost</Text>
//                   <Text style={styles.tableHeaderCell}>Comment</Text>
//                 </View>

//                 {/* Data Row for Each Detail */}
//                 {imageData.reportDetails.map((detail, detailIndex) => (
//                   <View key={detailIndex} style={styles.tableDataRow}>
//                     <Text style={styles.tableDataCell}>{detail.component}</Text>
//                     <Text style={styles.tableDataCell}>{detail.Issuetype}</Text>
//                     <Text style={styles.tableDataCell}>{detail.severity}</Text>
//                     <Text style={styles.tableDataCell}>
//                       {detail.remedy_action || detail.remedyAction || '-'}
//                     </Text>
//                     <Text style={styles.tableDataCell}>
//                       {detail.repair_cost || detail.repairCost || '-'}
//                     </Text>
//                     <Text style={styles.tableDataCell}>{detail.comment || '-'}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>

//           );
//         })
//       ) : (
//         <View style={styles.section}>
//           <Text>No relevant data available for this report.</Text>
//         </View>
//       )}

//       {/* Error Message */}

//       <Text style={styles.footer}>www.thesmartinspection.com</Text>

//     </View>
//   );
// }

// export default Generatepdfdocument;