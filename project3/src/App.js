import logo from './logo.svg';
import './App.css';
import SellingPrice from './components/SellingPrice';
import CustomDate from './components/CustomDate';
import PurchasePrice from './components/PurchasePrice'
import DataComponent from './components/DataComponent';
import StockPrice from './components/StockPrice';
import StockPrice2 from './components/StockPrice2';

function App() {
  return (
    <div>
      <SellingPrice/>
      <PurchasePrice/>
      <CustomDate/>
      <DataComponent/>
      <StockPrice/>
      <StockPrice2/>
    </div>
  );
}

export default App;
