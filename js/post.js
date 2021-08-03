class Post {
    constructor() {
        const localPosts = this.loadPostsFromLocalStorage();
        const localComments = this.loadCommentsFromLocalStorage();
        this.postsArray = localPosts || [];
        this.commentsArray = localComments || [];
    }
    addToPostsArray(id, title, body, userId) {
        this.postsArray.push({
            id,
            title,
            body,
            userId,
        });
        this.savePostsToLocalStorage();
    };
    addToCommentsArray(postId, commentId, name, email, body, id) {
        console.log(id)
        this.commentsArray[id - 1].push({
            postId,
            commentId,
            name,
            body,
            email,
        });
        this.saveCommentsToLocalStorage(id);
    };
    getPostFromPostsArray() {
        return this.postsArray;
    };
    getCommentFromCommentsArray(id) {
        return this.commentsArray[id - 1];
    };
    cleanCommentArray() {
        this.commentsArray.length = 0;
    }
    addNewComment(postId, commentId, name, body, id) {
        this.commentsArray[id - 1].push({
            postId,
            commentId,
            name,
            body,
        });
        this.saveCommentsToLocalStorage(id);
    };
    savePostsToLocalStorage() {
        localStorage.setItem('post-items', JSON.stringify(this.postsArray));
    }
    loadPostsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("post-items"));
    }
    saveCommentsToLocalStorage() {
        localStorage.setItem('comment-items', JSON.stringify(this.commentsArray));
    }
    loadCommentsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("comment-items"));
    }
};
const newPost = new Post();