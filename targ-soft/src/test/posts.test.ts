import axios from "axios";
import Posts from "./posts";

jest.mock("axios");

test('it should return data of posts', ()=>{
    const posts = {id:1, title:'test title', description:"test description"};
    const response= [{id:1, title:'test title', description:"test description"}]

    // @ts-ignore
    axios.get.mockImplementation(() => Promise.resolve(response));
    Posts.getPosts().then((res)=>expect(res.data[0]).toEqual(posts));

})
