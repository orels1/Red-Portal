/**
 * Created by orel- on 04/Jun/17.
 */
const express = require('express');
const fetch = require('node-fetch');
const { catchAsync } = require('../utils');

const router = express.Router();

const TOKEN = process.env.GITHUB_TOKEN;
const API_ROOT = 'https://api.github.com/graphql';
const headers = {
  Authorization: `bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

/**
 * List github repos for selected user
 * @param user GitHub username
 * @param limit Amount of repos to show
 * @return {Promise} fetch response JSON promise
 */
const listRepos = async (user, limit = 100) => {
  const query = `{
    user(login: \"${user}\") {
      login
      repositories(last: ${limit}) {
        nodes {
          name
        }
      }
    } 
  }`;
  const response = await fetch(API_ROOT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
    })
  });
  return response.json();
};

exports.listRepos = listRepos;

router.get('/repos/:user', catchAsync(async (req, res) => {
  const results = await listRepos(req.params.user, req.query && req.query.limit ? req.query.limit : 100);
  res.send({
    status: 'OK',
    results,
  });
}));

exports.router = router;