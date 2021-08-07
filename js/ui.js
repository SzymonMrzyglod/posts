const newPost = new Post();

const posts = document.querySelector('.posts');

const addNewCommentElement = () => {
    const btnAdd = [...document.querySelectorAll('.comment-add-btn')];

    btnAdd.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const formToSend = e.target.parentNode.parentNode;
            const id = formToSend.getAttribute('id');
            const postWithDataId = document.querySelector(`[data-id="${id}"]`);
            const commentsToClean = postWithDataId.querySelector('.comments');
            commentsToClean.innerHTML = "";
            const name = formToSend.querySelector('#name');
            const comment = formToSend.querySelector('#message');
            const option = `posts/${id}/comments`;
            // const method = formToSend.getAttribute("method");

            addCommentApi(option, id, name.value, 501, 'xyz@SpeechGrammarList.com', comment.value, commentsToClean)
            
        })
    })
}

const createCommentForm = (id, divComments) => {
    const divFormComment = document.createElement('div');
    divFormComment.classList.add('comment-form')
    divFormComment.innerHTML = `<form class="form" id="${id}"  method="post" action="*">
    <div class="form-row">
        <label for="name">Name (ID)</label>
        <input type="text" name="name" required id="name" data-error-text="Wypełnij to pole">
    </div>
    <div class="form-row">
        <label for="message">Message</label>
        <textarea name="message" required data-error-text="Musisz wypełnić pole" id="message"></textarea>
    </div>
        <div class="form-row">
            <button type="click" class="comment-add-btn" >
            Add comment
            </button>
        </div>
</form>`
    divComments.appendChild(divFormComment);
}

const addDatatToCommentElement = (divComment, divCommentTitle, divCommentBody, btnEditComment, comment, id, postId) => {

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

const createCommentElement = (id, divComments) => {

    const commentsFromCommentsArray = newPost.getCommentFromCommentsArray(id);

    commentsFromCommentsArray.forEach(comment => {
        const divComment = document.createElement('div');
        const divCommentName = document.createElement('div');
        const divCommentBody = document.createElement('div');
        const btnEditComment = document.createElement('button');

        divComment.classList.add('comment')
        divCommentName.classList.add('comment-name');
        divCommentBody.classList.add('comment-body');
        btnEditComment.classList.add('comment-btn-edit');

        addDatatToCommentElement(divComment, divCommentName, divCommentBody, btnEditComment, comment, id, comment.postId)
    })
    createCommentForm(id, divComments);
}

const showComments = (id, divComments) => {
    const commentsArrayLength = newPost.commentsArray.length;

    if (commentsArrayLength === 0) {
        getFromApi(`posts/${id}/comments`, id, divComments);
    } else {
        commentsArrayLength.length = 0;
        divComments.innerHTML = "";
        createCommentElement(id, divComments)
    }
}

const addDataToElement = (divPost, divPostTitle, divPostBody, divComments, post) => {
    divPostTitle.innerHTML = `<h2>${post.title}</h2>`;
    divPostBody.innerHTML = `<p>${post.body}</p>`;

    posts.appendChild(divPost);
    divPost.appendChild(divPostTitle);
    divPost.appendChild(divPostBody);
    divPost.appendChild(divComments);
}

const createPostElement = () => {
    const posts = newPost.getPostFromPostsArray();
    posts.forEach((post, index) => {
        const divPost = document.createElement('div');
        const divPostTitle = document.createElement('div');
        const divPostBody = document.createElement('div');
        const divComments = document.createElement('div');

        divPost.classList.add('post');
        divPostTitle.classList.add('post-title');
        divPostBody.classList.add('post-body');

        divComments.classList.add('comments');

        divPost.setAttribute('data-id', index + 1)

        addDataToElement(divPost, divPostTitle, divPostBody, divComments, post);
        showComments(post.id, divComments);
    })
    addNewCommentElement();
}

const addPost = (json, id, divComments) => {
    json.forEach((element) => {
        if (id === undefined) {
            newPost.addToPostsArray(element.id, element.title, element.body, element.userId);
        } else {
            newPost.addToCommentsArray(element.postId, element.id, element.name, element.email, element.body, id);
        }
    });

    id === undefined ? createPostElement() : createCommentElement(id, divComments);
};

if (newPost.postsArray.length === 0) {
    getFromApi('posts');
} else {
    createPostElement();
}