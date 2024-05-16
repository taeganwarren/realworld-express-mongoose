import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('POST /api/profiles/:username/follow', function() {

    it('should follow user two', function(done) {
        test_data.chai.request(app)
            .post('/api/profiles/test2updated/follow')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.profile.username).to.equal('test2updated');
                expect(res.body.profile.bio).to.equal('test2 bio');
                expect(res.body.profile.image).to.equal('test2 image');
                expect(res.body.profile.following).to.equal(true);
                done();
            });
    });

    it('should not follow user two again', function(done) {
        test_data.chai.request(app)
            .post('/api/profiles/test2updated/follow')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.profile.username).to.equal('test2updated');
                expect(res.body.profile.bio).to.equal('test2 bio');
                expect(res.body.profile.image).to.equal('test2 image');
                expect(res.body.profile.following).to.equal(true);
                done();
            });
    });

    it('should check if user one is following user two', function(done) {
        test_data.chai.request(app)
            .get('/api/profiles/test2updated')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.profile.username).to.equal('test2updated');
                expect(res.body.profile.bio).to.equal('test2 bio');
                expect(res.body.profile.image).to.equal('test2 image');
                expect(res.body.profile.following).to.equal(true);
                done();
            });
    });

    it('check if following is false with no auth', function(done) {
        test_data.chai.request(app)
            .get('/api/profiles/test2updated')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.profile.username).to.equal('test2updated');
                expect(res.body.profile.bio).to.equal('test2 bio');
                expect(res.body.profile.image).to.equal('test2 image');
                expect(res.body.profile.following).to.equal(false);
                done();
            });
    });

    it('should not follow a profile with invalid username', function(done) {
        test_data.chai.request(app)
            .post('/api/profiles/#$%*))(/follow')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body['error']).to.equal('not found');
                done();
            });
    });

    it('should not follow a profile with a non-existent username', function(done) {
        test_data.chai.request(app)
            .post('/api/profiles/nonexistent/follow')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body['not found error']).to.equal('User not found');
                done();
            });
    });
});