import './App.css';
import Header from'./components/header';
import Home from './pages/home'

function App() {
  return (
    <>
      <Header></Header>
      <main className="main">
        <Home/>
      </main>
    </>
  );
}

export default App;
