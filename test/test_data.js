import {
    use 
} from 'chai';
import chaiHttp from 'chai-http';

const chai = use(chaiHttp);

export default {
    chai: chai,
    user_one_token: '',
    user_two_token: '',
    article_one_slug: '',
    article_two_slug: ''
};