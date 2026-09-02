const express = require('express');
const subscriptions = express.Router();
const { getAllSubscriptions, getASubscription, createSubscription, updateSubscription, deleteSubscription } = require('../queries/subscriptions');
const { authenticate } = require('../middleware/authenticate');

subscriptions.use(authenticate);

subscriptions.get('/', async (req, res) => {
  try {
    const data = await getAllSubscriptions();
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching subscriptions' });
  }
});

subscriptions.get('/subscribe/:email', async (req, res) => {
  try {
    const data = await getASubscription(req.params.email);
    if (!data) return res.status(404).json({ success: false, message: 'Subscription not found' });
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Subscription not found' });
  }
});

subscriptions.post('/', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ success: false, message: 'fullName and email required' });
    }
    const data = await createSubscription(req.body);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    if (error.message?.includes('unique')) {
      return res.status(409).json({ success: false, message: 'Email already subscribed' });
    }
    res.status(500).json({ success: false, message: 'Subscription failed' });
  }
});

subscriptions.put('/update/:updatedEmail', async (req, res) => {
  try {
    const data = await updateSubscription(req.body, req.params.updatedEmail);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Subscription not found' });
  }
});

subscriptions.delete('/unsubscribe/:email', async (req, res) => {
  try {
    const data = await deleteSubscription(req.params.email);
    res.status(200).json({ success: true, payload: data });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Subscription not found' });
  }
});

module.exports = subscriptions;
