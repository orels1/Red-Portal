/**
 * Created by orel- on 19/Jun/17.
 */
const mongoose = require('mongoose');
const { createGhHook, deleteGhHook } = require('../github');
const { WEBHOOKS_PATH } = require('../paths');

const WebhookSchema = new mongoose.Schema({
  path: { type: String, index: 1 },
  repo: {
    author: String,
    name: String,
  },
  hookId: String,
  created_at: { default: Date.now(), type: Date },
  links: {
    _self: String,
  },
});

/**
 * Creates a webhook on Github and returns data to be saved into DB
 * This is done to keep all the webhook operations on Github tied to the webhooks on the website
 * No hook on the website - no hook on Github and vice-versa
 * @param {String} username Github username
 * @param {String} repo github repo
 * @returns {Object} A constructed webhook object to be saved
 */
const prepareData = async (username, repo) => {
  const hook = await createGhHook(username, repo);

  return {
    path: `${username}/${repo}`,
    repo: {
      author: username,
      name: repo,
    },
    hookId: hook.id,
    links: {
      _self: `${WEBHOOKS_PATH}${username}/${repo}`,
    },
  };
};

exports.prepareData = prepareData;

/**
 * Creates new webhook in the DB and on Github
 * @param {String} username Github username
 * @param {String} repo github repo
 * @returns {Promise} DB save promise
 */
WebhookSchema.statics.create = async (username, repo) => (
  new Webhook(await prepareData(username, repo)).save()
);

/**
 * Gets webhook by indexed path
 * @param {String} path Webhook path
 * @return {Promise|Array} DB find promise
 */
WebhookSchema.statics.getByPath = (path) => {
  return Webhook.find({ path }).exec();
};

/**
 * Deletes webhook from DB and Github
 * To keep deletion consistent - it should be done using this method only
 * @param path
 * @returns {Promise} DB deletion promise
 */
WebhookSchema.statics.deleteByPath = async (path) => {
  const hook = await Webhook.findOne({ path }).exec();
  if (!hook) {
    throw new Error('NotFound');
  }
  await deleteGhHook(hook.repo.author, hook.repo.name, hook.hookId);
  return Webhook.remove({ path });
};

const Webhook = mongoose.model('Webhook', WebhookSchema);

exports.Webhook = Webhook;
