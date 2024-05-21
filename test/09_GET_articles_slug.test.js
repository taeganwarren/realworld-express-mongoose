import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('GET /articles/:slug', () => {

    it('should return a single article', async () => {
        test_data.chai.request(app)
            .get(`/api/articles/${test_data.article_one_slug}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.article).to.have.property('slug');
                expect(res.body.article.title).to.equal('Understanding REST APIs');
                expect(res.body.article.description).to.equal('Learn the essentials of RESTful APIs.');
                expect(res.body.article.body).to.equal('REST APIs allow systems to communicate over the internet. This post explains how they work and how to create one.');
                expect(res.body.article.tag_list).to.eql(['APIs', 'WebDevelopment', 'REST']);
                expect(res.body.article).to.have.property('created_at');
                expect(res.body.article).to.have.property('updated_at');
                expect(res.body.article.favorited).to.equal(false);
                expect(res.body.article.favorites_count).to.equal(0);
                expect(res.body.article).to.have.property('author');
                expect(res.body.article.author.username).to.equal('testuserone');
                expect(res.body.article.author.bio).to.equal('');
                expect(res.body.article.author.image).to.equal('');
                expect(res.body.article.author.following).to.equal(false);
            });
    });

    it('should return 404 for non-existent article', async () => {
        test_data.chai.request(app)
            .get(`/api/articles/nonexistent`)
            .end((err, res) => {
                expect(res).to.have.status(404);
            });
    });
});