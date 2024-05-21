import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('DELETE /articles/:slug', function() {

    it('should delete an article', function(done) {
        test_data.chai.request(app)
            .delete(`/api/articles/${test_data.article_three_slug}`)
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.empty;
                done();
            });
    });
});