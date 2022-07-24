import './App.css';
import { Header } from'./components/header';
import {GameSizes} from './pages/home'

function App() {
  return (
    <>
      <Header/>
      <main className="main">
        <GameSizes/>
      </main>
    </>
  );
}

export default App;
