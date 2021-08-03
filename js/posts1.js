const posts = document.querySelector('.posts');

const addCommentElement = (element, id) => {
    const postsWithDataId = [...document.querySelectorAll('[data-id]')];
    const divComment = document.createElement('div');
    const divCommentTitle = document.createElement('div');
    const divCommentBody = document.createElement('div');
    const btnEditComment = document.createElement('button');

    divComment.classList.add('comment');
    divCommentTitle.classList.add('comment-title');
    divCommentBody.classList.add('comment-body');
    btnEditComment.classList.add('comment-btn-edit');

    if (element.name === undefined) {
        divCommentTitle.innerHTML = `<h2>${element.title}</h2>`;
    } else {
        divCommentTitle.innerHTML = `<h2>${element.name}</h2>`;
    }

    divCommentBody.innerHTML = `<p>${element.body}</p>`;
    btnEditComment.innerHTML = `<p>edit</p>`;

    postsWithDataId[id - 1].appendChild(divComment);
    divComment.appendChild(divCommentTitle);
    divComment.appendChild(divCommentBody);
    divComment.appendChild(btnEditComment);
}

const showComments = (json, id) => {
    const postsWithDataId = [...document.querySelectorAll('[data-id]')];
    json.forEach(element => {
        addCommentElement(element, id)
    });
}

const showPosts = (json) => {
    json.forEach(element => {
        const divPost = document.createElement('div');
        const divPostTitle = document.createElement('div');
        const divPostBody = document.createElement('div');
        const btnShowComments = document.createElement('button');
        const btnAddComments = document.createElement('button');

        divPost.classList.add('post');
        divPostTitle.classList.add('post-title');
        divPostBody.classList.add('post-body');
        btnShowComments.classList.add('post-btn-show-comments');
        btnAddComments.classList.add('post-btn-add-comments');

        divPost.setAttribute('data-id', element.id)

        divPostTitle.innerHTML = `<h2>${element.title}</h2>`;
        divPostBody.innerHTML = `<p>${element.body}</p>`;
        btnShowComments.innerHTML = `<p>show comments</p>`;
        btnAddComments.innerHTML = `<p>add comments</p>`;

        posts.appendChild(divPost);
        divPost.appendChild(divPostTitle);
        divPost.appendChild(divPostBody);
        divPost.appendChild(btnShowComments);
        divPost.appendChild(btnAddComments);

        //ZABEZPIECZYĆ PRZED PONOWNYM POBRANIEM TYCH SAMYCH KOMENTARZY
        btnShowComments.addEventListener('click', () => {
            const btnDataId = btnShowComments.parentNode.getAttribute('data-id');
            getCommentsFromApi(`posts/${btnDataId}/comments`, btnDataId);
        })

        btnAddComments.addEventListener('click', () => {
            const btnAddComment = btnAddComments.parentNode.getAttribute('data-id');
            addComment(`posts/${btnAddComment}/comments`, btnAddComment);
        })
    });
};
const addComment = (option, id) => {
    url =
        fetch(`https://jsonplaceholder.typicode.com/${option}`, {
            method: 'POST',
            body: JSON.stringify({
                //DODAĆ WPROWADZANIE DANYCH W JAKIMŚ FORMULARZU
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => addCommentElement(json, id));
}


const getCommentsFromApi = (option, id) => {
    url = `https://jsonplaceholder.typicode.com/${option}`;

    fetch(url)
        .then(response => response.json())
        .then(json => showComments(json, id));
}

const getPostsFromApi = (option) => {
    url = `https://jsonplaceholder.typicode.com/${option}`;

    fetch(url)
        .then(response => response.json())
        .then(json => showPosts(json));
}

getPostsFromApi('posts');