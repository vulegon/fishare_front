import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function FlashMessage({
  status,
  message,
  isFlashMessageOpen,
  setIsFlashMessageOpen,
}: {
  status: AlertColor;
  message: string;
  isFlashMessageOpen: boolean;
  setIsFlashMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    setIsFlashMessageOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // 指定の時間経過後にSnackbarを閉じる
      setIsFlashMessageOpen(false);
    }, 3000); // 6秒後に閉じる（autoHideDurationの値と合わせる）

    return () => {
      clearTimeout(timer); // コンポーネントがアンマウントされたらタイマーをクリア
    };
  }, []);
  return (
    <Snackbar
      open={isFlashMessageOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default FlashMessage;
