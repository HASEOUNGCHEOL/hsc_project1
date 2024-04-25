import './App.css';
import CustomDate from './components/CustomDate';
import DataDisplay from './components/DataDisplay';
import MyWebSocketComponent from './components/MyWebSocketComponent ';
import { PurchasePrice } from './components/PurchasePrice';
import SellingPrice from './components/SellingPrice';
import WebSocketComponent from './components/WebSocketComponent';
import WebSocket from './components/WebSocketStock';

function App() {
  return (
    <div>
      <CustomDate/>
      <PurchasePrice/>
      <CustomDate/>
      <SellingPrice/>
      <WebSocketComponent/>
      <WebSocket/>
      <DataDisplay/>
      <MyWebSocketComponent/>
    </div>
  );
}

export default App;