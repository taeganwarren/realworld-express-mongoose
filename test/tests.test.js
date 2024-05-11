import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server.js';
import User from '../api/models/User.js';

const chai = use(chaiHttp);

let user_one_token = '';
let user_two_token = '';

describe('Tests', function() {
    before(async function() {
        await User.deleteMany();
    });
    it('should create user one', function(done) {
        chai.request(app)
            .post('/api/users')
            .send({
                email: 'test@test.com',
                username: 'test_user',
                password: 'password'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('email').equal('test@test.com');
                expect(res.body).to.have.property('username').equal('test_user');
                done();
            });
    });
    it('should create user two', function(done) {
        chai.request(app)
            .post('/api/users')
            .send({
                email: 'test2@test.com',
                username: 'test_user2',
                password: 'password2'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('email').equal('test2@test.com');
                expect(res.body).to.have.property('username').equal('test_user2');
                done();
            });
    });
    it('should login to user one', function(done) {
        chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('email').equal('test@test.com');
                expect(res.body).to.have.property('username').equal('test_user');
                expect(res.body).to.have.property('token');
                user_one_token = res.body.token;
                done();
            });
    });
    it('should login to user two', function(done) {
        chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test2@test.com',
                password: 'password2'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('email').equal('test2@test.com');
                expect(res.body).to.have.property('username').equal('test_user2');
                expect(res.body).to.have.property('token');
                user_two_token = res.body.token;
                done();
            });
    });
    it('should get user one', function(done) {
        chai.request(app)
            .get('/api/user')
            .set('Authorization', `Token ${user_one_token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('email').equal('test@test.com');
                expect(res.body).to.have.property('username').equal('test_user');
                expect(res.body).to.have.property('token').equal(user_one_token);
                done();
            });
    });
    it('should get user two', function(done) {
        chai.request(app)
            .get('/api/user')
            .set('Authorization', `Token ${user_two_token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('email').equal('test2@test.com');
                expect(res.body).to.have.property('username').equal('test_user2');
                expect(res.body).to.have.property('token').equal(user_two_token);
                done();
            });
    });
    it('should update user ones email and username', function(done) {
        chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${user_one_token}`)
            .send({
                email: 'testupdated@test.com',
                username: 'test_user_updated'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('email').equal('testupdated@test.com');
                expect(res.body).to.have.property('username').equal('test_user_updated');
                done();
            });
    });
    it('should update user twos password', function(done) {
        chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${user_two_token}`)
            .send({
                password: 'password2updated'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should log in with updated user two', function(done) {
        chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test2@test.com',
                password: 'password2updated'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('email').equal('test2@test.com');
                expect(res.body).to.have.property('username').equal('test_user2');
                expect(res.body).to.have.property('token');
                done();
            });
    });
});