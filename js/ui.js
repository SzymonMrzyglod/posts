const posts = document.querySelector('.posts');

const addCommentToElement = (divComment, divCommentTitle, divCommentBody, btnEditComment, comment, id, postId) => {

    const postsWithDataId = [...document.querySelectorAll('[data-id]')];
    const getCommentDiv = postsWithDataId[id - 1].querySelector('.comments');

    if (postId == id) {
        divCommentBody.innerHTML = `<p>${comment.body}</p>`;
        btnEditComment.innerHTML = `<p>edit</p>`;
        getCommentDiv.appendChild(divComment);
        divComment.appendChild(divCommentTitle);
        divComment.appendChild(divCommentBody);
        divComment.appendChild(btnEditComment);
    }
}

const createCommentElement = (id) => {
    const commentsFromCommentsArray = newPost.getCommentFromCommentsArray(id);
    console.log(commentsFromCommentsArray)
    commentsFromCommentsArray.forEach(comment => {
        const divComment = document.createElement('div');
        const divCommentName = document.createElement('div');
        const divCommentBody = document.createElement('div');
        const btnEditComment = document.createElement('button');

        divComment.classList.add('comment')
        divCommentName.classList.add('comment-name');
        divCommentBody.classList.add('comment-body');
        btnEditComment.classList.add('comment-btn-edit');

        addCommentToElement(divComment, divCommentName, divCommentBody, btnEditComment, comment, id, comment.postId)
    })

}

const addBtnEvent = (btnAddComments, btnShowComments, divComments) => {
    const btnDataId = btnShowComments.parentNode.getAttribute('data-id');
    const commentsArrayLength = newPost.commentsArray[Number(btnDataId - 1)].length;
    btnShowComments.addEventListener('click', () => {
        if (commentsArrayLength === 0) {
            getFromApi(`posts/${btnDataId}/comments`, btnDataId);
        } else {
            commentsArrayLength.length = 0;
            divComments.innerHTML = "";
            createCommentElement(btnDataId)
        }
    })
    btnAddComments.addEventListener('click', () => {
        addCommentApi(`posts/${btnDataId}/comments`, btnDataId);
        commentsArrayLength.length = 0;
        divComments.innerHTML = "";
        createCommentElement(btnDataId);
    })
}

const addDataToElement = (divPost, divPostTitle, divPostBody, btnShowComments, btnAddComments, divComments, post) => {
    divPostTitle.innerHTML = `<h2>${post.title}</h2>`;
    divPostBody.innerHTML = `<p>${post.body}</p>`;
    btnShowComments.innerHTML = `<p>show comments</p>`;
    btnAddComments.innerHTML = `<p>add comments</p>`;

    posts.appendChild(divPost);
    divPost.appendChild(divPostTitle);
    divPost.appendChild(divPostBody);
    divPost.appendChild(btnShowComments);
    divPost.appendChild(btnAddComments);
    divPost.appendChild(divComments);
}

const createPostElement = () => {
    const posts = newPost.getPostFromPostsArray();
    console.log(posts)
    posts.forEach((post, index) => {
        const divPost = document.createElement('div');
        const divPostTitle = document.createElement('div');
        const divPostBody = document.createElement('div');
        const btnShowComments = document.createElement('button');
        const btnAddComments = document.createElement('button');
        const divComments = document.createElement('div');

        divPost.classList.add('post');
        divPostTitle.classList.add('post-title');
        divPostBody.classList.add('post-body');
        btnShowComments.classList.add('post-btn-show-comments');
        btnAddComments.classList.add('post-btn-add-comments');
        divComments.classList.add('comments');

        divPost.setAttribute('data-id', index + 1)

        addDataToElement(divPost, divPostTitle, divPostBody, btnShowComments, btnAddComments, divComments, post);
        addBtnEvent(btnAddComments, btnShowComments, divComments)
    })
}

const addPost = (json, id) => {
    json.forEach((element) => {
        if (id === undefined) {
            newPost.addToPostsArray(element.id, element.title, element.body, element.userId);
            newPost.commentsArray.push([])
        } else {
            newPost.addToCommentsArray(element.postId, element.id, element.name, element.email, element.body, id);
        }
    });

    id === undefined ? createPostElement() : createCommentElement(id);
};

if (newPost.postsArray.length === 0) {
    getFromApi('posts');
} else {
    createPostElement();
}