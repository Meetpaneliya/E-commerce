import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Edit2, Trash2, DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import ProductForm from '../components/ProductForm';

function AdminDashboard() {
  const { products, loading } = useProducts();
  const { currentUser } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Mock data for dashboard stats
  const stats = {
    revenue: 15780.45,
    orders: 124,
    customers: 89,
    growth: 23.5
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-gray-600">Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusCircle size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <DollarSign size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.revenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-100 rounded-full">
                <ShoppingBag size={24} className="text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success-100 rounded-full">
                <Users size={24} className="text-success-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.customers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning-100 rounded-full">
                <TrendingUp size={24} className="text-warning-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.growth}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Stock</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-gray-200">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="capitalize">{product.category}</span>
                      </td>
                      <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-4">{product.stock}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-2 text-gray-600 hover:text-primary-600"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-error-500">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <ProductForm
          editingProduct={editingProduct}
          setShowAddModal={setShowAddModal}
          setEditingProduct={setEditingProduct}
        />
      )}
    </div>
  );
}

export default AdminDashboard;