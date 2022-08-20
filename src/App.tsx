import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import {Header, UserProvider } from'./components';
import { Home, Login, SignUp, Game, GameLog, History } from './pages'
import GameBoard from "./pages/Game";

function App() {
  return (
    <UserProvider>
      <Header></Header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/sign-up" element={<SignUp/>} /> */}
          <Route path="/game/:gameChoice" element={<GameBoard />} /> 
          <Route path="/game-log/:id" element={<GameLog/>} /> 
          <Route path="/games" element={<History/>} />
          <Route path="*"element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;
