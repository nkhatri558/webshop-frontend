import axios from 'axios';

export default axios.create({
    //baseURL: 'http://localhost:8080/api'
    baseURL: 'http://centralloadbalancer-1924056286.eu-central-1.elb.amazonaws.com:8080/api',
});
