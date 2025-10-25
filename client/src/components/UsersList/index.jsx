import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './UsersList.module.sass';
import defImage from './defaultPhoto.jpg';
import { useEffect } from 'react';
import { deleteUserThunk, getUsersThunk } from '../../store/slices/usersSlice';

export const UsersList = ({
  users,
  isFetching,
  error,
  getUsers,
  deleteUser,
}) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul className={styles.userCard}>
        {users.map(u => (
          <li key={u.id} className={styles.itemsCard}>
            <img
              className={styles.userImage}
              src={
                u.image ? `http://localhost:5000/images/${u.image}` : defImage
              }
              alt={`${u.firstName} ${u.lastName}`}
            />
            <div className={styles.userInfo}>
              <h3>
                {u.firstName} {u.lastName}
              </h3>
              <p>{u.email}</p>
              <p>{u.gender}</p>
              {u.birthday && <p>{new Date(u.birthday).toLocaleDateString()}</p>}
              <div className={styles.button}>
                <button className={styles.buttonItems} onClick={() => deleteUser(u.id)}>Delete user</button>
                <button className={styles.buttonItems} >Get Tasks</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ usersData }) => usersData;

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersThunk()),
  deleteUser: id => dispatch(deleteUserThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
