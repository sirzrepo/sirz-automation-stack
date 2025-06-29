const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      enum: ["admin", "user", "content creator", "brand manager", "brand owner", "developer"],
      validate: {
        validator: async function(name) {
          // Skip validation if this is an update and name hasn't changed
          if (this.isModified('name') || this.isNew) {
            const existingRole = await this.constructor.findOne({ name: name.toLowerCase() });
            return !existingRole;
          }
          return true;
        },
        message: 'Role with this name already exists.'
      }
    },
    description: { 
      type: String,
      trim: true
    },
    // permissions: { 
    //   type: Array
    // },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Pre-save hook to ensure name is always lowercase
RoleSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.toLowerCase().trim();
  }
  next();
});


module.exports = mongoose.model('roles', RoleSchema);
