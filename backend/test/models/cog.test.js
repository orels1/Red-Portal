/**
 * Created by orel- on 27/May/17.
 */
const { expect } = require('chai');
const { Cog, prepareCog } = require('../../models/cog');
const { COGS_PATH } = require('../../paths');

// Connect to a test db
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.mongoURL || 'localhost/testportal');

// Minimal repo structure to be used in tests
const repo = {
  _id: '58f93c645e9279000f45b83a',
  name: 'ORELS-Cogs',
  author: {
    name: 'orels1',
    url: 'https://github.com/orels1',
    username: 'orels1',
  },
  short: 'Data-based cogs',
  description: 'A lot of data-based and gaming-oriented cogs, have fun!',
  type: 'unapproved',
  links: {
    _self: '/api/v2/repos/orels1/ORELS-Cogs',
    self: '/repos/orels1/ORELS-Cogs',
    github: {
      self: 'https://github.com/orels1/ORELS-Cogs',
    },
  },
};

// Minimal cog structure to be used in tests
const cog = {
  name: 'redportal',
  short: 'Cog for interaction with Cogs.Red',
  description: 'Cog for interaction with Cogs.Red\\n\\nCommands:\\n[p]redportal search <search_term> - searches through cogs listed on cogs.red (alias - redp)',
  links: {
    github: {
      _self: 'https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/',
      _info: 'https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master',
    },
  },
  tags: ['tools', 'search'],
};

const path = `${repo.author.username}/${repo.name}/${cog.name}`;

describe('Cog Schema', async () => {
  describe('Cog preparation and creation', async () => {
    beforeEach(async () => {
      await Cog.remove({});
    });

    it('Should prepare data for the cog', () => {
      const cogData = prepareCog(repo, cog);
      expect(cogData).to.have.property('path', path);
      expect(cogData).to.have.property('repo');
      expect(cogData.repo).to.deep.equal({
        name: repo.name,
        id: repo._id,
        type: repo.type,
      });
      expect(cogData).to.have.property('hidden', false);
      expect(cogData).to.have.property('author', repo.author);
      expect(cogData.links).to.have.property('_self', COGS_PATH + path);
      expect(cogData.links).to.have.property('self', `/cogs/${path}`);
      expect(cogData.links).to.have.property('_repo',  repo.links._self);
      expect(cogData.links).to.have.property('repo',  repo.links.self);
      expect(cogData.links.github).to.have.property('self',
        `${repo.links.github.self}/blob/master/${cog.name}/`);
    });
    it('Should create new cog in DB', async () => {
      const newCog = await Cog.create(repo, cog);
      const cogCount = await Cog.count({});
      // check that we added the cog
      expect(cogCount).to.equal(1);
      // check if the defaults were set by mongoose
      expect(newCog).to.have.property('readme', null);
      expect(newCog).to.have.property('hidden', false);
    });
  });

  describe('Path-specific cog', async () => {
    beforeEach(async () => {
      await Cog.remove({});
    });

    it('Should get cog by path', async () => {
      await Cog.create(repo, cog);
      const results = await Cog.getByPath(path);
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('path', path);
    });
    // Checking hidden flag
    it('Should not get any cogs', async () => {
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      const results = await Cog.getByPath(path);
      expect(results).to.have.lengthOf(0);
    });
    it('Should get hidden cog', async () => {
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      const results = await Cog.getByPath(path, hidden = true);
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('path', path);
    });
  });

  describe('All cogs', async () => {
    beforeEach(async () => {
      await Cog.remove({});
    });

    it('Should get all visible cogs', async () => {
      await Cog.create(repo, cog);
      await Cog.create(repo, cog);
      const results = await Cog.getAll();
      expect(results).to.have.lengthOf(2);
    });
    // Checking hidden flag
    it('Should get all hidden cogs', async () => {
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      const results = await Cog.getAll(hidden = true);
      expect(results).to.have.lengthOf(2);
    });
    it('Should not get any cogs', async () => {
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      const results = await Cog.getAll();
      expect(results).to.have.lengthOf(0);
    });
  });

  describe('All cogs for username', async () => {
    beforeEach(async () => {
      await Cog.remove({});
    });

    it('Should get all visible cogs for repo', async () => {
      await Cog.create(repo, cog);
      await Cog.create(Object.assign({}, repo, { name: 'ORELS2-Cogs' }), cog);
      const results = await Cog.getByRepo('orels1', 'ORELS-Cogs');
      expect(results).to.have.lengthOf(1);
    });
    // Checking hidden flag
    it('Should get all hidden cogs for repo', async () => {
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      await Cog.create(Object.assign({}, repo, { name: 'ORELS2-Cogs' }),
                       Object.assign({}, cog, { hidden: true }));
      const results = await Cog.getByRepo('orels1', 'ORELS-Cogs', hidden = true);
      expect(results).to.have.lengthOf(1);
    });
    it('Should not get any cogs for username', async () => {
      await Cog.create(repo, Object.assign({}, cog, { hidden: true }));
      await Cog.create(Object.assign({}, repo, { name: 'ORELS2-Cogs' }),
                       Object.assign({}, cog, { hidden: true }));
      const results = await Cog.getByRepo('orels1', 'ORELS-Cogs');
      expect(results).to.have.lengthOf(0);
    });
  });

  describe('Cog updates', async () => {
    beforeEach(async () => {
      await Cog.remove({});
    });

    it('Should find a cog by path and update it', async () => {
      const newCog = await Cog.create(repo, cog);
      const newData = { hidden: true, author: { name: 'orels2' } };
      const updatedCog = await Cog.updateByPath(newCog.path, newData);
      expect(updatedCog).to.have.property('hidden', true);
      expect(updatedCog.author).to.have.property('name', 'orels2');
    });

    it('Should change the type to SHARED_LIBRARY and hide the cog', async () => {
      const newCog = await Cog.create(repo, cog);
      const newData = { type: 'SHARED_LIBRARY' };
      const updatedCog = await Cog.updateByPath(newCog.path, newData);
      expect(updatedCog).to.have.property('hidden', true);
      expect(updatedCog).to.have.property('type', 'SHARED_LIBRARY');
    });
  })

});