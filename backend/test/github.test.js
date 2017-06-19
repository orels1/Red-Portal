/**
 * Created by orel- on 04/Jun/17.
 */
const { expect } = require('chai');
const {
  listRepos,
  listCogs,
  cogInfo,
  repoInfo,
  repoReadme,
  cogReadme,
  createHook,
  deleteHook,
} = require('../github');

let hookId = 0;

describe('Github module', async () => {
  describe('List repos', async () => {
    it('Should list last 10 repos for user', async () => {
      const repos = await listRepos('orels1', 10);
      expect(repos).to.have.property('data');
      expect(repos.data.user).to.have.property('login', 'orels1');
      expect(repos.data.user.repositories.nodes).to.have.lengthOf(10);
    });

    it('Should list 0 repos for the user', async () => {
      const repos = await listRepos('orels1', 0);
      expect(repos).to.have.property('data');
      expect(repos.data.user).to.have.property('login', 'orels1');
      expect(repos.data.user.repositories.nodes).to.have.lengthOf(0);
    });
  });

  describe('List cogs', async () => {
    it('Should list all the cogs for the repo', async () => {
      const cogs = await listCogs('orels1', 'ORELS-Cogs');
      expect(cogs).to.not.have.lengthOf(0);
    });
  });

  describe('Repo info', async () => {
    it('Should get info.json contents for a repo', async () => {
      const info = await repoInfo('orels1', 'ORELS-Cogs');
      expect(info).to.have.property('AUTHOR', 'orels');
      expect(info).to.have.property('NAME', 'ORELS-Cogs');
    });

    it('Should fail to find info for a repo', async () => {
      try {
        await repoInfo('orels1', 'NoSuchRepoHere');
      } catch (e) {
        expect(e).to.have.property('message', 'NotFound');
      }
    });
  });

  describe('Cog info', async () => {
    it('Should get info.json contents for a cog', async () => {
      const info = await cogInfo('orels1', 'ORELS-Cogs', 'apitools');
      expect(info).to.have.property('AUTHOR', 'orels1');
      expect(info).to.have.property('NAME', 'Apitools');
    });

    it('Should fail to find info for a cog', async () => {
      try {
        await cogInfo('orels1', 'ORELS-Cogs', 'NoSuchCogThere');
      } catch (e) {
        expect(e).to.have.property('message', 'NotFound');
      }
    });
  });

  describe('Repo readme', async () => {
    it('Should get readme contents for a repo', async () => {
      const readme = await repoReadme('orels1', 'ORELS-Cogs');
      expect(readme).to.not.have.lengthOf(0);
    });

    it('Should fail to find readme for a repo', async () => {
      try {
        await repoReadme('orels1', 'NoSuchRepoHere');
      } catch (e) {
        expect(e).to.have.property('message', 'NotFound');
      }
    });
  });

  describe('Cog readme', async () => {
    it('Should get readme contents for a cog', async () => {
      const readme = await cogReadme('orels1', 'ORELS-Cogs', 'apitools');
      expect(readme).to.not.have.lengthOf(0);
    });

    it('Should fail to find readme for a cog', async () => {
      try {
        await cogReadme('orels1', 'ORELS-Cogs', 'NoSuchCogThere');
      } catch (e) {
        expect(e).to.have.property('message', 'NotFound');
      }
    });
  });

  describe('Repo webhooks', async() => {
    afterEach(async () => {
      if (hookId !== 0) {
        await deleteHook('orels1', 'ORELS-Cogs', hookId);
      }
    });

    it('Should create a new webhook', async () => {
      const hook = await createHook('orels1', 'ORELS-Cogs', 'web');
      expect(hook).to.have.property('name', 'web');
      expect(hook).to.have.property('active', true);
      // save hookId for deletion
      hookId = hook.id;
    });

    it('Should fail to create a new webhook with a mailformed name', async () => {
      try {
        await createHook('orels1', 'ORELS-Cogs', 'web_mailformed', '123');
      } catch (e) {
        expect(e).to.have.property('message', 'HookNameInvalid');
      }
      // prevent from forced deletion
      hookId = 0;
    });

    it('Should fail to create an existing webhook', async () => {
      try {
        const hook = await createHook('orels1', 'ORELS-Cogs', 'web');
        // save hookId for deletion
        hookId = hook.id;
        await createHook('orels1', 'ORELS-Cogs', 'web');
      } catch (e) {
        expect(e).to.have.property('message', 'HookExists');
      }
    });

    it('Should delete webhook', async () => {
      const hook = await createHook('orels1', 'ORELS-Cogs', 'web');
      try {
        await deleteHook('orels1', 'ORELS-Cogs', hook.id);
      } catch (e) {
        throw e;
      }
      // prevent from forced deletion
      hookId = 0;
    });
  });
});

