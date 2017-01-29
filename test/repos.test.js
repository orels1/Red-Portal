/**
 * Created by antonorlov on 28/01/2017.
 */
let chai = require('chai'),
    app = require('../app'),
    chaiHttp = require('chai-http'),
    mongoose = require('mongoose'),
    chaiAsPromised = require('chai-as-promised');

// Models
let Repo = require('../models/repo');

let should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const apiUrl = '/api/v1';

describe('Repositories', () => {
    after(() => {
        return Repo.remove({})
            .then(() => {
                return null;
            })
            .catch((err) => {
                throw err;
            });
    });

    describe('GET /repos', () => {
        before(() => {
            return Repo.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('should get all the repos', () => {
            return chai.request(app)
                .get(`${apiUrl}/repos`)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.list.should.be.an('array');
                    res.body.results.list.should.have.lengthOf(0);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('GET /repo/:author/:repoName', () => {
        before(() => {
            Repo.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return 404', () => {
            return chai.request(app)
                .get(`${apiUrl}/repos/test/TEST1`)
                .then((res) => {
                    throw new Error('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(404);
                    err.response.body.error.should.equal('EntryNotFound');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should get Repo by given author and name', () => {
            let repo = new Repo({
                'name': 'ORELS-Cogs',
                'author': {
                    'username': 'orels1',
                    'url': 'https://github.com/orels1',
                },
                'links': {
                    '_self': '/api/v1/repos/orels1/ORELS-Cogs',
                    '_update': '/api/v1/repos/orels1/ORELS-Cogs/fetch',
                    '_cogs': '/api/v1/cogs/orels1/ORELS-Cogs',
                    'self': '/cogs/orels1/ORELS-Cogs',
                    'github': {
                        'self': 'https://github.com/orels1/ORELS-Cogs',
                    },
                },
            });
            return repo.save()
                .then((saved) => {
                    return chai.request(app).get(`${apiUrl}/repos/${saved.author.username}/${saved.name}`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('name');
                    res.body.results.should.have.property('author');
                    res.body.results.author.should.have.property('url');
                    res.body.results.author.should.have.property('username');
                    res.body.results.should.have.property('links');
                    res.body.results.links.should.have.property('_self');
                    res.body.results.links.should.have.property('_update');
                    res.body.results.links.should.have.property('_cogs');
                    res.body.results.links.should.have.property('self');
                    res.body.results.links.should.have.property('github');
                    res.body.results.links.github.should.have.property('self');
                    res.body.results.cogs.should.be.an('array');
                    res.body.results.cogs.should.have.lengthOf(0);
                    res.body.results.should.have.property('parsed');
                    res.body.results.parsed.should.be.false;
                    res.body.results.should.have.property('type');
                    res.body.results.should.have.property('tags');
                    res.body.results.tags.should.be.an('array');
                    res.body.results.tags.should.have.lengthOf(0);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('POST /repos', () => {
        before(() => {
            Repo.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should add new repo', () => {
            return chai.request(app)
                .post(`${apiUrl}/repos`)
                .set('Service-Token', process.env.serviceToken)
                .send({
                    'url': 'https://github.com/orels1/ORELS-Cogs',
                    'type': 'approved',
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('name');
                    res.body.results.should.have.property('author');
                    res.body.results.author.should.have.property('url');
                    res.body.results.author.should.have.property('username');
                    res.body.results.should.have.property('links');
                    res.body.results.links.should.have.property('_self');
                    res.body.results.links.should.have.property('_update');
                    res.body.results.links.should.have.property('_cogs');
                    res.body.results.links.should.have.property('self');
                    res.body.results.links.should.have.property('github');
                    res.body.results.links.github.should.have.property('self');
                    res.body.results.cogs.should.be.an('array');
                    res.body.results.cogs.should.have.lengthOf(0);
                    res.body.results.should.have.property('parsed');
                    res.body.results.parsed.should.be.false;
                    res.body.results.should.have.property('type');
                    res.body.results.should.have.property('tags');
                    res.body.results.tags.should.be.an('array');
                    res.body.results.tags.should.have.lengthOf(0);
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return link when posting duplicate', () => {
            return chai.request(app)
                .post(`${apiUrl}/repos`)
                .set('Service-Token', process.env.serviceToken)
                .send({
                    'url': 'https://github.com/orels1/ORELS-Cogs',
                    'type': 'approved',
                })
                .then((res) => {
                    throw new Error('Erorr expected');
                })
                .catch((err) => {
                    err.should.have.status(400);
                    err.response.body.error.should.equal('EntryExists');
                    err.response.body.should.have.property('error_details');
                    err.response.body.results.should.have.property('_self');
                });
        });
    });

    describe('PUT /repos/:id', () => {
        before(() => {
            Repo.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return 404', () => {
            return chai.request(app)
                .put(`${apiUrl}/repos/588bdc9c53ac184909adee5a`)
                .set('Service-Token', process.env.serviceToken)
                .then((res) => {
                    throw new Eror('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(404);
                    err.response.body.error.should.equal('EntryNotFound');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should return 500', () => {
            return chai.request(app)
                .put(`${apiUrl}/repos/588184909adee5a`)
                .set('Service-Token', process.env.serviceToken)
                .then((res) => {
                    throw new Eror('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(500);
                    err.response.body.error.should.equal('DBError');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should update Repo by given id', () => {
            let repo = new Repo({
                'name': 'ORELS-Cogs',
                'author': {
                    'username': 'orels1',
                    'url': 'https://github.com/orels1',
                },
                'links': {
                    '_self': '/api/v1/repos/orels1/ORELS-Cogs',
                    '_update': '/api/v1/repos/orels1/ORELS-Cogs/fetch',
                    '_cogs': '/api/v1/cogs/orels1/ORELS-Cogs',
                    'self': '/cogs/orels1/ORELS-Cogs',
                    'github': {
                        'self': 'https://github.com/orels1/ORELS-Cogs',
                    },
                },
            });
            return repo.save()
                .then((saved) => {
                    return chai.request(app)
                        .put(`${apiUrl}/repos/${saved._id}`)
                        .set('Service-Token', process.env.serviceToken)
                        .send({
                            'type': 'beta',
                        });
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('name');
                    res.body.results.should.have.property('author');
                    res.body.results.author.should.have.property('url');
                    res.body.results.author.should.have.property('username');
                    res.body.results.should.have.property('links');
                    res.body.results.links.should.have.property('_self');
                    res.body.results.links.should.have.property('_update');
                    res.body.results.links.should.have.property('_cogs');
                    res.body.results.links.should.have.property('self');
                    res.body.results.links.should.have.property('github');
                    res.body.results.links.github.should.have.property('self');
                    res.body.results.cogs.should.be.an('array');
                    res.body.results.cogs.should.have.lengthOf(0);
                    res.body.results.should.have.property('parsed');
                    res.body.results.parsed.should.be.false;
                    res.body.results.should.have.property('type');
                    res.body.results.type.should.equal('beta');
                    res.body.results.should.have.property('tags');
                    res.body.results.tags.should.be.an('array');
                    res.body.results.tags.should.have.lengthOf(0);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('PUT /repos/:author/:repoName/parse', () => {
        before(() => {
            Repo.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should start parsing repos', () => {
            return chai.request(app)
                .post(`${apiUrl}/repos`)
                .set('Service-Token', process.env.serviceToken)
                .send({
                    'url': 'https://github.com/orels1/ORELS-Cogs',
                    'type': 'approved',
                })
                .then((repo) => {
                    return chai.request(app)
                        .put(`${apiUrl}/repos/${repo.body.results.author.username}/${repo.body.results.name}/parse`)
                        .set('Service-Token', process.env.serviceToken);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.equal('Parsing started');
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('DELETE /repos/:id', () => {
        before(() => {
            Repo.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return 404', () => {
            return chai.request(app)
                .delete(`${apiUrl}/repos/588bdc9c53ac184909adee5a`)
                .set('Service-Token', process.env.serviceToken)
                .then((res) => {
                    throw new Eror('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(404);
                    err.response.body.error.should.equal('EntryNotFound');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should return 500', () => {
            return chai.request(app)
                .delete(`${apiUrl}/repos/588184909adee5a`)
                .set('Service-Token', process.env.serviceToken)
                .then((res) => {
                    throw new Eror('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(500);
                    err.response.body.error.should.equal('DBError');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should delete Repo by given id', () => {
            let repo = new Repo({
                'name': 'ORELS-Cogs',
                'author': {'username': 'orels1'},
            });
            return repo.save()
                .then((saved) => {
                    return chai.request(app)
                        .delete(`${apiUrl}/repos/${saved._id}`)
                        .set('Service-Token', process.env.serviceToken);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                })
                .catch((err) => {
                    throw err;
                });
        });
    });
});
