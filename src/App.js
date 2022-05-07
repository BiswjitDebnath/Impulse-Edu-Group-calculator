import './app.css'
import Upper from './component/Upper';
import Lower from './component/Lower';
import Numstate from './Context/Numstate'

function App() {
  return (
    <>
    <Numstate>
        <div className='main'>
          <div className='container'>
            <Upper />
            <Lower />
          </div>
        </div>
      </Numstate>
    </>
  );
}

export default App;
