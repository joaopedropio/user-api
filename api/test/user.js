const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
    it('should show API status', (done) => {
        chai.request(api)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.status.should.be.a('string');
                res.body.status.should.be.equals('OK');
                done();
            });
    });

    it('should create a single User', (done) => {
        chai.request(api)
            .post('/users')
            .send({
                "name": "Marijuana",
                "address": "Rua Fulano de Tal, n 666",
                "phone": "+551133445566",
                "email": "nome@email.com",
                "username": "test",
                "password": "senha"
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.empty;
                done();
            })
    });

    it('should update a User', (done) => {
        chai.request(api)
            .put('/users/test')
            .send({
                username: "joao"
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.empty;
                done();
            });
    });

    it('should list a User', (done) => {
        chai.request(api)
            .get('/users/joao')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });

    it('should check User\' password valid', (done) => {
        chai.request(api)
            .get('/users/joao/checkAuthenticity')
            .query({
                password: 'senha'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.empty;
                done();
            });
    });

    it('should check User\' password invalid', (done) => {
        chai.request(api)
            .get('/users/joao/checkAuthenticity')
            .query({
                password: 'senhaErrada'
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.empty;
                done();
            });
    });

    it('should NOT change User\'s password when it\'s not valid', (done) => {
        chai.request(api)
            .put('/users/joao/changePassword')
            .send({
                oldPassword: 'senhaerrada',
                newPassword: 'algumasenhaai'
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.error.should.be.equals('The password provided is invalid');
                done();
            });
    });

    it('should change User\'s password', (done) => {
        chai.request(api)
            .put('/users/joao/changePassword')
            .send({
                oldPassword: 'senha',
                newPassword: 'novasenha'
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.empty;
                done();
            });
    });

    it('should NOT delete when User does not exist', (done => {
        chai.request(api)
            .del('/users/test')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.error.should.be.equals('User does not exist')
                done();
            })
    }));

    it('should  delete when User exist', (done => {
        chai.request(api)
            .del('/users/joao')
            .end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.empty;
                done();
            })
    }));
});