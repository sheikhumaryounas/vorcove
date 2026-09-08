import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const JWT_SECRET = process.env.JWT_SECRET || 'vorcove_enterprise_jwt_secret_key_2026_super_secure';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user: any = null;
    let isMatch = false;

    if (isMongoReady()) {
      user = await AdminUser.findOne({ email: cleanEmail });
      if (user) {
        isMatch = await user.comparePassword(password);
      }
    } else {
      user = memoryStore.adminUsers.find(u => u.email === cleanEmail);
      if (user) {
        if (user.passwordHash) {
          isMatch = await bcrypt.compare(password, user.passwordHash);
        } else if (user.password) {
          isMatch = password === user.password;
        }
      }
    }

    // Default fallback check if admin hasn't been seeded yet
    const defaultEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@vorcove.com').toLowerCase();
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'vorcove2026';

    if (!user && cleanEmail === defaultEmail && password === defaultPassword) {
      user = {
        _id: 'admin_root',
        id: 'admin_root',
        email: defaultEmail,
        name: 'Vorcove Managing Partner',
        role: 'superadmin'
      };
      isMatch = true;
    }

    if (!user || !isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id || user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    if (isMongoReady() && user.save) {
      user.lastLogin = new Date();
      await user.save();
    }

    return res.json({
      success: true,
      token,
      user: {
        id: user._id || user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Authentication failed'
    });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    return res.json({
      success: true,
      user: req.user
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch user profile'
    });
  }
};
