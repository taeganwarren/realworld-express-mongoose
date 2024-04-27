import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const chai = use(chaiHttp);

describe('Favorites routes', () => {
    describe('/POST /api/articles/{slug}/favorite', () => {
        it('Favorite an article', (done) => {
            done();
        });
    });
    describe('/DELETE /api/articles/{slug}/favorite', () => {
        it('Unfavorite an article', (done) => {
            done();
        });
    });
});