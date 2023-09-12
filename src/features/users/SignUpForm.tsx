import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import InputTextField from './InputTextField';
import { Box } from '@mui/material';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // setSeverity('success');
        } else if (response.status === 400) {
          // setSeverity('error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.message[0]);
        if (Array.isArray(data.message)) {
          // setResponseMessage(data.message);
        } else {
          // setResponseMessage([data.message]);
        }
        // setAlertOpen(true);
      });
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ border: '1px solid lightgrey', padding: '80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h4' gutterBottom>
              ユーザー登録
            </Typography>
            <form onSubmit={handleSubmit}>
              <InputTextField label={'ユーザー名'} value={name} setState={setName} />
              <InputTextField label={'メールアドレス'} value={email} setState={setEmail} />
              <InputTextField label={'パスワード'} value={password} setState={setPassword} />
              <Box sx={{ height: 15 }}></Box>
              <Button variant='contained' color='primary' fullWidth>
                登録
              </Button>
            </form>
          </div>
        </Box>
      </div>
    </Container>
  );
}

export default SignUp;
