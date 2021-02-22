import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <ScoreLine />
      <Footer />
    </div>
  );
}

export default App;
