import React, { useState } from 'react';
import {
  InputTextField,
  InputPasswordField,
  InputFieldSpace,
  FormTitle,
  SubmmitButton,
  AuthContainer,
} from '../components/Index';
function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <AuthContainer>
      <FormTitle value='ログイン'></FormTitle>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <InputTextField label={'メールアドレス'} value={email} setState={setEmail} />
        <InputFieldSpace />
        <InputPasswordField label={'パスワード'} value={password} setState={setPassword} />
        <InputFieldSpace />
        <SubmmitButton value={'ログイン'}></SubmmitButton>
      </form>
    </AuthContainer>
  );
}

export default SignInForm;
