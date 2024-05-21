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
                    title: 'Understanding Algorithms and Complexity',
                    description: 'Explore the basics of algorithms and their complexities.',
                    body: 'Algorithms are the heart of computer science. This post introduces key concepts and explains how to analyze algorithmic complexity.',
                    tag_list: ['Algorithms', 'Programming', 'Complexity']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.article).to.have.property('slug');
                expect(res.body.article.title).to.equal('Understanding Algorithms and Complexity');
                expect(res.body.article.description).to.equal('Explore the basics of algorithms and their complexities.');
                expect(res.body.article.body).to.equal('Algorithms are the heart of computer science. This post introduces key concepts and explains how to analyze algorithmic complexity.');
                expect(res.body.article.tag_list).to.eql(['Algorithms', 'Programming', 'Complexity']);
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