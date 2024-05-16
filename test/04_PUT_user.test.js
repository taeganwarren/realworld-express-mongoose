import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('PUT /api/user', function() {
    
    it('should update user one', function(done) {
        test_data.chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                email: 'test1updated@test.com',
                password: 'Pa$$w0rd1#_updated'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.email).to.equal('test1updated@test.com');
                expect(res.body.user).to.have.property('token');
                expect(res.body.user.username).to.equal('test1');
                expect(res.body.user.bio).to.equal('');
                expect(res.body.user.image).to.equal('');
                done();
            });
    });

    it('should update user two', function(done) {
        test_data.chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .send({
                email: 'test2updated@test.com',
                username: 'test2updated',
                bio: 'test2 bio',
                image: 'test2 image'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.email).to.equal('test2updated@test.com');
                expect(res.body.user).to.have.property('token');
                expect(res.body.user.username).to.equal('test2updated');
                expect(res.body.user.bio).to.equal('test2 bio');
                expect(res.body.user.image).to.equal('test2 image');
                done();
            });
    });

    it('should log in user one with updated email and password', function(done) {
        test_data.chai.request(app)
            .post('/api/users/login')
            .send({
                email: 'test1updated@test.com',
                password: 'Pa$$w0rd1#_updated'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.email).to.equal('test1updated@test.com');
                expect(res.body.user).to.have.property('token');
                expect(res.body.user.username).to.equal('test1');
                expect(res.body.user.bio).to.equal('');
                expect(res.body.user.image).to.equal('');
                test_data.user_one_token = res.body.user.token;
                done();
            });
    });

    it('should not update a user with an invalid email and password', function(done) {
        test_data.chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                email: 'test1',
                username: 'test1@#$%',
                password: 'password'
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email must be a valid email address');
                expect(res.body['validation error']).to.include('Username must be at least 4 characters long and contain only letters and numbers');
                expect(res.body['validation error']).to.include('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                done();
            });
    });

    it('should not update a user with invalid input', function(done) {
        test_data.chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                email: 1,
                username: 1,
                password: 1
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email must be a valid email address');
                expect(res.body['validation error']).to.include('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                expect(res.body['validation error']).to.include('Username must be at least 4 characters long and contain only letters and numbers');
                done();
            });
    });

    it('should not update a user without a token', function(done) {
        test_data.chai.request(app)
            .put('/api/user')
            .send({
                email: 'test1updatedupdated@test.com'
            })
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body['auth error']).to.equal('No token provided');
                done();
            });
    });

    it('should not update a user with an existing email', function(done) {
        test_data.chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                email: 'test2updated@test.com'
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Email address already in use');
                done();
            });
    });

    it('should not update a user with an existing username', function(done) {
        test_data.chai.request(app)
            .put('/api/user')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                username: 'test2updated'
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Username already in use');
                done();
            });
    });
});