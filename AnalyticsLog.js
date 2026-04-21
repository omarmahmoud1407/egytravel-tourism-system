const mongoose = require('mongoose');

const analyticsLogSchema = new mongoose.Schema({
  event_type: {
    type: String,
    required: true,
    enum: ['recommendation', 'search', 'booking', 'chat', 'error'],
    index: true
  },
  
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  user_id: {
    type: Number,
    default: null,
    index: true
  },
  
  session_id: {
    type: String,
    index: true
  },
  
  data: {
    // For recommendations
    recommendation_id: String,
    items_shown: Number,
    items_clicked: Number,
    conversion: Boolean,
    
    // For searches
    query: String,
    filters: mongoose.Schema.Types.Mixed,
    results_count: Number,
    response_time_ms: Number,
    
    // For AI operations
    model_used: String,
    input_tokens: Number,
    output_tokens: Number,
    processing_time_ms: Number,
    cost: Number,
    
    // For errors
    error_type: String,
    error_message: String,
    stack_trace: String,
    
    // General
    metadata: mongoose.Schema.Types.Mixed
  },
  
  performance: {
    response_time_ms: Number,
    memory_used_mb: Number,
    cpu_usage_percent: Number
  },
  
  geo: {
    country: String,
    city: String,
    ip_address: String
  },
  
  device: {
    type: {
      type: String,
      enum: ['mobile', 'tablet', 'desktop']
    },
    os: String,
    browser: String
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

// Compound index for efficient queries
analyticsLogSchema.index({ event_type: 1, timestamp: -1 });

// TTL index - automatically delete logs after 90 days
analyticsLogSchema.index({ created_at: 1 }, { expireAfterSeconds: 7776000 });

module.exports = mongoose.model('AnalyticsLog', analyticsLogSchema);
