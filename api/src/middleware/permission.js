const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

/**
 * Role-based access control middleware
 * @param {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {Function} Express middleware function
 */
const checkPermission = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Check if authorization header exists
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false, 
          message: 'No token provided or invalid token format' 
        });
      }

      // Extract token
      const token = authHeader.split(' ')[1];
      
      try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Check if user has role
        if (!decoded.role) {
          return res.status(403).json({ 
            success: false, 
            message: 'User role not found in token' 
          });
        }

        // Check if user's role is in the allowed roles
        if (!allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ 
            success: false, 
            message: 'You do not have permission to perform this action' 
          });
        }

        // Attach user data to request object
        req.user = {
          id: decoded.id,
          role: decoded.role,
          email: decoded.email
        };

        next();
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            success: false, 
            message: 'Token expired' 
          });
        }
        throw error;
      }
    } catch (error) {
    //   console.error('Permission middleware error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error during authorization' 
      });
    }
  };
};

module.exports = checkPermission;