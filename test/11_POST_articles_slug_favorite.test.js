import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('POST /articles/:slug/favorite', () => {

    it('should favorite an article', (done) => {
        test_data.chai.request(app)
            .post(`/api/articles/${test_data.article_five_slug}/favorite`)
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.article).to.have.property('slug');
                expect(res.body.article).to.have.property('created_at');
                expect(res.body.article).to.have.property('updated_at');
                expect(res.body.article.favorited).to.equal(true);
                expect(res.body.article.favorites_count).to.equal(1);
                expect(res.body.article).to.have.property('author');
                expect(res.body.article.author.username).to.equal('test2updated');
                expect(res.body.article.author.bio).to.equal('test2 bio');
                expect(res.body.article.author.image).to.equal('test2 image');
                expect(res.body.article.author.following).to.equal(false);
                done();
            });
    });
});