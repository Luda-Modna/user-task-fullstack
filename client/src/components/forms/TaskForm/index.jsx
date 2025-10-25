import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import React from 'react';
import { TASK_VALIDATION_SCHEMA } from '../../../utils/validate/validationSchemas';
import Input from '../Input';
import { createTasksThunk } from '../../../store/slices/tasksSlice';
import styles from './TaskForm.module.sass';

function TaskForm ({ createTask }) {
  const { userId } = useParams();

  const initialValues = {
    body: '',
    deadline: '',
  };

  const handleSubmit = async (values, formikBag) => {
    await createTask(userId, values);
    formikBag.resetForm();
  };

  const classes = {
    input: 'input',
    valid: 'valid',
    invalid: 'invalid',
    error: 'error',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={TASK_VALIDATION_SCHEMA}
    >
      <Form className={styles.taskForm}>
        <Input 
        label='Task text: ' 
        type='text' 
        name='body' 
        classes={classes} 
        className={styles.taskInput}/>
        <Input
          label='Deadline: '
          type='date'
          name='deadline'
          classes={classes}
          className={styles.taskInput}
        />
        <button className={styles.saveTaskBtn} type='submit'>Save</button>
      </Form>
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  createTask: (userId, values) =>
    dispatch(createTasksThunk({ userId, values })),
});

export default connect(null, mapDispatchToProps)(TaskForm);
