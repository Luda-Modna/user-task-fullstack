import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserPage from './pages/UserPage';
import TaskList from './components/TaskList';

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/users/:userId/tasks' element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
