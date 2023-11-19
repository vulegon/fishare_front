import React, { useEffect, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertMessageContext } from '../../contexts/alertMessage/alertMessageContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function SnackBar() {
  const { alertMessage, setAlertMessage } = useContext(AlertMessageContext);
  const handleClose = () => {
    setAlertMessage((prevAlertMessage) => ({ ...prevAlertMessage, status: 'info', message: '' }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // 指定の時間経過後にSnackbarを閉じる
      setAlertMessage((prevAlertMessage) => ({ ...prevAlertMessage, status: 'info', message: '' }));
    }, 3000); // 6秒後に閉じる（autoHideDurationの値と合わせる）

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Snackbar
      open={alertMessage.message !== ''}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={alertMessage.status} sx={{ width: '100%' }}>
        {alertMessage.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
