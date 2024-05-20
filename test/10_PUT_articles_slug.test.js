import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('PUT /api/articles/:slug', function() {
    
    it('should update an article', function(done) {
        test_data.chai.request(app)
            .put(`/api/articles/${test_data.article_one_slug}`)
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                article: {
                    title: 'Updated Test Article',
                    description: 'Updated Test Description',
                    body: 'My updated first test article!',
                    tag_list: ['test', 'testtwo', 'testthreeupdate']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.article).to.have.property('slug');
                expect(res.body.article.title).to.equal('Updated Test Article');
                expect(res.body.article.description).to.equal('Updated Test Description');
                expect(res.body.article.body).to.equal('My updated first test article!');
                expect(res.body.article.tag_list).to.eql(['test', 'testtwo', 'testthreeupdate']);
                expect(res.body.article).to.have.property('created_at');
                expect(res.body.article).to.have.property('updated_at');
                expect(res.body.article.favorited).to.equal(false);
                expect(res.body.article.favorites_count).to.equal(0);
                expect(res.body.article).to.have.property('author');
                expect(res.body.article.author.username).to.equal('testuserone');
                expect(res.body.article.author.bio).to.equal('');
                expect(res.body.article.author.image).to.equal('');
                expect(res.body.article.author.following).to.equal(false);
                done();
            });
    });
});