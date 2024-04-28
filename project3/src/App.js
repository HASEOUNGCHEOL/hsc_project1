import logo from './logo.svg';
import './App.css';
import SellingPrice from './components/SellingPrice';
import CustomDate from './components/CustomDate';
import PurchasePrice from './components/PurchasePrice'
import DataComponent from './components/DataComponent';

function App() {
  return (
    <div>
      <SellingPrice/>
      <PurchasePrice/>
      <CustomDate/>
      <DataComponent/>
    </div>
  );
}

export default App;
