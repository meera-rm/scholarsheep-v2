import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { isDemoMode } from '../../services/demoAuthService';

function ListSubscription() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function fetchSubscriptions() {
      if (isDemoMode()) {
        setSubscriptions([]);
        return;
      }
      try {
        const response = await api.get('/api/subscriptions');
        setSubscriptions(response.data.payload || []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    }

    fetchSubscriptions();
  }, []);

  const handleDelete = async (email) => {
    if (isDemoMode()) {
      toast.info('This feature is not available in demo mode.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    try {
      await api.delete(`/api/subscriptions/unsubscribe/${email}`);
      setSubscriptions(subscriptions.filter((sub) => sub.email !== email));
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  return (
    <div>
      <h2>Email Subscriptions</h2>
      <Link to="/subscriptions/new" className="btn btn-primary mb-3">
        Add Subscription
      </Link>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.email}>
            {subscription.firstname} - {subscription.email} - Subscribed: {subscription.is_subscribed ? 'Yes' : 'No'} - Verified: {subscription.is_verified ? 'Yes' : 'No'}
            <Link to={`/subscriptions/${subscription.email}/edit`} className="btn btn-warning btn-sm ml-2">
              Edit
            </Link>
            <button
              className="btn btn-danger btn-sm ml-2"
              onClick={() => handleDelete(subscription.email)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListSubscription;
