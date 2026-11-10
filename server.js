
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://akshayjai19001900_db_user:Akshay_2001@cluster0.fcvjhuq.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected'))
  .catch(err => console.error('Mongo Error:', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple Schema for Inquiries
const InquirySchema = new mongoose.Schema({
    name: String, email: String, subject: String, message: String, createdAt: { type: Date, default: Date.now }
});
const Inquiry = mongoose.model('Inquiry', InquirySchema);

app.post('/api/inquiries', async (req, res) => {
    try {
        const item = await Inquiry.create(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`AD Labs Server running on port ${PORT}`));
