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
        const response = await axios.post('/api/main/storepdfimg', formData, {
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

