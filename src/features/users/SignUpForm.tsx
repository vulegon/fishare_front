import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import SubmmitButton from '../../components/SubmmitButton';
import InputForm from '../../components/InputForm';
import AlertMessage from '../../components/AlertMessage';

function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [severity, setSeverity] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          setSeverity('success');
        } else if (response.status === 400) {
          setSeverity('error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.message[0]);
        // if (Array.isArray(data.message)) {
        //   setResponseMessage(data.message);
        // } else {
        //   setResponseMessage([data.message]);
        // }
        setAlertOpen(true);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {alertOpen && (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            {responseMessage.map((message, index) => {
              return <AlertMessage key={index} message={message} />;
            })}
          </div>
        )}
        <Typography variant='h4' gutterBottom>
          ユーザー登録
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputForm label='Name' type='text' value={name} setValue={setName} />
          <InputForm label='Email' type='email' value={email} setValue={setEmail} />
          <InputForm label='Password' type='password' value={password} setValue={setPassword} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SubmmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
