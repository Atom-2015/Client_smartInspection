// Pdfbutton.js
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import Generatepdfdocument2 from './pdf/generatepdfdocument2';  
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

function Pdfbutton({id}) {
  const [data, setData] = useState(null);
  const [ executive_summary2 , setExecutive_summary2] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

//   useEffect(() => {
//     // Fetch the data needed for the PDF
//     async function fetchData() {
//         // console.log('APi called in button ');
//       try {
//         const reportId = id;
//         const response = await axios.get('/api/main/getpdfdata', {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': localStorage.getItem('token'),
//             'x-report-id': reportId,
//           },
//         });
//         setData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data for PDF:', error);
//       } finally {
//         setLoadingData(false);
//       }
//     }

//     fetchData();
//   }, []);


//   useEffect(() => {
//     const fetchExecutiveSummary = async () => {
//       try {
//         const response = await axios.get('/api/main/exesummary', {
//           headers: {
//             'x-auth-token': localStorage.getItem('token'),
//             'x-report-id': reportId,
//           },
//         });

//         if (response.status === 200) {
//           setExecutive_summary2(response.data.data.executive_summary);
//         }
//       } catch (error) {
//         console.error(`Error While getting the executive summary: ${error}`);
//       }
//     };

//     fetchExecutiveSummary();
//   }, [ ]);

//   if (loadingData) {
//     return <div>Loading data...</div>;
//   }

  return (
    <PDFDownloadLink
    document={
      <Document>
        <Page size="A4">
          <Generatepdfdocument2 data={data} executive_summary2={executive_summary2}  id={id} />
        </Page>
      </Document>
    }
    fileName="report.pdf"
  >
    {({ loading }) => loading ?  <FontAwesomeIcon icon={faFileArrowDown} style={{ color: 'white' }} /> : <FontAwesomeIcon icon={faFileArrowDown} style={{ color: 'white' }} />}
  </PDFDownloadLink>
  );
}

export default Pdfbutton;
