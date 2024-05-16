import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('POST /api/users/login', function() {

    it('should login user one', function(done) {
        test_data.chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test1@test.com',
                password: 'Pa$$w0rd1#'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.email).to.equal('test1@test.com');
                expect(res.body.user).to.have.property('token');
                expect(res.body.user.username).to.equal('test1');
                expect(res.body.user.bio).to.equal('');
                expect(res.body.user.image).to.equal('');
                test_data.user_one_token = res.body.user.token;
                done();
            });
    });

    it('should login user two', function(done) {
        test_data.chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test2@test.com',
                password: 'Pa$$w0rd2#'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.email).to.equal('test2@test.com');
                expect(res.body.user).to.have.property('token');
                expect(res.body.user.username).to.equal('test2');
                expect(res.body.user.bio).to.equal('');
                expect(res.body.user.image).to.equal('');
                test_data.user_two_token = res.body.user.token;
                done();
            });
    });

    it('should not login a user that doesnt exist', function(done) {
        test_data.chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test3@test.com',
                password: 'Pa$$w0rd3#'
            })
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body['auth error']).to.equal('Invalid email or password');
                done();
            });
    });

    it('should not login a user with an invalid email and password', function(done) {
        test_data.chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test1',
                password: 'password'
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email must be a valid email address');
                expect(res.body['validation error']).to.include('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                done();
            });
    });

    it('should not login a user with invalid input', function(done) {
        test_data.chai.request(app)
            .post('/api/users/login')
            .send({
                email: 1,
                password: 1
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email must be a valid email address');
                expect(res.body['validation error']).to.include('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                done();
            });
    });

    it('should not login a user without a password', function(done) {
        test_data.chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test1@test.com'
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Password is required');
                done();
            });
    });
});