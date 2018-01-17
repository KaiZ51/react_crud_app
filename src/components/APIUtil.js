import axios from 'axios';

export default class APIUtil {
    constructor() {
        this.axios = axios.create({baseURL: 'https://jsonplaceholder.typicode.com'});
    }

    getRandomItem(array) {
        const selectedItem = Math.floor(Math.random() * array.data.length);
        const item = array.data[selectedItem];
        array.data.splice(selectedItem, 1);

        return item;
    }

    // selects a random user from the API's data
    // this method needs to be separate, because the 'users' resource can only retrieve 10 items at most each time,
    // and as such not all chosen items can be unique
    getRandomUser(users) {
        const selectedPost = Math.floor(Math.random() * users.data.length);
        return users.data[selectedPost];
    }

    async loadData() {
        const posts = await this.axios.get('/posts', {
            params: {
                _limit: 30
            }
        });

        const albums = await this.axios.get('/albums', {
            params: {
                _limit: 30
            }
        });

        const users = await this.axios.get('/users');

        return this.finalizeData(posts, albums, users);
    }

    // ready a final array with 30 items, and pass it to DataList
    finalizeData(posts, albums, users) {
        const data = [];

        // push 30 items from the API's requested data to the data array
        for (let i = 0; i < 30; i++) {
            data.push({
                post: this.getRandomItem(posts),
                album: this.getRandomItem(albums),
                user: this.getRandomUser(users)
            });
        }

        return data;
    }

    async updateData(postData) {
        return await this.axios.put('/posts/' + postData.id, {title: postData.title});
    }

    async deleteData(postId, albumId, userId) {
        await this.axios.delete('/posts/' + postId);
        await this.axios.delete('/albums/' + albumId);
        await this.axios.delete('/users/' + userId);
    }
}