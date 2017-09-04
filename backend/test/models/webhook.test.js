/**
 * Created by orel- on 10/Jul/17.
 */
const { expect } = require('chai');
const { Webhook, prepareData } = require('../../models/webhook');
const { deleteHook } = require('../../github');
const { WEBHOOKS_PATH } = require('../../paths');

// Connect to a test db
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.mongoURL || 'localhost/testportal');

let hookId = 0;

describe('Webhook Schema', async () => {
  beforeEach(async () => {
    await Webhook.remove({});
  });


  afterEach(async () => {
    if (hookId !== 0) {
      await deleteHook('orels1', 'ORELS-Cogs', hookId);
    }
  });

  it('Should prepare data for the Webhook and create GH Webhook', async () => {
    const hook = await prepareData('orels1', 'ORELS-Cogs');
    expect(hook).to.have.property('path', 'orels1/ORELS-Cogs');
    expect(hook).to.have.property('repo');
    expect(hook.repo).to.eql({
      author: 'orels1',
      name: 'ORELS-Cogs',
    });
    expect(hook).to.have.property('hookId'); // this will contain the hookId from github
    expect(hook).to.have.property('links');
    expect(hook.links).to.eql({
      _self: `${WEBHOOKS_PATH}orels1/ORELS-Cogs`,
    });
    // save hookId for deletion
    hookId = hook.hookId;
  });

  it('Should create a new webhook on GH and in DB', async () => {
    const hook = await Webhook.create('orels1', 'ORELS-Cogs');
    // check the defaults inserted by mongoose
    expect(hook).to.have.property('_id');
    expect(hook).to.have.property('created_at');
    // save hookId for deletion
    hookId = hook.hookId;
  });
});