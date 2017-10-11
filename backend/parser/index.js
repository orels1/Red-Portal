const Promise = require('bluebird');
const _ = require('lodash');
const { listCogs, repoInfo, cogInfo, repoReadme, cogReadme } = require('../github');

const TOKEN = process.env.GITHUB_TOKEN;

const parseRepo = async (username, repo, token = TOKEN, branch = 'master') => {
    const repoJson = await repoInfo(username, repo, branch, TOKEN);

    const readme = await repoReadme(username, repo, branch, TOKEN);

    let { cogs, broken } = await parseCogs(username, repo);

    const cogsReadme = await Promise.all(
        cogs.map(
            c => cogReadme(username, repo, c.name, branch, TOKEN)
        )
    );

    cogs = cogs.map((c, index) => Object.assign(c, {
        readme: cogsReadme[index]
    }));

    const repoData = formatRepoData(repoJson, repo, username, readme);

    return {
        repo: repoData,
        cogs,
        broken
    };
};

exports.parseRepo = parseRepo;

const parseCogs = async (username, repo, token = TOKEN, branch = 'master') => {

    let cogs = await listCogs(username, repo, token);
    
    const cogsInfo = await Promise.all(
        cogs.map(
            c => cogInfo(username, repo, c, branch, token)
        )
    );

    cogs = cogs.map((c, index) => ({
        name: c,
        info: cogsInfo[index],
    }));

    let broken = [];

    cogs = _.compact(_.map(cogs, c => {
        if (c.info !== null) return c;
        broken.push(c.name);
    }));

    return { cogs, broken }
}

exports.parseCogs = parseCogs;

const formatRepoData = (repoData, repoName, username, readme) => ({
    name: repoName,
    author: {
        username,
        name: repoData.AUTHOR
    },
    short: repoData.SHORT,
    description: repoData.DESCRIPTION,
    readme: readme,
    links: {
        github: repoData.GITHUB
    },
    tags: repoData.TAGS,
    hidden: repoData.HIDDEN,
});
