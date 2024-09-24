import React, { useState } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [editingService, setEditingService] = useState(null);
  const [error, setError] = useState('');

  const validateForm = (service) => {
    if (!service.name || !service.description || !service.price) {
      setError('All fields are required');
      return false;
    }
    setError('');
    return true;
  };

  const addService = (e) => {
    e.preventDefault();
    if (validateForm(newService)) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ name: '', description: '', price: '' });
    }
  };

  const updateService = (e) => {
    e.preventDefault();
    if (validateForm(editingService)) {
      setServices(services.map(service => service.id === editingService.id ? editingService : service));
      setEditingService(null);
    }
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Healthcare Services</h1>

      <form onSubmit={editingService ? updateService : addService} className="mb-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Service Name"
            value={editingService ? editingService.name : newService.name}
            onChange={(e) => editingService
              ? setEditingService({ ...editingService, name: e.target.value })
              : setNewService({ ...newService, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Description"
            value={editingService ? editingService.description : newService.description}
            onChange={(e) => editingService
              ? setEditingService({ ...editingService, description: e.target.value })
              : setNewService({ ...newService, description: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={editingService ? editingService.price : newService.price}
            onChange={(e) => editingService
              ? setEditingService({ ...editingService, price: e.target.value })
              : setNewService({ ...newService, price: e.target.value })}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          {editingService ? 'Update' : 'Add'} Service
        </button>
      </form>

      <ul className="list-group">
        {services.map((service) => (
          <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{service.name}</strong> - {service.description} (${service.price})
            </div>
            <div>
              <button className="btn btn-info mr-2" onClick={() => setEditingService(service)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteService(service.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;