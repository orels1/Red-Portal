/**
 * Created by orel- on 14/May/17.
 */
const express = require('express');
const { Repo } = require('../models/repo');
const { catchAsync } = require('../utils');
const { repoInfo } = require('../github');
const { parseRepo } = require('../parser');
const { hasRole, isRepoOwner } = require('../auth');

const router = express.Router();

/**
 * Get all repos
 */
router.get('/', catchAsync(async (req, res) => {
  const results = await Repo.getAll();
  if (results.length === 0) throw new Error('NotFound');
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

/**
 * Adds a repo
 */
router.post('/:authorUsername/:repoName', catchAsync(async (req, res) => {
  const data = await parseRepo(req.params.authorUsername, req.params.repoName);
  const savedRepo = await Repo.create(data.repo);
  res.send({
    status: 'OK',
    results: savedRepo
  });
}));

/**
 * Checks repo to be valid
 */
router.get('/validate/:authorUsername/:repoName', hasRole('member'), isRepoOwner, catchAsync(async (req, res) => {
  const branch = req.query && req.query.branch || 'master';
  const valid = await repoInfo(req.params.authorUsername, req.params.repoName, branch);
  res.send({
    status: 'OK',
    results: {
      valid: valid !== null 
    }
  });
}));

/**
 * Get all repos by author
 */
router.get('/:authorUsername/', catchAsync(async (req, res) => {
  const results = await Repo.getByName(req.params.authorUsername);
  if (results.length === 0) throw new Error('NotFound');
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

/**
 * Get single repo by path
 */
router.get('/:authorUsername/:repoName', catchAsync(async (req, res) => {
  const results = await Repo.getByPath(`${req.params.authorUsername}/${req.params.repoName}`);
  if (results.length === 0) throw new Error('NotFound');
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

/**
 * Update single repo by path
 */
router.put('/:authorUsername/:repoName', hasRole('admin'), catchAsync(async (req, res) => {
  const path = `${req.params.authorUsername}/${req.params.repoName}`;
  const results = await Repo.updateByPath(path, req.body);
  return res.status(200).send({
    status: 'OK',
    results,
  });
}));

module.exports = router;
