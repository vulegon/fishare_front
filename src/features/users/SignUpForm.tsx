import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import SubmmitButton from '../../components/SubmmitButton';
import InputForm from '../../components/InputForm';
import AlertMessage from '../../components/AlertMessage';
import { apiClient, MESSAGE } from '../../services/apiClient';
import { AlertColor } from '@mui/material';

function SignUpForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('error');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiClient('/users', 'POST', {
        name: name,
        email: email,
        password: password,
      });
      if (response.ok) {
        setSeverity('success');
      } 
      const json: MESSAGE = await response.json();
      console.log(json);
      const messages: string[] = Array.isArray(json.message) ? json.message : [json.message];
      setResponseMessage(messages);
      setAlertOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {alertOpen &&(
          <div style={{ width: '100%', marginBottom: '20px' }}>
            {responseMessage.map((message, index) => {
              return <AlertMessage key={index} message={message} severity={severity} />;
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
