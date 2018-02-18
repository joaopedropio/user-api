const chai = require('chai');
const chaiHttp = require('chai-http');
const { domain, port } = require('../configs/app');
const url = `http://${domain}:${port}`;

chai.use(chaiHttp);

describe('Users', () => {
    it('should list all Users', (done) => {
        chai.request(url)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should delete a single User', (done => {
        chai.request(url)
            .del('/users')
            .send({
                username: 'test'
            })
            .end((err) => {
                done();
            })
    }))

    it('should create a single User', (done) => {
        chai.request(url)
            .post('/users')
            .send({
                "name": "Marijuana",
                "address": "Rua Fulano de Tal, n 666",
                "phone": "+551133445566",
                "email": "nome@email.com",
                "username": "test",
                "password": "ijwaijwaijwaijwa",
                "salt": "ijwaijwaijwaijwa",
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('__v');
                done();
            })
    });
});