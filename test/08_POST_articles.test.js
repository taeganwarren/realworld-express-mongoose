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
                    title: 'Understanding REST APIs',
                    description: 'Learn the essentials of RESTful APIs.',
                    body: 'REST APIs allow systems to communicate over the internet. This post explains how they work and how to create one.',
                    tag_list: ['APIs', 'WebDevelopment', 'REST']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
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
                    title: 'Introduction to Version Control with Git',
                    description: 'Learn how to use Git for version control.',
                    body: 'Git is a critical tool for developers. This post explains the basics of version control and how to use Git effectively.',
                    tag_list: ['Git', 'VersionControl', 'Programming']
                }
            
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body.article).to.have.property('slug');
                expect(res.body.article.title).to.equal('Introduction to Version Control with Git');
                expect(res.body.article.description).to.equal('Learn how to use Git for version control.');
                expect(res.body.article.body).to.equal('Git is a critical tool for developers. This post explains the basics of version control and how to use Git effectively.');
                expect(res.body.article.tag_list).to.eql(['Git', 'VersionControl', 'Programming']);
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

    it('should create a third article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .send({
                article: {
                    title: 'Introduction to Python',
                    description: 'Learn the basics of Python programming.',
                    body: 'Python is a versatile and popular programming language. In this post, we will cover the basic syntax and some simple examples.',
                    tag_list: ['Python', 'Programming', 'Beginner']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body.article).to.have.property('slug');
                test_data.article_three_slug = res.body.article.slug;
                done();
            });
    });

    it('should create a forth article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .send({
                article: {
                    title: 'Getting Started with JavaScript',
                    description: 'An overview of JavaScript for beginners.',
                    body: 'JavaScript is essential for web development. This post introduces you to the basics and shows you how to get started.',
                    tag_list: ['JavaScript', 'WebDevelopment', 'Beginner']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                test_data.article_four_slug = res.body.article.slug;
                done();
            });
    });

    it('should create a fifth article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .send({
                article: {
                    title: 'Understanding Object-Oriented Programming',
                    description: 'Dive into the fundamentals of OOP.',
                    body: 'Object-Oriented Programming (OOP) is a programming paradigm centered around objects. This post will explain the key concepts and principles.',
                    tag_list: ['OOP', 'Programming', 'Concepts']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                test_data.article_five_slug = res.body.article.slug;
                done();
            });
    });

    it('should create a sixth article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .send({
                article: {
                    title: 'Exploring Data Structures in Java',
                    description: 'Learn about common data structures in Java.',
                    body: 'Data structures are vital for efficient data management. This post explores lists, stacks, queues, and more in Java.',
                    tag_list: ['Java', 'DataStructures', 'Programming']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                test_data.article_six_slug = res.body.article.slug;
                done();
            });
    });

    it('should create a seventh article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .send({
                article: {
                    title: 'Building Your First Mobile App with Flutter',
                    description: 'Step-by-step guide to creating a mobile app using Flutter.',
                    body: 'Flutter is an open-source UI software development kit. This post will guide you through building your first app.',
                    tag_list: ['Flutter', 'MobileDevelopment', 'Beginner']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                test_data.article_seven_slug = res.body.article.slug;
                done();
            });
    });

    it('should create a eight article', function(done) {
        test_data.chai.request(app)
            .post('/api/articles')
            .set('Authorization', `Token ${test_data.user_two_token}`)
            .send({
                article: {
                    title: 'Introduction to Machine Learning',
                    description: 'A beginner\'s guide to machine learning concepts.',
                    body: 'Machine learning is transforming industries. This post covers basic concepts and how to get started with ML.',
                    tag_list: ['MachineLearning', 'AI', 'Beginner']
                }
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                test_data.article_eight_slug = res.body.article.slug;
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