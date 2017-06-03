/**
 * Created by orel- on 04/Jun/17.
 */
const { expect } = require('chai');
const { listRepos, listCogs } = require('../github');

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
  })
});

