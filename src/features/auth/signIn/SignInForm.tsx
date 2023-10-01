import React, { useState } from 'react';
import {
  InputTextField,
  InputPasswordField,
  InputFieldSpace,
  FormTitle,
  SubmmitButton,
  AuthContainer,
  ErrorMessageText,
} from '../components';
import { signIn } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../../headers/Header';

function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenErrorMessages, setIsOpenErrorMessages] = useState<boolean>(false);
  const [errors, setErrors] = useState<Messages>({});
  type Messages = {
    [key: string]: string[];
  };
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await signIn({ email: email, password: password });
      if (response.status === 200) {
        const accessToken = response.headers.get('access-token');
        const client = response.headers.get('client');
        const uid = response.headers.get('uid');

        if (accessToken && client && uid) {
          Cookies.set('_access_token', accessToken);
          Cookies.set('_client', client);
          Cookies.set('_uid', uid);
          navigate('/');
        }
      } else {
        const data = await response.json();
        setErrors(data);
        setIsOpenErrorMessages(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Header isShowSearchSpot={false} isShowUserAccountMenu={false} />
      <AuthContainer>
        <FormTitle value='ログイン'></FormTitle>
        <form onSubmit={handleSubmit} style={{ width: '400px' }}>
          {isOpenErrorMessages && <ErrorMessageText fieldKey={'message'} errors={errors} />}
          <InputTextField label={'メールアドレス'} value={email} setState={setEmail} />
          <InputFieldSpace />
          <InputPasswordField label={'パスワード'} value={password} setState={setPassword} />
          <InputFieldSpace />
          <SubmmitButton isLoading={isLoading} buttonText='ログイン'></SubmmitButton>
        </form>
      </AuthContainer>
    </>
  );
}

export default SignInForm;
