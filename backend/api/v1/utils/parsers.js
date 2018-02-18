/**
 * All the parsers (for github or else) should go here and be pure functions
 */

import rp from 'request-promise';
import {eachLimit} from 'async';
import {findWhere, where, extend} from 'underscore';
import atob from 'atob';


let config = {
    'githubToken': process.env.githubToken,
};


// Repo parsing

/**
 * Gets repo from github API
 * @param url Github url
 * @returns {Object} githubRepo Github repo object
 */
function* getGithubRepo(url) {
    url = url.replace('github.com', 'api.github.com/repos') + '/contents';
    let options = {
        'headers': {
            'User-Agent': 'Red-Portal',
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': config.githubToken,
        },
        'json': true,
        'uri': url,
    };

    let githubRepo = yield rp(options);

    return githubRepo;
}

/**
 * Gets repo info.json for further parsing
 * @param repo Github repo object
 * @returns {Object}
 * @returns {String} updateUrl info.json github update api handler
 * @returns {Object} content info.json contents
 */
function* getInfoJson(repo) {
    let infoJsonDescription = findWhere(repo, {'name': 'info.json'});

    // check if info.json is present, if it's not - skip cog
    if (!infoJsonDescription) {
        return {
            'content': null,
        };
    }

    let options = {
        'headers': {
            'User-Agent': 'Red-Portal',
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': config.githubToken,
        },
        'json': true,
        'uri': infoJsonDescription.url,
    };

    let infoJsonObject = yield rp(options);

    let infoJsonContents;

    try {
        infoJsonContents = JSON.parse(atob(infoJsonObject.content));
    } catch (e) {
        console.log(e);
        return {};
    }

    return {
        'updateUrl': infoJsonDescription.url,
        'content': infoJsonContents,
    };
}

/**
 * Gets and parses a list of cogs for the repo
 * @param githubRepo link to github repo to parse
 * @param repo mongoDb repo object
 * @returns {Array} Array of cogs
 */
function* getCogs(githubRepo, repo, currentCogs) {
    let cogsList = yield where(githubRepo, {'type': 'dir'});
    let missing = [];

    let cogs = [];

    let index = 0;
    for (let cog of cogsList) {
        let options = {
            'headers': {
                'User-Agent': 'Red-Portal',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': config.githubToken,
            },
            'json': true,
            'uri': cog.url,
        };

        let cogDir = yield rp(options);

        let infoJsonContents = yield* getInfoJson(cogDir);

        // if there is no info.json (or no cog at all) - ignore cog / add to missing list
        if (!infoJsonContents.content) {
            console.log('Could not parse info.json for', cog.name, 'cog');
            continue;
        }

        cogs[index] = {
            'name': cog.name,
            'repo': {
                'name': repo.name,
                'type': repo.type,
            },
            'author': repo.author,
            'short': infoJsonContents.content.SHORT || null,
            'description': infoJsonContents.content.DESCRIPTION || null,
            'links': {
                '_self': `/api/v1/cogs/${repo.author.username}/${repo.name}/${cog.name}`,
                '_repo': repo.links._self,
                '_update': `/api/v1/cogs/${repo.author.username}/${repo.name}/${cog.name}/parse`,
                'self': `/cogs/${repo.author.username}/${repo.name}/${cog.name}/`,
                'repo': repo.links.self,
                'github': {
                    'self': `${repo.links.github.self}/blob/master/${cog.name}/${cog.name}.py`,
                    'repo': repo.links.github.self,
                    '_update': infoJsonContents.updateUrl,
                },
            },
            'hidden': infoJsonContents.content.HIDDEN || false,
            'tags': infoJsonContents.content.TAGS || [],
        };

        index ++;
    }

    // check for missing
    if (currentCogs) {
        for (let cog of currentCogs) {
            // if cog is missing in the new array
            if (!findWhere(cogs, {'name': cog.name})) {
                missing.push(cog);
            }
        }
    }

    return {'parsed': cogs, 'missing': missing};
}

/**
 * Main repo parser function
 * @param repos List of repos from DB
 * @returns {Array} Parsed repos
 */
function* parseRepos(repos) {
    let result;

    for (let repo of repos) {
        // get repo object from github
        let githubRepo;

        try {
            githubRepo = yield* getGithubRepo(repo.links.github.self);
        } catch (e) {
            throw e;
        }

        // find, get and parse info.json for the repo
        let repoInfoJson = yield* getInfoJson(githubRepo);

        if (!repoInfoJson.content) {
            console.log('Could not parse info.json for', repo.name, 'repo');
            continue;
        }

        // save repo info
        result = {
            'author': extend(repo.author, {
                'name': repoInfoJson.content.AUTHOR,
            }),
            'short': repoInfoJson.content.SHORT || undefined,
            'description': repoInfoJson.content.DESCRIPTION || undefined,
            'links': extend(repo.links, {
                '_update': `/api/v1/repos/${repo.author.username}/${repo.name}/parse`,
                'github': extend(repo.links.github, {
                    '_update': repoInfoJson.updateUrl,
                }),
            }),
            'tags': repoInfoJson.content.TAGS || [],
            'hidden': repo.hidden || false,
        };

        result.parsed = true;

        repo = extend(repo, result);
    }

    return repos;
}

/**
 * Main repo parser function
 * @param repo Repo for cogs to parse from DB
 * @returns {Array} Parsed cogs
 */
function* parseCogs(repo, currentCogs) {
    // get repo object from github
    let githubRepo;

    try {
        githubRepo = yield* getGithubRepo(repo.links.github.self);
    } catch (e) {
        throw e;
    }

    // get all the cogs
    let cogs;

    try {
        cogs = yield* getCogs(githubRepo, repo, currentCogs);
    } catch (e) {
        throw e;
    }

    return cogs;
}

export {getGithubRepo, getInfoJson, getCogs, parseRepos, parseCogs};
