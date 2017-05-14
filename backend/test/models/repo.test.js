/**
 * Created by orel- on 14/May/17.
 */
const { expect } = require('chai');
const { Repo, prepareRepo } = require('../../models/repo');
const { REPOS_PATH, COGS_PATH } = require('../../paths');

// Connect to a test db
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.mongoURL || 'localhost/testportal');

// Minimal repo structure to be used in tests
const repo = {
  name: 'ORELS-Cogs',
  author: {
    name: 'orels1',
    url: 'https://github.com/orels1',
    username: 'orels1',
  },
  short: 'Data-based cogs',
  description: 'A lot of data-based and gaming-oriented cogs, have fun!',
  links: {
    github: {
      self: 'https://github.com/orels1/ORELS-Cogs',
      _self: 'https://api.github.com/repos/orels1/ORELS-Cogs/contents/',
      _info: 'https://api.github.com/repos/orels1/ORELS-Cogs/contents/info.json?ref=master',
    },
  },
  tags: ['tools', 'gaming'],
};

const path = `${repo.author.username}/${repo.name}`;

describe('Repo Schema', async () => {
  beforeEach(async () => {
    await Repo.remove({});
  });

  it('Should prepare data for the repo', () => {
    const repoData = prepareRepo(repo);
    expect(repoData).to.have.property('path', path);
    expect(repoData.links).to.have.property('_self', REPOS_PATH + path);
    expect(repoData.links).to.have.property('self', `/repos/${path}`);
    expect(repoData.links).to.have.property('_cogs', COGS_PATH + path);
  });
  it('Should create new repo in DB', async () => {
    const repoData = prepareRepo(repo);
    const newRepo = await Repo.createRepo(repoData);
    const repoCount = await Repo.count({});
    // check that we added the repo
    expect(repoCount).to.equal(1);
    // check if the defaults were set by mongoose
    expect(newRepo).to.have.property('readme', null);
    expect(newRepo).to.have.property('type', 'unapproved');
    expect(newRepo).to.have.property('hidden', false);
  })
});