import * as Yup from 'yup';
export const AddParcelSchema = Yup.object().shape({
  consigneeName: Yup.string().required('Required'),
  from: Yup.string().required('Required'),
  to: Yup.string().required('Required'),
});
