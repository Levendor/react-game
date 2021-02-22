import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <ScoreLine bestOf={3} score={[1, 2]} players={['player 1', 'AI-1']}/>
      <Footer />
    </div>
  );
}

export default App;
