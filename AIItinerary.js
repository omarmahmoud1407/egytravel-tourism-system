const mongoose = require('mongoose');

const aiItinerarySchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    index: true
  },
  
  trip_id: {
    type: Number,
    default: null,
    index: true
  },
  
  generation: {
    prompt: String,
    model_version: String,
    confidence_score: {
      type: Number,
      min: 0,
      max: 1
    },
    generated_at: {
      type: Date,
      default: Date.now,
      index: true
    },
    generation_time_ms: Number
  },
  
  itinerary: {
    title: String,
    destination: String,
    duration_days: Number,
    
    total_budget: {
      amount: Number,
      currency: String,
      breakdown: {
        accommodation: Number,
        food: Number,
        activities: Number,
        transportation: Number,
        other: Number
      }
    },
    
    days: [{
      day_number: Number,
      date: Date,
      title: String,
      description: String,
      
      activities: [{
        time: String,
        name: String,
        description: String,
        location: {
          name: String,
          coordinates: {
            lat: Number,
            lng: Number
          },
          address: String
        },
        duration_minutes: Number,
        estimated_cost: Number,
        category: String,
        booking_required: Boolean,
        ai_reasoning: String
      }],
      
      meals: {
        breakfast: mongoose.Schema.Types.Mixed,
        lunch: mongoose.Schema.Types.Mixed,
        dinner: mongoose.Schema.Types.Mixed
      },
      
      transportation: [{
        from: String,
        to: String,
        method: String,
        duration_minutes: Number,
        cost: Number
      }],
      
      daily_budget: Number,
      notes: String
    }],
    
    recommendations: {
      best_time_to_visit: String,
      weather_considerations: String,
      cultural_tips: [String],
      safety_tips: [String],
      packing_suggestions: [String],
      local_phrases: [mongoose.Schema.Types.Mixed]
    },
    
    alternatives: [{
      type: String,
      original: String,
      alternative: String,
      reason: String
    }]
  },
  
  user_feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    accepted: Boolean,
    modifications: [String],
    feedback_text: String,
    feedback_date: Date
  },
  
  status: {
    type: String,
    enum: ['draft', 'accepted', 'modified', 'rejected'],
    default: 'draft',
    index: true
  },
  
  saved_to_trip: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes
aiItinerarySchema.index({ user_id: 1, 'generation.generated_at': -1 });

module.exports = mongoose.model('AIItinerary', aiItinerarySchema);
