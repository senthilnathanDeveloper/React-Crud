import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages';
import BookList from './Pages/BookList';
import Error from './Pages/Error';
import Forms from './Pages/Forms';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='booklist' element={<BookList/>}></Route>
        <Route path='forms' element={<Forms/>}/>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
