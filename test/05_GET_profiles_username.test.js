import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('GET /api/profiles/:username', function() {
    
    it('should get user one profile with auth', function(done) {
        test_data.chai.request(app)
            .get('/api/profiles/test1')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.profile.username).to.equal('test1');
                expect(res.body.profile.bio).to.equal('');
                expect(res.body.profile.image).to.equal('');
                expect(res.body.profile.following).to.equal(false);
                done();
            });
    });

    it('should get user two profile with auth', function(done) {
        test_data.chai.request(app)
            .get('/api/profiles/test2updated')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.profile.username).to.equal('test2updated');
                expect(res.body.profile.bio).to.equal('test2 bio');
                expect(res.body.profile.image).to.equal('test2 image');
                expect(res.body.profile.following).to.equal(false);
                done();
            });
    });

    it('should not get a profile with invalid username', function(done) {
        test_data.chai.request(app)
            .get('/api/profiles/@#$%')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(421);
                expect(res.body['validation error']).to.equal('Username must be at least 4 characters long and contain only letters and numbers');
                done();
            });
    });

    it('should not get a profile with a non-existent username', function(done) {
        test_data.chai.request(app)
            .get('/api/profiles/nonexistent')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body['not found error']).to.equal('User not found');
                done();
            });
    });
});