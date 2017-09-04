/**
 * Created by orel- on 27/May/17.
 */
const express = require('express');
const { Cog } = require('../models/cog');
const { catchAsync } = require('../utils');
const { listCogs, cogInfo } = require('../github');
const { parseCogs } = require('../parser');
const { hasRole, isRepoOwner } = require('../auth');

const router = express.Router();

/**
 * Get all cogs
 */
router.get('/', catchAsync(async (req, res) => {
  const results = await Cog.getAll();
  if (results.length === 0) throw new Error('NotFound');
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

/**
 * Checks cogs to be valid
 */
router.get('/validate/:authorUsername/:repoName', hasRole('member'), isRepoOwner, catchAsync(async (req, res) => {
  const branch = req.query && req.query.branch || 'master';
  const { broken } = await parseCogs(
    req.params.authorUsername,
    req.params.repoName,
    req.user.github.access_token,
    branch
  );
  res.send({
    status: 'OK',
    results: {
      valid: broken.length === 0,
      broken
    }
  })
}))

/**
 * Get all cogs by repo
 */
router.get('/:authorUsername/:repoName', catchAsync(async (req, res) => {
  const results = await Cog.getByRepo(req.params.authorUsername, req.params.repoName);
  if (results.length === 0) throw new Error('NotFound');
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

/**
 * Get single cog by path
 */
router.get('/:authorUsername/:repoName/:cogName', catchAsync(async (req, res) => {
  const path = `${req.params.authorUsername}/${req.params.repoName}/${req.params.cogName}`;
  const results = await Cog.getByPath(path);
  if (results.length === 0) throw new Error('NotFound');
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

/**
 * Update single cog by path
 */
router.put('/:authorUsername/:repoName/:cogName', catchAsync(async (req, res) => {
  const path = `${req.params.authorUsername}/${req.params.repoName}/${req.params.cogName}`;
  const results = await Cog.updateByPath(path, req.body);
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

module.exports = router;