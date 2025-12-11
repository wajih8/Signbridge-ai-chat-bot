import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //chatId: { type: String, required: true },
  title:  { type: String, default: 'New Chat' },
  messages: [
    {
      role: { type: String, enum: ['user', 'model'], required: true },
      parts: { type: String, required: true }, // The actual text
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);