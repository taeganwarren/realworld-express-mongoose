import {
    expect 
} from 'chai';
import app from '../api/server.js';
import User from '../api/models/User.js';
import Article from '../api/models/Article.js';
import Tag from '../api/models/Tag.js';
import test_data from './test_data.js';

describe('POST /api/users', function() {

    before(async function() {
        await User.deleteMany();
        await Article.deleteMany();
        await Tag.deleteMany();
    });
        
    it('should create user one', function(done) {
        test_data.chai.request(app)
            .post('/api/users')
            .send({
                user: {
                    email: 'testuserone@email.com',
                    username: 'testuserone',
                    password: 'Pa$$w0rd1!'
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body.user.email).to.equal('testuserone@email.com');
                expect(res.body.user.username).to.equal('testuserone');
                expect(res.body.user).to.have.property('token');
                test_data.user_one_token = res.body.user.token;
                done();
            });
    });
    
    it('should create user two', function(done) {
        test_data.chai.request(app)
            .post('/api/users')
            .send({
                user: {
                    email: 'testusertwo@email.com',
                    username: 'testusertwo',
                    password: 'Pa$$w0rd2!'
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body.user.email).to.equal('testusertwo@email.com');
                expect(res.body.user.username).to.equal('testusertwo');
                expect(res.body.user).to.have.property('token');
                test_data.user_two_token = res.body.user.token;
                done();
            });
    });
    
    it('should not create a user with the same email and username', function(done) {
        test_data.chai.request(app)
            .post('/api/users')
            .send({
                user: {
                    email: 'testuserone@email.com',
                    username: 'testuserone',
                    password: 'Pa$$w0rd1!'
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email address already in use');
                expect(res.body['validation error']).to.include('Username already in use');
                done();
            });
    });
    
    it('should not create a user with an invalid email and password', function(done) {
        test_data.chai.request(app)
            .post('/api/users')
            .send({
                user: {
                    email: 'testuserone',
                    username: 'testuserone',
                    password: 'password'
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email must be a valid email address');
                expect(res.body['validation error']).to.include('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                done();
            });
    });
    
    it('should not create a user with invalid input', function(done) {
        test_data.chai.request(app)
            .post('/api/users')
            .send({
                user: {
                    email: 1,
                    username: 1,
                    password: 1
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email must be a valid email address');
                expect(res.body['validation error']).to.include('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                expect(res.body['validation error']).to.include('Username must be at least 4 characters long and contain only letters and numbers');
                done();
            });
    });
});