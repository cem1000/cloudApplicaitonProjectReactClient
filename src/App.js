import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Product Management System</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Products</Link>
              </li>
              <li>
                <Link to="/products/new">Add New Product</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="App-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>Product Management System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
