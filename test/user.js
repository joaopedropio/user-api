const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const { domain, port } = require('../configs/app');
const url = `http://${domain}:${port}`;

chai.use(chaiHttp);

describe('Users', () => {
    it('should list all Users', (done) => {
        chai.request(url)
            .get('/listall')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should delete a single User', (done => {
        chai.request(url)
            .del('/remove')
            .send({
                username: 'test'
            })
            .end((err, res) => {
                done();
            })
    }))

    it('should create a single User', (done) => {
        chai.request(url)
            .post('/create')
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
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('__v');
                done();
            })
    });


    // it('should add a SINGLE blob on /blobs POST', function(done) {
    //     chai.request(server)
    //       .post('/blobs')
    //       .send({'name': 'Java', 'lastName': 'Script'})
    //       .end(function(err, res){
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('SUCCESS');
    //         res.body.SUCCESS.should.be.a('object');
    //         res.body.SUCCESS.should.have.property('name');
    //         res.body.SUCCESS.should.have.property('lastName');
    //         res.body.SUCCESS.should.have.property('_id');
    //         res.body.SUCCESS.name.should.equal('Java');
    //         res.body.SUCCESS.lastName.should.equal('Script');
    //         done();
    //       });
    //   });

});