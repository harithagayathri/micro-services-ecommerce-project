import React, { useState, useEffect } from 'react';
import { orderService, userService, productService } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    productId: '',
    quantity: '',
    totalAmount: '',
    status: 'PENDING',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        orderService.getAll(),
        userService.getAll(),
        productService.getAll(),
      ]);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        ...formData,
        userId: parseInt(formData.userId),
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
        totalAmount: parseFloat(formData.totalAmount),
      };
      if (editingOrder) {
        await orderService.update(editingOrder.id, orderData);
      } else {
        await orderService.create(orderData);
      }
      setShowForm(false);
      setEditingOrder(null);
      setFormData({
        userId: '',
        productId: '',
        quantity: '',
        totalAmount: '',
        status: 'PENDING',
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save order');
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      userId: order.userId.toString(),
      productId: order.productId.toString(),
      quantity: order.quantity.toString(),
      totalAmount: order.totalAmount.toString(),
      status: order.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderService.delete(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete order');
      }
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : `Product ${productId}`;
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div>
      <div className="card">
        <h2>Orders Management</h2>
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary" onClick={() => {
          setShowForm(!showForm);
          setEditingOrder(null);
          setFormData({
            userId: '',
            productId: '',
            quantity: '',
            totalAmount: '',
            status: 'PENDING',
          });
        }}>
          {showForm ? 'Cancel' : 'Add New Order'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>User:</label>
              <select
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Product:</label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                required
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (${product.price})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Total Amount:</label>
              <input
                type="number"
                step="0.01"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingOrder ? 'Update Order' : 'Create Order'}
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <h2>Orders List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{getUserName(order.userId)}</td>
                  <td>{getProductName(order.productId)}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEdit(order)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
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

export default Orders;

