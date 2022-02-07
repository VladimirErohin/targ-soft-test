import axios from "axios";

export default class Posts{
    post: {
        id: number;
        title: string;
        description: string;
    } | undefined
     posts: any[];
    constructor() {
        this.posts = []
    }

 static getPosts(){
        return axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>res)
}
}

module.exports = Posts;