import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
type Messages = {
  [key: string]: string[];
};

function ErrorMessageText({ fieldKey, errors }: { fieldKey: string; errors: Messages }) {
  const [errorMessages, setErrorMessages] = useState<string[]>(['']);

  useEffect(() => {
    if (errors[fieldKey]) {
      const messages = errors[fieldKey];
      const set = new Set(messages);
      console.log(set);
      const newArr = [...set];
      setErrorMessages(newArr);
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
    </>
  );
}

export default ErrorMessageText;
