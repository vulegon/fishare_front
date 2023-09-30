import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import InputHelpTextSpace from '../signUp/InputHelpTextSpace';
type Messages = {
  [key: string]: string[];
};

function ErrorMessageText({ fieldKey, errors }: { fieldKey: string; errors: Messages }) {
  const [errorMessages, setErrorMessages] = useState<string[]>(['']);

  useEffect(() => {
    const messages = errors[fieldKey];
    if (!errors[fieldKey]) return;
    if (Array.isArray(messages)) {
      const messages = errors[fieldKey];
      const set = new Set(messages);
      const newArr = [...set];
      setErrorMessages(newArr);
      return;
    }
    if (typeof messages === 'string') {
      setErrorMessages([messages]);
    }
  }, [fieldKey, errors]);

  return (
    <>
      {errorMessages.map((message, index) => (
        <Typography key={index} variant='caption' gutterBottom style={{ color: 'red' }}>
          {message}
          <br />
        </Typography>
      ))}
      <InputHelpTextSpace></InputHelpTextSpace>
    </>
  );
}

export default ErrorMessageText;
