/**
 * Created by orel- on 27/May/17.
 */
/**
 * Created by orel- on 14/May/17.
 */
const mongoose = require('mongoose');
const { COGS_PATH } = require('../paths');

const CogsSchema = new mongoose.Schema({
  path: { type: String, index: 1 }, // Cog's path <username>/<repo>/<cog>
  name: String, // Cog's name on github
  author: {
    name: String, // Author's name from info.json
    url: String, // Author's github url
    username: String, // Author's github username
  },
  repo: {
    name: String,
    id: String,
    type: { type: String },
  },
  short: String, // Short repo description from info.json
  description: String, // Full repo description from info.json,
  readme: { default: null, type: String }, // Escaped readme.md file contents
  links: { // All the API endpoints have _ in the name
    _self: String, // Cogs's api endpoint
    _repo: String, // Cogs's repo api endpoint
    self: String, // Cogs's website url
    repo: String, // Cogs's repo website url
    github: {
      self: String, // Cogs's github url
      _self: String, // Cogs's github api url
      _info: String, // Cogs's info.json github api url
    },
  },
  tags: { default: [], type: [String], index: true }, // List of tags from info.json
  hidden: { default: false, type: Boolean }, // Flag used to hide repo from the api (doesn't hide cogs by itself)
});

/**
 * Prepares cog data to be inserted into the DB
 * @param {Object} repo Parent repo object
 * @param {Object} cog Parsed cog object
 * @returns {Object} Prepared cog data
 */
const prepareCog = (repo, cog) => {
  const path = `${repo.author.username}/${repo.name}/${cog.name}`;
  // construct repo data
  return Object.assign(cog, {
    path,
    repo: {
      name: repo.name,
      id: repo._id,
      type: repo.type,
    },
    author: repo.author,
    links: Object.assign(cog.links, {
      _self: COGS_PATH + path,
      _repo: repo.links._self,
      self: `/cogs/${path}`,
      repo: `/repos/${repo.author.username}/${repo.name}`,
      github: Object.assign(cog.links.github, {
        self: `${repo.links.github.self}/blob/master/${cog.name}/`,
        repo: repo.links.github.self,
      }),
    }),
  });
};

exports.prepareCog = prepareCog;

/**
 * Creates a new cog in DB
 * @param {Object} repo Parent repo object
 * @param  {Object} cog Parsed cog object
 * @returns {Promise} DB save promise
 */
CogsSchema.statics.create = (repo, cog) => (
  new Cog(prepareCog(repo, cog)).save()
);

/**
 * Gets cog by indexed path
 * @param {String} path Cog path
 * @param {Boolean} hidden Search through hidden cog flag
 * @return {Promise|Array} DB find promise
 */
CogsSchema.statics.getByPath = (path, hidden = false) => (
  Cog.find({
    path,
    hidden,
  }).exec()
);

/**
 * Gets all the cogs
 * @param {Boolean} hidden Search through hidden cogs flag
 * @return {Promise|Array} DB find promise
 */
CogsSchema.statics.getAll = (hidden = false) => (
  Cog.find({
    hidden,
  }).exec()
);

/**
 * Gets all the cogs for repo
 * @param {String} repo Repo name to search for
 * @param {Boolean} hidden Search through hidden cogs flag
 * @return {Promise|Array} DB find promise
 */
CogsSchema.statics.getByRepo = (repo, hidden = false) => (
  Cog.find({
    'repo.name': repo,
    hidden,
  }).exec()
);

const Cog = mongoose.model('Cog', CogsSchema);

exports.Cog = Cog;
