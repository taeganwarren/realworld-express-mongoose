import {
    expect 
} from 'chai';
import app from '../api/server.js';
import test_data from './test_data.js';

describe('POST /api/articles', function() {

    it('should create an article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                article: {
                    title: 'Test Article',
                    description: 'Test Description',
                    body: 'My first test article!',
                    tag_list: ['test', 'testone']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body.article).to.have.property('slug');
                expect(res.body.article.title).to.equal('Test Article');
                expect(res.body.article.description).to.equal('Test Description');
                expect(res.body.article.body).to.equal('My first test article!');
                expect(res.body.article.tag_list).to.eql(['test', 'testone']);
                expect(res.body.article).to.have.property('created_at');
                expect(res.body.article).to.have.property('updated_at');
                expect(res.body.article.favorited).to.equal(false);
                expect(res.body.article.favorites_count).to.equal(0);
                expect(res.body.article).to.have.property('author');
                expect(res.body.article.author.username).to.equal('testuserone');
                expect(res.body.article.author.bio).to.equal('');
                expect(res.body.article.author.image).to.equal('');
                expect(res.body.article.author.following).to.equal(false);
                test_data.article_one_slug = res.body.article.slug;
                done();
            });
    });

    it('should create a second article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                article: {
                    title: 'Test Article',
                    description: 'Test Description',
                    body: 'My second test article!',
                    tag_list: ['test', 'testtwo']
                }
            
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body.article).to.have.property('slug');
                expect(res.body.article.title).to.equal('Test Article');
                expect(res.body.article.description).to.equal('Test Description');
                expect(res.body.article.body).to.equal('My second test article!');
                expect(res.body.article.tag_list).to.eql(['test', 'testtwo']);
                expect(res.body.article).to.have.property('created_at');
                expect(res.body.article).to.have.property('updated_at');
                expect(res.body.article.favorited).to.equal(false);
                expect(res.body.article.favorites_count).to.equal(0);
                expect(res.body.article).to.have.property('author');
                expect(res.body.article.author.username).to.equal('testuserone');
                expect(res.body.article.author.bio).to.equal('');
                expect(res.body.article.author.image).to.equal('');
                expect(res.body.article.author.following).to.equal(false);
                test_data.article_two_slug = res.body.article.slug;
                done();
            });
    });

    it('should not create an article without a token', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .send({
                article: {
                    title: 'Test Article',
                    description: 'Test Description',
                    body: 'My first test article!',
                    tag_list: ['test', 'testtwo']
                }
            
            })
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body['auth error']).to.equal('No token provided');
                done();
            });
    });

    it('should not create an article without a title', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                article: {
                    description: 'Test Description',
                    body: 'Test Body',
                    tag_list: ['test', 'testtwo']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Title is required');
                done();
            });
    });

    it('should not create an article with a title that is too long', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_one_token}`)
            .send({
                article: {
                    title: 'a'.repeat(101),
                    description: 'Test Description',
                    body: 'Test Body',
                    tag_list: ['test', 'testtwo']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(422);
                expect(res.body['validation error']).to.include('Title must be between 1 and 100 characters long and contain only ASCII characters');
                done();
            });
    });
});