import React from 'react';
import TaskList from './../../components/TaskList';
import TaskForm from '../../components/forms/TaskForm';
import { useNavigate } from 'react-router-dom';
import styles from './TaskPage.module.sass'

function TaskPage () {
  const navigate = useNavigate();

  const goBackToUsers = () => {
    navigate('/');
  };
  return (
    <>
      <section>
        <h2>Task Form</h2>
        <TaskForm />
        <TaskList />
      </section>
      <button className={styles.backBtn} onClick={goBackToUsers}>Back To Users</button>
    </>
  );
}

export default TaskPage;
