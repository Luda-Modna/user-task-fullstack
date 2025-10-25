import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  deleteUserTaskThunk,
  getUserTasksThunk,
} from '../../store/slices/tasksSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TaskList.module.sass';

export const TaskList = ({
  tasks,
  isFetching,
  error,
  getUserTasks,
  deleteTask,
}) => {
  const { userId } = useParams();

  useEffect(() => {
    getUserTasks(userId);
  }, []);

  const handleDelete = taskId => {
    deleteTask({ userId, taskId });
  };

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>ERROR</div>}
      {tasks.length === 0 && !isFetching ? (
        <p className={styles.noTaskText}> No tasks yet</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map(t => (
            <li className={styles.taskListItems} key={t.id}>
              <p className={styles.taskText}>{t.body}</p>
              <p className={styles.taskText}>{t.deadline}</p>
              <button
                className={styles.deleteTaskBtn}
                onClick={() => {
                  handleDelete(t.id);
                }}
              >
                {' '}
                -{' '}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const mapStateToProps = ({ tasksData }) => tasksData;

const mapDispatchToProps = dispatch => ({
  getUserTasks: id => dispatch(getUserTasksThunk(id)),
  deleteTask: ({ userId, taskId }) =>
    dispatch(deleteUserTaskThunk({ userId, taskId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
