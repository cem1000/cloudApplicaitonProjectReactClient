import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterAvailable, setFilterAvailable] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllProducts(filterAvailable);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterAvailable]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError('Failed to delete product. Please try again later.');
        console.error(err);
      }
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterAvailable(value === 'all' ? null : value === 'true');
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Product List</h2>
      
      <div className="filter-container">
        <label>
          Filter by availability:
          <select onChange={handleFilterChange} defaultValue="all">
            <option value="all">All Products</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </label>
      </div>
      
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>
                <span 
                  className={`status-indicator ${product.available ? 'status-available' : 'status-unavailable'}`}
                ></span>
                {product.available ? 'Available' : 'Not Available'}
              </p>
              <p>${product.price}</p>
              <div className="product-card-actions">
                <Link to={`/products/${product.id}`}>
                  <button>View Details</button>
                </Link>
                <Link to={`/products/${product.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button 
                  className="secondary" 
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 