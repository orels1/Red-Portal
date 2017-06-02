/**
 * Created by orel- on 14/May/17.
 */
const mongoose = require('mongoose');
const { REPOS_PATH, COGS_PATH } = require('../paths');

const RepoSchema = new mongoose.Schema({
  path: { type: String, index: 1 }, // Repo's path <username>/<repo>
  name: String, // Repo's name on github
  author: {
    name: String, // Author's name from info.json
    url: String, // Author's github url
    username: String, // Author's github username
  },
  short: { default: '', type: String }, // Short repo description from info.json
  description: { default: '', type: String }, // Full repo description from info.json,
  readme: { default: null, type: String }, // Escaped readme.md file contents
  type: { default: 'unapproved', type: String }, // Repo type: approved/beta/unapproved
  links: { // All the API endpoints have _ in the name
    _self: String, // Repo's api endpoint
    _cogs: String, // Repo's cogs api endpoint
    self: String, // Repo's website url
    github: {
      self: String, // Repo's github url
      _self: String, // Repo's github api url
      _info: String, // Repo's info.json github api url
    },
  },
  tags: { default: [], type: [String], index: true }, // List of tags from info.json
  hidden: { default: false, type: Boolean }, // Flag used to hide repo from the api (doesn't hide cogs by itself)
});

/**
 * Prepares repo data to be inserted into the DB
 * Minimal fields required: name, author.username, author.name, links.github._self, links.github._info
 * @param {Object} data Parsed repo object
 * @returns {Object} Prepared repo data
 */
const prepareRepo = (data) => {
  const path = `${data.author.username}/${data.name}`;
  // construct repo data
  return Object.assign(data, {
    path,
    author: Object.assign(data.author, {
      url: `https://github.com/${data.author.username}`
    }),
    links: Object.assign(data.links, {
      _self: REPOS_PATH + path,
      self: `/repos/${path}`,
      _cogs: COGS_PATH + path,
      github: Object.assign(data.links.github, {
        self: `https://github.com/${path}`,
      }),
    }),
  });
};

exports.prepareRepo = prepareRepo;

/**
 * Creates a new repo in DB
 * @param  {Object} data Parsed repo object
 * @returns {Promise} DB save promise
 */
RepoSchema.statics.create = data => (
  new Repo(prepareRepo(data)).save()
);

/**
 * Gets repo by indexed path
 * @param {String} path Repo path
 * @param {Boolean} hidden Search through hidden repos flag
 * @return {Promise|Array} DB find promise
 */
RepoSchema.statics.getByPath = (path, hidden = false) => {
  const query = hidden ? { path } : { path, hidden };
  return Repo.find(query).exec();
};

/**
 * Gets all the repos
 * @param {Boolean} hidden Search through hidden repos flag
 * @return {Promise|Array} DB find promise
 */
RepoSchema.statics.getAll = (hidden = false) => {
  const query = hidden ? {} : { hidden };
  return Repo.find(query).exec();
};

/**
 * Gets all the repos for username
 * @param {String} username GH username to search for
 * @param {Boolean} hidden Search through hidden repos flag
 * @return {Promise|Array} DB find promise
 */
RepoSchema.statics.getByName = (username, hidden = false) => {
  const query = hidden ? { 'author.username': username } : { 'author.username': username, hidden };
  return Repo.find(query).exec();
};

const Repo = mongoose.model('Repo', RepoSchema);

exports.Repo = Repo;
