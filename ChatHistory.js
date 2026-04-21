const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    index: true
  },
  
  session_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  session: {
    started_at: {
      type: Date,
      default: Date.now,
      index: true
    },
    ended_at: Date,
    duration_seconds: Number,
    device: String,
    platform: String
  },
  
  messages: [{
    message_id: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    
    // For user messages
    intent: String,
    entities: [{
      type: {
        type: String
      },
      value: String,
      confidence: Number
    }],
    
    // For assistant messages
    response_type: String,
    sources: [String],
    confidence: Number,
    
    // Actions taken
    actions: [{
      type: String,
      parameters: mongoose.Schema.Types.Mixed,
      result: String
    }],
    
    // User feedback on message
    feedback: {
      helpful: Boolean,
      rating: Number,
      comment: String
    }
  }],
  
  summary: {
    total_messages: {
      type: Number,
      default: 0
    },
    user_satisfaction: {
      type: Number,
      min: 1,
      max: 5
    },
    resolved: {
      type: Boolean,
      index: true
    },
    topics_discussed: [String],
    recommendations_given: {
      type: Number,
      default: 0
    },
    bookings_made: {
      type: Number,
      default: 0
    }
  },
  
  context: {
    current_trip_id: Number,
    referenced_destinations: [String],
    user_preferences_used: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes
chatHistorySchema.index({ user_id: 1, 'session.started_at': -1 });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
