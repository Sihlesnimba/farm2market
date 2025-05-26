import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  product: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Market', marketSchema);
