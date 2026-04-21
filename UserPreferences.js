const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  
  preferences: {
    budget_range: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'EGP'
      }
    },
    travel_style: [String],
    accommodation_type: [String],
    interests: [String],
    pace: {
      type: String,
      enum: ['slow', 'moderate', 'fast']
    },
    group_size: {
      type: String,
      enum: ['solo', 'couple', 'family', 'group']
    },
    accessibility_needs: [String]
  },
  
  behavior: {
    favorite_destinations: [String],
    favorite_activities: [String],
    preferred_booking_time: {
      type: String,
      enum: ['early', 'last-minute']
    },
    average_trip_duration: Number,
    seasonal_preference: [String],
    price_sensitivity: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  },
  
  interactions: {
    searches: [{
      query: String,
      timestamp: Date,
      results_clicked: [String]
    }],
    views: [{
      item_type: String,
      item_id: String,
      duration: Number,
      timestamp: Date
    }],
    bookings_made: {
      type: Number,
      default: 0
    },
    trips_completed: {
      type: Number,
      default: 0
    }
  },
  
  ai_profile: {
    personality_type: String,
    recommendation_weights: mongoose.Schema.Types.Mixed,
    last_model_update: Date
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes
userPreferencesSchema.index({ updated_at: -1 });

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);
