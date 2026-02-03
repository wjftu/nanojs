import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrSize, setQrSize] = useState(600);
  const containerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerateQR = () => {
    // Safety check for extremely long text
    const MAX_SAFE_LENGTH = 5000;
    if (inputText.length > MAX_SAFE_LENGTH) {
      alert(`Text is too long (${inputText.length} characters). Please limit to ${MAX_SAFE_LENGTH} characters.`);
      return;
    }
    setQrValue(inputText);
  };

  // Calculate safe QR code size with limits to prevent crashes
  useEffect(() => {
    if (qrValue && containerRef.current) {
      try {
        const containerWidth = containerRef.current.offsetWidth;

        // Safety limits to prevent crashes with very long text
        const MAX_TEXT_LENGTH = 2000;  // Limit text length for QR generation
        const MAX_QR_SIZE = Math.min(800, containerWidth * 0.9);  // Absolute maximum size
        const MIN_QR_SIZE = 300;  // Minimum readable size

        // Use a safe subset of the text if it's too long
        const safeText = qrValue.length > MAX_TEXT_LENGTH
          ? qrValue.substring(0, MAX_TEXT_LENGTH) + "[...truncated]"
          : qrValue;

        // Calculate size based on safe text length
        const sizeBasedOnContent = Math.min(
          MAX_QR_SIZE,
          300 + (safeText.length * 0.1)  // Less aggressive growth factor
        );

        setQrSize(Math.max(MIN_QR_SIZE, sizeBasedOnContent));
      } catch (error) {
        console.error("Error calculating QR size:", error);
        // Fallback to default size if anything goes wrong
        setQrSize(400);
      }
    }
  }, [qrValue]);

  // Inline styles for the component
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
      maxWidth: '100%',
      margin: '0',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      color: '#2c3e50',
      marginBottom: '15px',
      fontSize: '24px',
      textAlign: 'center',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '800px',
      marginBottom: '20px',
    },
    textarea: {
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      minHeight: '100px',
      resize: 'vertical',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      alignSelf: 'flex-end',
    },
    qrDisplay: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '10px',
      padding: '10px',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
    },
    instruction: {
      color: '#7f8c8d',
      fontSize: '14px',
      textAlign: 'center',
      margin: '5px 0 0 0',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>QR Code Generator</h2>
      <div style={styles.inputGroup}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to encode (URLs, messages, etc.)"
          style={styles.textarea}
        />
        <button onClick={handleGenerateQR} style={styles.button}>
          Generate QR Code
        </button>
      </div>

      {qrValue && (
        <div style={styles.qrDisplay} ref={containerRef}>
          <div style={styles.qrCode}>
            <QRCodeSVG
              value={qrValue}
              size={qrSize}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              style={{ display: 'block', margin: '0 auto', width: '100%', height: 'auto' }}
            />
          </div>
          <p style={styles.instruction}>Scan this QR code with your phone</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
