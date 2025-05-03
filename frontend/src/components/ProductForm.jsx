import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext'; // only if using context for API

function ProductForm({ editingProduct, setShowAddModal, setEditingProduct }) {
  const { createProduct, updateProduct } = useProducts(); // optional if using context

  const initialForm = {
    name: '',
    description: '',
    price: '',
    unit: '',
    category: '',
    stock: '',
    image: '',
    featured: false,
    nutrition: {
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: ''
    }
  };

  const [formData, setFormData] = useState(initialForm);

  // Populate form when editing
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('nutrition.')) {
      const nutritionKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          [nutritionKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData); // assuming _id is used
      } else {
        await createProduct(formData);
      }

      setShowAddModal(false);
      setEditingProduct(null);
      setFormData(initialForm);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="fruits">Fruits & Vegetables</option>
                  <option value="dairy">Dairy & Eggs</option>
                  <option value="bakery">Bakery</option>
                  <option value="meat">Meat & Seafood</option>
                  <option value="pantry">Pantry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="input-field"
                required
              ></textarea>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Calories</label>
                  <input
                    type="text"
                    name="nutrition.calories"
                    value={formData.nutrition.calories}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Protein</label>
                  <input
                    type="text"
                    name="nutrition.protein"
                    value={formData.nutrition.protein}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Carbs</label>
                  <input
                    type="text"
                    name="nutrition.carbs"
                    value={formData.nutrition.carbs}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Fat</label>
                  <input
                    type="text"
                    name="nutrition.fat"
                    value={formData.nutrition.fat}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Fiber</label>
                  <input
                    type="text"
                    name="nutrition.fiber"
                    value={formData.nutrition.fiber}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Featured Product
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm; 