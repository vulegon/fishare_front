import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Container, Box } from '@mui/material';
import InputTextField from '../InputTextField';
import InputHelpText from './InputHelpText';
import { signUp } from '../../../api/auth';
import ErrorMessageText from './ErrorMessageText';
import InputPasswordField from '../InputPasswordField';
import InputHelpTextSpace from './InputHelpTextSpace';
import InputFieldSpace from './InputFieldSpace';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [isOpenErrorMessages, setIsOpenErrorMessages] = useState<boolean>(false);
  const [errors, setErrors] = useState<Messages>({});
  type Messages = {
    [key: string]: string[];
  };
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signUp({
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        confirm_success_url: 'https://google.com', //パラメータとして使用しないが、送らないとできないため送る
      });
      if (response.status === 200) {
        navigate('/auth/sign_up/success');
      } else {
        const data = await response.json();
        setErrors(data.errors);
        setIsOpenErrorMessages(true);
      }
    } catch (e) {
      console.log('例外的なエラー');
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ border: '1px solid lightgrey', padding: '80px', width: 600 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h4' gutterBottom>
              ユーザー登録
            </Typography>
            <form onSubmit={handleSubmit}>
              <InputHelpText value={'20文字以内で入力してください'} />
              <InputHelpTextSpace></InputHelpTextSpace>
              <InputTextField label={'名前'} value={name} setState={setName} />
              {isOpenErrorMessages && <ErrorMessageText fieldKey={'name'} errors={errors} />}
              <InputFieldSpace></InputFieldSpace>
              <InputTextField label={'メールアドレス'} value={email} setState={setEmail} />
              {isOpenErrorMessages && <ErrorMessageText fieldKey={'email'} errors={errors} />}
              <InputFieldSpace></InputFieldSpace>
              <InputHelpText value={'8文字以上128文字以下で入力してください'} />
              <br />
              <InputHelpText value={'少なくとも1つ以上の小文字アルファベットと数字を含めてください'} />
              <InputHelpTextSpace></InputHelpTextSpace>
              <InputPasswordField label={'パスワード'} value={password} setState={setPassword} />
              {isOpenErrorMessages && <ErrorMessageText fieldKey={'password'} errors={errors} />}
              <InputFieldSpace></InputFieldSpace>
              <InputPasswordField
                label={'パスワード確認'}
                value={passwordConfirmation}
                setState={setPasswordConfirmation}
              />
              {isOpenErrorMessages && <ErrorMessageText fieldKey={'password_confirmation'} errors={errors} />}
              <InputFieldSpace></InputFieldSpace>
              <Button type='submit' variant='contained' color='primary' fullWidth>
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
