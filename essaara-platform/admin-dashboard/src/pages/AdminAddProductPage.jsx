import React, { useState } from 'react';
import { createProduct } from '../lib/api';

const AdminAddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Snan (Bath)',
    price: '',
    netWt: '',
    tagline: '',
    ingredients: '',
    howToUse: '',
    otherInfo: '',
    stock: 10
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const data = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'howToUse') {
          const steps = formData[key].split('\n').filter(step => step.trim() !== '');
          steps.forEach(step => data.append('howToUse[]', step.trim()));
        } else {
          data.append(key, formData[key]);
        }
      });

      images.forEach(image => {
        data.append('productImages', image);
      });

      const response = await createProduct(data);
      setMessage({ type: 'success', text: response.message || 'Product created successfully!' });
      
      setFormData({
        name: '', category: 'Snan (Bath)', price: '', netWt: '', 
        tagline: '', ingredients: '', howToUse: '', otherInfo: '', stock: 10
      });
      setImages([]);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-neutral-900">Add New Product</h2>
        <p className="text-neutral-500 text-sm mt-1">Fill out the details below to publish a new product to your store.</p>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-medium text-center ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Product Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 bg-[#FAF9F6]" placeholder="e.g. Handmade Ayurvedic Gold Soap" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Category *</label>
            <select required name="category" value={formData.category} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 bg-[#FAF9F6]">
              <option value="Snan (Bath)">Snan (Bath)</option>
              <option value="Elements (Home)">Elements (Home)</option>
              <option value="Scent (Aroma)">Scent (Aroma)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Price (₹) *</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 bg-[#FAF9F6]" placeholder="799" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Net Weight/Size</label>
            <input type="text" name="netWt" value={formData.netWt} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 bg-[#FAF9F6]" placeholder="e.g. 100 gm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Initial Stock *</label>
            <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 bg-[#FAF9F6]" placeholder="10" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Tagline</label>
          <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 bg-[#FAF9F6]" placeholder="Short catchy phrase under the title" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Ingredients</label>
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} rows="3" className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 bg-[#FAF9F6] resize-none" placeholder="List of ingredients..." />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">How to Use (One step per line)</label>
          <textarea name="howToUse" value={formData.howToUse} onChange={handleChange} rows="4" className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 bg-[#FAF9F6] resize-none" placeholder="Lather with water.&#10;Apply gently.&#10;Rinse well." />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Other Info</label>
          <textarea name="otherInfo" value={formData.otherInfo} onChange={handleChange} rows="2" className="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-900 bg-[#FAF9F6] resize-none" placeholder="Tip: Keep in dry place..." />
        </div>

        <div className="border border-dashed border-neutral-300 rounded-xl p-6 bg-[#FAF9F6] text-center">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">Product Images (Cloudinary)</label>
          <input type="file" multiple accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-900 hover:file:bg-amber-100 cursor-pointer" />
          <p className="text-[10px] text-neutral-400 mt-3 uppercase tracking-widest">Select up to 5 images</p>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-neutral-800 disabled:bg-neutral-400 mt-4">
          {loading ? 'Uploading & Creating...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProductPage;
