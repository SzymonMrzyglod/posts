const newPost = new Post();

const posts = document.querySelector('.posts');

const addNewCommentElement = () => {
    const btnAdd = [...document.querySelectorAll('.comment-add-btn')];
    btnAdd.forEach((btn) => {
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const formToSend = e.target.parentNode.parentNode;
            const formError = formToSend.querySelector('.form .form-error');
            const comment = formToSend.querySelector('#message');

            if (comment.value.length < 1) {
                formError.innerHTML = '<p>Your comment is empty!</p>';
                setTimeout(function () {
                    formError.innerHTML = ''
                }, 1000);
            } else {
                formError.innerHTML = "";
                const id = formToSend.getAttribute('id');
                const postWithDataId = document.querySelector(`[data-id="${id}"]`);
                const commentsToClean = postWithDataId.querySelector('.comments');
                commentsToClean.innerHTML = "";
                const option = `posts/${id}/comments`;
                addCommentApi(option, id, comment.value, commentsToClean);
            }
        })
    })
};

const createCommentForm = (id, divComments) => {
    const divFormComment = document.createElement('div');
    divFormComment.classList.add('comment-form')
    divFormComment.innerHTML = `<form class="form" action="#" id="${id}">
    <div class="form-row">
        <label for="message">New comment!</label>
        <textarea name="message" id="message"></textarea>
    </div>
        <div class="form-row">
            <button type="click" class="comment-add-btn" >
            Add comment
            </button>
        </div>
        <div class="form-error"></div>
</form>`;

    divComments.appendChild(divFormComment);
};

const addDatatToCommentElement = (divComment, divCommentTitle, divCommentBody, comment, id, postId) => {
    const postsWithDataId = [...document.querySelectorAll('[data-id]')];
    const getCommentDiv = postsWithDataId[id - 1].querySelector('.comments');

    if (postId == id) {
        divCommentBody.innerHTML = `<p>${comment.body}</p>`;

        getCommentDiv.appendChild(divComment);
        divComment.appendChild(divCommentTitle);
        divComment.appendChild(divCommentBody);
    }
};

const createCommentElement = (id, divComments) => {
    const commentsFromCommentsArray = newPost.getCommentFromCommentsArray(id);

    commentsFromCommentsArray.forEach(comment => {
        const divComment = document.createElement('div');
        const divCommentName = document.createElement('div');
        const divCommentBody = document.createElement('div');

        divCommentName.innerHTML = '<i class="far fa-comment"></i>';

        divComment.classList.add('comment');
        divCommentName.classList.add('comment-name');
        divCommentBody.classList.add('comment-body');

        addDatatToCommentElement(divComment, divCommentName, divCommentBody, comment, id, comment.postId)
    });
    createCommentForm(id, divComments);
};

const showComments = (id, divComments) => {
    const commentsArrayLength = newPost.commentsArray.length;

    if (commentsArrayLength === 0) {
        getFromApi(`posts/${id}/comments`, id, divComments);
    } else {
        commentsArrayLength.length = 0;
        divComments.innerHTML = "";
        createCommentElement(id, divComments);
    };
};

const addDataToElement = (divPost, divPostTitle, divPostBody, divComments, post) => {
    divPostTitle.innerHTML = `<h2>${post.title}</h2>`;
    divPostBody.innerHTML = `<p>${post.body}.</p>`;

    posts.appendChild(divPost);
    divPost.appendChild(divPostTitle);
    divPost.appendChild(divPostBody);
    divPost.appendChild(divComments);
};

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

        divPost.setAttribute('data-id', index + 1);

        addDataToElement(divPost, divPostTitle, divPostBody, divComments, post);
        showComments(post.id, divComments);
    });
    addNewCommentElement();
};


const addPost = (json, id, divComments) => {
    json.forEach((element) => {
        if (id === undefined) {
            newPost.addToPostsArray(element.id, element.title, element.body, element.userId)
        } else {
            newPost.addToCommentsArray(element.postId, element.id, element.name, element.email, element.body, id);
        };
    });

    id === undefined ? createPostElement() : createCommentElement(id, divComments);
};

if (newPost.postsArray.length === 0) {
    getFromApi('posts');
} else {
    createPostElement();
}