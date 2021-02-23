import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';

import './App.scss';

function App() {
  const name = '123456789012'
  return (
    <div className="app">
      <Header />
      <ScoreLine bestOf={3} score={[1, 2]} players={[name, name]}/>
      <Battlefield />
      <Footer />
    </div>
  );
}

export default App;
