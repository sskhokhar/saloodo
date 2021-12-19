import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email is required').required('Required'),
  password: Yup.string().required('Required'),
});
