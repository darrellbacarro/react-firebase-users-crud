import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
