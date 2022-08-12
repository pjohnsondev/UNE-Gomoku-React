import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import Header from'./components/Header';
import { Home, Login, SignUp, Game, GameLog, History } from './pages'

function App() {
  return (
    <>
      <Header></Header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          {/* <Route path="/game/:gameId" element={<Game />} />  */}
          <Route path="/game-log/:gameID" element={<GameLog/>} /> 
          <Route path="/game-history" element={<History/>} />
          <Route path="*"element={<Navigate to="/" replace />} />

        </Routes>
      </main>
    </>
  );
}

export default App;
