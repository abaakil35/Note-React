import React from 'react';

const MessageConfirmation = ({
  message = "Are you sure you want to proceed?",
  onSubmit,
  onCancel
}) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.submitButton} onClick={onSubmit}>
            Submit
          </button>
          <button style={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '90%',
  },
  message: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MessageConfirmation;
