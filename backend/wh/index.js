const express = require('express');
const { Webhook } = require('../models/webhook'); 
const { Repo } = require('../models/repo');
const { parseRepo } = require('../parser');
const { catchAsync } = require('../utils');

const router = express.Router();

const TOKEN = process.env.GITHUB_TOKEN;

router.post('/', catchAsync(async (req, res) => {
    if (!req.body || !req.body.username || !req.body.repo) throw new Error('InsufficientData');
    const results = await Webhook.create(req.body.username, req.body.repo);
    res.send({
        status: 'OK',
        results
    });
}));

/**
 * Triggers a re-parse of the repo on the incoming webhook data
 * @param {String} username GH username to trigger parsing for
 * @param {String} repo GH repo to trigger parsing for
 */
const triggerParse = async (username, repo) => {
    const repos = await Repo.getByPath(`${username}/${repo}`);
    if (repos.length === 0) throw new Error('WebhookRepoNotFound');
    return parseRepo(username, repo);
};

/**
 * This endpoint will be only triggered by github itself
 * that is why we just send back a successfull response
 */
router.post('/:authorUsername/:repoName', catchAsync(async (req, res) => {
    res.status(201).end();
    try {
        const data = await triggerParse(req.params.authorUsername, req.params.repoName);
        await Repo.updateByPath(`${req.params.authorUsername}/${req.params.repoName}`, data.repo);
    } catch (e) {
        throw e;
    }
}));


exports.router = router;
