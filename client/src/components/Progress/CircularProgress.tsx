import React from 'react';
import { Spinner } from 'react-bootstrap';

const styles = {
  spinnerDiv: {
    fontSize: '1.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 112px)',
  },
  spinner: {
    width: '12rem',
    height: '12rem',
  },
};

function CircularProgress() {
  return (
    <div style={styles.spinnerDiv}>
      <Spinner style={styles.spinner} animation="border" variant="secondary" />
    </div>
  );
}

export default CircularProgress;
