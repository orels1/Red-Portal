/**
 * Created by orel- on 04/Jun/17.
 */
const express = require('express');
const fetch = require('node-fetch');
const atob = require('atob');
const { map, filter } = require('lodash');
const { catchAsync } = require('../utils');
const { WEBHOOKS_PATH } = require('../paths');

const router = express.Router();

const TOKEN = process.env.GITHUB_TOKEN;
const API_GRAPH_ROOT = 'https://api.github.com/graphql';
const API_ROOT = 'https://api.github.com';
const headers = {
  Authorization: `bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

/**
 * List github repos for selected user
 * @param username GitHub username
 * @param limit Amount of repos to show
 * @return {Promise} fetch response JSON promise
 */
const listRepos = async (username, limit = 100) => {
  const query = `{
    user(login: \"${username}\") {
      login
      repositories(last: ${limit}) {
        nodes {
          name
        }
      }
    } 
  }`;
  const response = await fetch(API_GRAPH_ROOT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
    })
  });
  return response.json();
};

exports.listRepos = listRepos;

router.get('/repos/:username', catchAsync(async (req, res) => {
  const results = await listRepos(req.params.username, req.query && req.query.limit ? req.query.limit : 100);
  res.send({
    status: 'OK',
    results,
  });
}));

/**
 * List all the cogs inside a repo (ignores hidden states)
 * @param username GitHub username
 * @param repo Repo to show the cogs from
 * @return {Array} List of cogs for the repo
 */
const listCogs = async (username, repo, token = TOKEN) => {
  const response = await fetch(`${API_ROOT}/repos/${username}/${repo}/contents`, { headers });
  if (response.status === 404) { throw new Error('NotFound') }
  const json = await response.json();
  const cogs = filter(json, { type: 'dir' });
  return map(cogs, cog => cog.name);
};

exports.listCogs = listCogs;

router.get('/cogs/:username/:repo', catchAsync(async (req, res) => {
  const results = await listCogs(req.params.username, req.params.repo);
  res.send({
    status: 'OK',
    results,
  });
}));

/**
 * Get repo's info.json contents
 * @param username GitHub username
 * @param repo Repo to get the cog from
 * @param tree Tree to look for
 * @return {Object} info.json contents
 */
const repoInfo = async (username, repo, tree = 'master', token = TOKEN) => {
  const url = `${API_ROOT}/repos/${username}/${repo}/contents/info.json?ref=${tree}`;
  const response = await fetch(url, { headers });
  if (response.status === 404) { throw new Error('NotFound') }
  const json = await response.json();
  let info = {};
  try {
    info = JSON.parse(atob(json.content));
  } catch (e) {
    return null;
  }
  return Object.assign(info, { GITHUB: { _self: url } });
};

exports.repoInfo = repoInfo;

router.get('/info/:username/:repo', catchAsync(async (req, res) => {
  const results = await repoInfo(req.params.username, req.params.repo);
  res.send({
    status: 'OK',
    results,
  });
}));

/**
 * Get cog's info.json contents
 * @param username GitHub username
 * @param repo Repo to get the cog from
 * @param cog Cog to get the info for
 * @param tree Tree to look for
 * @return {Object} info.json contents
 */
const cogInfo = async (username, repo, cog, tree = 'master', token = TOKEN) => {
  const response = await fetch(`${API_ROOT}/repos/${username}/${repo}/contents/${cog}/info.json?ref=${tree}`, { headers });
  if (response.status === 404) { throw new Error('NotFound') }
  const json = await response.json();
  let info = {};
  try {
    info = JSON.parse(atob(json.content));
  } catch (e) {
    return null;
  }
  return info;
};

exports.cogInfo = cogInfo;

router.get('/info/:username/:repo/:cog', catchAsync(async (req, res) => {
  const results = await cogInfo(req.params.username, req.params.repo, req.params.cog);
  res.send({
    status: 'OK',
    results,
  });
}));

/**
 * Get repo's readme
 * @param username GitHub username
 * @param repo Repo to get the readme for
 * @param tree Tree to look for
 * @return {String} Repo's readme
 */
const repoReadme = async (username, repo, tree = 'master', token = TOKEN) => {
  const response = await fetch(`${API_ROOT}/repos/${username}/${repo}/contents/README.MD?ref=${tree}`, { headers });
  if (response.status === 404) return null;
  const json = await response.json();
  let readme = {};
  try {
    readme = atob(json.content);
  } catch (e) {
    throw new Error('ReadmeDecodeFailed');
  }
  return readme;
};

exports.repoReadme = repoReadme;

router.get('/readme/:username/:repo', catchAsync(async (req, res) => {
  const results = await repoReadme(req.params.username, req.params.repo);
  res.send({
    status: 'OK',
    results,
  });
}));

/**
 * Get cogs's readme
 * @param username GitHub username
 * @param repo Repo to get the cog from
 * @param cog Cog to get the readme for
 * @param tree Tree to look for
 * @return {String} Repo's readme
 */
const cogReadme = async (username, repo, cog, tree = 'master', token = TOKEN) => {
  const response = await fetch(`${API_ROOT}/repos/${username}/${repo}/contents/${cog}/README.MD?ref=${tree}`, { headers });
  if (response.status === 404) return null
  const json = await response.json();
  let readme = {};
  try {
    readme = atob(json.content);
  } catch (e) {
    throw new Error('ReadmeDecodeFailed');
  }
  return readme;
};

exports.cogReadme = cogReadme;

router.get('/readme/:username/:repo/:cog', catchAsync(async (req, res) => {
  const results = await cogReadme(req.params.username, req.params.repo, req.params.cog);
  res.send({
    status: 'OK',
    results,
  });
}));

const createGhHook = async (username, repo) => {
  const response = await fetch(`${API_ROOT}/repos/${username}/${repo}/hooks`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: 'web',
      active: true,
      events: ['push'],
      config: {
        url: `https://cogs.red${WEBHOOKS_PATH}${username}/${repo}`,
        content_type: 'json',
      },
    }),
  });
  if (response.status === 404) { throw new Error('NotFound') }
  const json = await response.json();
  if (response.status === 422) {
    if (json.errors[0].code === 'invalid' && json.errors[0].field === 'name') { throw new Error('HookNameInvalid') }
    if (json.errors[0].code === 'custom') { throw new Error('HookExists') }
  }
  return json;
};

exports.createGhHook = createGhHook;

router.post('/hook/:username/:repo', catchAsync(async (req, res) => {
  const results = await createGhHook(req.params.username, req.params.repo);
  res.send({
    status: 'OK',
    results,
  });
}));

const deleteGhHook = async (username, repo, hookId) => {
  const response = await fetch(`${API_ROOT}/repos/${username}/${repo}/hooks/${hookId}`, {
    method: 'DELETE',
    headers,
  });
  if (response.status === 404) { throw new Error('NotFound') }
  return true;
};

exports.deleteHook = deleteGhHook;

router.delete('/hook/:username/:repo/:hookId', catchAsync(async (req, res) => {
  const results = await deleteGhHook(req.params.username, req.params.repo, req.params.hookId);
  res.send({
    status: 'OK',
    results,
  });
}));

exports.router = router;