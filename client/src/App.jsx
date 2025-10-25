import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserPage from './pages/UserPage';
import TaskPage from './pages/TaskPage';

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/users/:userId/tasks' element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
