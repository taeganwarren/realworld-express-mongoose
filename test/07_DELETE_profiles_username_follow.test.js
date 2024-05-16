import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('DELETE /api/profiles/:username/follow', function() {
    
    it('should unfollow user two', function(done) {
        test_data.chai.request(app)
            .delete('/api/profiles/test2updated/follow')
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

    it('should not unfollow user two again', function(done) {
        test_data.chai.request(app)
            .delete('/api/profiles/test2updated/follow')
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

    it('should check if user one is not following user two', function(done) {
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
});