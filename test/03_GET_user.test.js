import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('GET /api/user', function() {
    
    it('should get user one', function(done) {
        test_data.chai.request(app)
            .get('/api/user')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.email).to.equal('testuserone@email.com');
                expect(res.body.user).to.have.property('token');
                expect(res.body.user.username).to.equal('testuserone');
                expect(res.body.user.bio).to.equal('');
                expect(res.body.user.image).to.equal('');
                done();
            });
    });

    it('should get user two', function(done) {
        test_data.chai.request(app)
            .get('/api/user')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.email).to.equal('testusertwo@email.com');
                expect(res.body.user).to.have.property('token');
                expect(res.body.user.username).to.equal('testusertwo');
                expect(res.body.user.bio).to.equal('');
                expect(res.body.user.image).to.equal('');
                done();
            });
    });

    it('should not get a user without a token', function(done) {
        test_data.chai.request(app)
            .get('/api/user')
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body['auth error']).to.equal('No token provided');
                done();
            });
    });

    it('should not get a user with an invalid token', function(done) {
        test_data.chai.request(app)
            .get('/api/user')
            .set('Authorization', 'Token invalidtoken')
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body['auth error']).to.equal('Failed to authenticate token');
                done();
            });
    });

    it('should not get a user with another invalid token', function(done) {
        test_data.chai.request(app)
            .get('/api/user')
            .set('Authorization', 'invalidtoken')
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body['auth error']).to.equal('Failed to authenticate token');
                done();
            });
    });
});