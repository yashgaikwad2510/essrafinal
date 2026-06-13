import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../lib/api';
import { Trash2, Edit2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(p => (p.productId || p._id) !== productId));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/images/')) return `http://localhost:5174${url}`; // Load local seed images from Storefront
    if (url.startsWith('uploads/') || url.startsWith('/uploads/')) {
      const cleanUrl = url.startsWith('/') ? url : `/${url}`;
      return `http://localhost:5000${cleanUrl}`; 
    }
    return url;
  };

  if (loading) return <div className="text-center py-12">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-[#FDFBF7]">
        <h2 className="text-xl font-serif text-neutral-900">Product Inventory</h2>
        <Link to="/products/new" className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
          Add New
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="text-xs uppercase tracking-wider bg-neutral-50 text-neutral-500 font-medium">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-neutral-500">
                  No products found. Start by adding a new product.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.productId || product._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900 flex items-center gap-4">
                    {product.productImages && product.productImages[0] ? (
                      <img src={getImageUrl(product.productImages[0])} alt={product.name} className="w-10 h-10 rounded-md object-cover bg-neutral-100 border border-neutral-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center text-xs text-neutral-400">No Img</div>
                    )}
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/products/edit/${product.productId || product._id}`)}
                        className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.productId || product._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
