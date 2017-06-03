/**
 * Created by orel- on 04/Jun/17.
 */
const { expect } = require('chai');
const { listRepos, listCogs, cogInfo, repoInfo } = require('../github');

describe('Github module', async() => {
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

  it('Should list all the cogs for the repo', async () => {
    const cogs = await listCogs('orels1', 'ORELS-Cogs');
    expect(cogs).to.not.have.lengthOf(0);
  });

  it('Should get info.json contents for a repo', async() => {
    const info = await repoInfo('orels1', 'ORELS-Cogs');
    expect(info).to.have.property('AUTHOR', 'orels');
    expect(info).to.have.property('NAME', 'ORELS-Cogs');
  });

  it('Should fail to find info for a repo', async() => {
    try {
      await repoInfo('orels1', 'NoSuchRepoHere');
    } catch (e) {
      expect(e).to.have.property('message', 'NotFound');
    }
  });

  it('Should get info.json contents for a cog', async() => {
    const info = await cogInfo('orels1', 'ORELS-Cogs', 'apitools');
    expect(info).to.have.property('AUTHOR', 'orels1');
    expect(info).to.have.property('NAME', 'Apitools');
  });

  it('Should fail to find info for a cog', async() => {
    try {
      await cogInfo('orels1', 'ORELS-Cogs', 'NoSuchCogThere');
    } catch (e) {
      expect(e).to.have.property('message', 'NotFound');
    }
  });
});

