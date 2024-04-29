import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const chai = use(chaiHttp);

// describe('Users routes', () => {
//     describe('/POST /api/users', () => {
//         it('Register a new user', (done) => {
//             var requester = chai.request(app).keepOpen()
//             Promise.all([
//                 requester.post('/api/users'),
//                 requester.get('/b'),
//             ])
//             .then(responses => {
//                 expect(responses[0]).to.have.status(200)
//                 expect(responses[1]).to.have.status(200)
//             })
//             .then(() => requester.close())
//         });
//     });
// });