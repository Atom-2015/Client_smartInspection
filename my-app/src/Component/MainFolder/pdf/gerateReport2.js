import React, { useState, useRef } from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page } from '@react-pdf/renderer';
import Generatepdfdocument2 from './generatepdfdocument2';
import axios from 'axios';
import Cookies from 'js-cookie';
import RichtextEditor from './richtextEditor';


const GenerateReport2 = () => {
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
    <div style={styles.container}>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4">
              <Generatepdfdocument2 data={data} executive_summary2={executive_summary2} />
            </Page>
          </Document>
        }
        fileName="sample.pdf"
      >
        {({ loading }) => <button style={styles.button}>{loading ? 'Loading...' : 'Download PDF'}</button>}
      </PDFDownloadLink>
    </div>

    <div style={styles.pdfContainer}>
      <PDFViewer style={{ width: '100%', height: '90%' }}>
        <Document>
          <Page size="A4">
            <Generatepdfdocument2 data={data} executive_summary2={executive_summary2} />
          </Page>
        </Document>
      </PDFViewer>
    </div>
  </>
  );
};

export default GenerateReport2;

