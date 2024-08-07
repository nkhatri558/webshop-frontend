import axios from 'axios';

export default axios.create({
    baseURL: 'centralloadbalancer-1924056286.eu-central-1.elb.amazonaws.com:8080/api',
});
