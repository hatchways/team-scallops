import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import useStyles from './useStyles';
interface Props {
  handleMessageSend: (
    values: {
      message: string;
    },
    props: FormikHelpers<{
      message: string;
    }>,
  ) => void;
}

const MessageInput = ({ handleMessageSend }: Props): JSX.Element => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({ message: Yup.string().required('Message text is required') });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleMessageSend,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.inputForm}>
      <TextField
        className={classes.inputMessage}
        id="message"
        name="message"
        variant="standard"
        type="text"
        value={formik.values.message}
        autoComplete="message"
        onChange={formik.handleChange}
        placeholder="Send Message"
      />
      <Button type="submit" size="large" variant="contained" color="secondary" className={classes.sendButton}>
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
