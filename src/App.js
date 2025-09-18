import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import StockManagement from './components/StockManagement';
import Sales from './components/Sales';
import Customer from './components/Customer';
import Reporting from './components/Reporting';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Wings Cafe Inventory System</h1>
        </header>
        
        <nav className="nav">
          <Link to="/">Dashboard</Link>
          <Link to="/products">Product Management</Link>
          <Link to="/stock">Stock Management</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/reports">Reports</Link>
        </nav>
        
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/products" component={ProductManagement} />
            <Route path="/stock" component={StockManagement} />
            <Route path="/sales" component={Sales} />
            <Route path="/customers" component={Customer} />
            <Route path="/reports" component={Reporting} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
