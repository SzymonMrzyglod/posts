class Post {
    constructor() {
        this.postsArray = [];
        this.commentsArray = [];
    }
    addToPostsArray(id, title, body, userId) {
        this.postsArray.push({
            id,
            title,
            body,
            userId,
        });
    };
    addToCommentsArray(postId, commentId, name, email, body, id) {
        this.commentsArray[id - 1].push({
            postId,
            commentId,
            name,
            body,
            email,
        });
        
    };
    getPostFromPostsArray() {
        return this.postsArray;
    };
    getCommentFromCommentsArray(id) {
        return this.commentsArray[id-1];
    };
    cleanCommentArray() {
        this.commentsArray.length = 0;
    }
    addNewPost() {

    };
    editPost() {

    };
    removePost() {

    };
};
const newPost = new Post();