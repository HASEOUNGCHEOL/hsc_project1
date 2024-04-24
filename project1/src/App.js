import './App.css';
import CustomDate from './components/CustomDate';
import { PurchasePrice } from './components/PurchasePrice';
import SellingPrice from './components/SellingPrice';
import WebSocketComponent from './components/WebSocketComponent';

function App() {
  return (
    <div>
      <CustomDate/>
      <PurchasePrice/>
      <CustomDate/>
      <SellingPrice/>
      <WebSocketComponent/>
    </div>
  );
}

export default App;