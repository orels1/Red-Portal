/**
 * Auth middleware
 */
const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const hasRole = role => (hasRole[role] || (hasRole[role] = (req, res, next) => {
  const token = req.get('X-COGS-TOKEN');

  // fake stuff for now
  const roles = ['admin','member'];
  const user = {
    username: 'orels1',
    roles,
    github: {
      access_token: process.env.GITHUB_TOKEN,
      login: 'orels1'
    }
  }


  // if (!token) throw new Error('AccessDenied');
  // if (!roles.includes(role)) throw new Error('AccessDenied');

  req.user = user;
  next();
}));

exports.hasRole = hasRole;

const isRepoOwner = (req, res, next) => {
  const token = req.get('X-COGS-TOKEN');

  // fake stuff for now
  const user = {
    username: 'orels1',
    github: {
      access_token: process.env.GITHUB_TOKEN,
      login: 'orels1'
    }
  }

  // if (req.params.authorUsername !== user.github.login) throw new Error('AccessDenied');
  next();
}

exports.isRepoOwner = isRepoOwner;

exports.router = router;
