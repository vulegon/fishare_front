import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { ErrorMessages } from '../types/ErrorMessage';

function ErrorMessageText({ fieldKey, errors }: { fieldKey: string; errors: ErrorMessages }) {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

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
    console.log(errorMessages);
  }, [errors]);

  return (
    <>
      {errorMessages.map((message, index) => (
        <Typography key={index} variant='caption' gutterBottom style={{ color: 'red' }}>
          {message}
          <br />
        </Typography>
      ))}
    </>
  );
}

export default ErrorMessageText;
