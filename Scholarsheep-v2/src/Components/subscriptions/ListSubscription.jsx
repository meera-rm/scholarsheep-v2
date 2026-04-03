import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import httpService from '../../Components/httpService';

function ListSubscription() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const response = await axios.get('/subscriptions');
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    }

    fetchSubscriptions();
  }, []);

  const handleDelete = async (email) => {
    try {
      httpService.delete(`/subscriptions/${email}`);
      setSubscriptions(subscriptions.filter((sub) => sub.email !== email));
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  return (
    <div>
      <h2>Email Subscriptions</h2>
      <Link to="/add" className="btn btn-primary mb-3">
        Add Subscription
      </Link>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.email}>
            {subscription.firstname} - {subscription.email} - Subscribed: {subscription.is_subscribed ? 'Yes' : 'No'} - Verified: {subscription.is_verified ? 'Yes' : 'No'}
            <Link to={`/edit/${subscription.email}`} className="btn btn-warning btn-sm ml-2">
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
