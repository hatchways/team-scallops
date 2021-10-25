import { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import { Conversation } from '../../../interface/Conversation';
import sendMessage from '../../../helpers/APICalls/sendMessage';
import useStyles from './useStyles';
interface Props {
  activeConversation: undefined | null | Conversation;
}
interface Form {
  message: string;
}

const MessageInput = ({ activeConversation }: Props): JSX.Element => {
  const [message, setMessage] = useState<string>('');
  const classes = useStyles();

  const handleSubmit = (
    _values: { message: string },
    {
      resetForm,
    }: FormikHelpers<{
      message: string;
    }>,
  ) => {
    sendMessage(activeConversation?._id, message).then(() => {
      setMessage('');
    });
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={Yup.object().shape({ message: Yup.string().required('Message text is required') })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} noValidate className={classes.inputForm}>
          <TextField
            className={classes.inputMessage}
            id="message"
            name="text"
            variant="standard"
            autoComplete="message"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send Message"
          />
          <Button type="submit" size="large" variant="contained" color="secondary" className={classes.sendButton}>
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MessageInput;
