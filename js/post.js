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
        console.log(postId)
        this.commentsArray[postId - 1].push({
            postId,
            commentId,
            name,
            body,
            email,
        });
        this.saveCommentsToLocalStorage(postId-1);
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
