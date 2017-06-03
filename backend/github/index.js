/**
 * Created by orel- on 04/Jun/17.
 */
const express = require('express');
const fetch = require('node-fetch');
const { map, filter } = require('lodash');
const { catchAsync } = require('../utils');

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
const listCogs = async(username, repo) => {
  const response = await fetch(`${API_ROOT}/repos/${username}/${repo}/contents`);
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

exports.router = router;