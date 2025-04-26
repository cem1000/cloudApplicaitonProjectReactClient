import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.deleteProduct(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete product. Please try again later.');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <div className="product-info">
        <p>
          <strong>Status: </strong>
          <span 
            className={`status-indicator ${product.available ? 'status-available' : 'status-unavailable'}`}
          ></span>
          {product.available ? 'Available' : 'Not Available'}
        </p>
        <p><strong>Price: </strong>${product.price}</p>
        <p><strong>Description: </strong></p>
        <p>{product.description}</p>
      </div>
      
      <div className="action-buttons">
        <Link to="/">
          <button>Back to List</button>
        </Link>
        <Link to={`/products/${product.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button className="secondary" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProductDetails; 