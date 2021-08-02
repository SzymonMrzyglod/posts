const posts = document.querySelector('.posts');


const showComments = (json) => {
    console.log(json)
    const postsWithDataId = [...document.querySelectorAll('[data-id]')];
    //WYMYŚLIĆ JAK DODAĆ POBRANE KOMENTARZE POD POSTEM
    json.forEach(element => {
        console.log(element.postId);

        const divComment = document.createElement('div');
        const divCommentTitle = document.createElement('div');
        const divCommentBody = document.createElement('div');

        divComment.classList.add('comment');
        divCommentTitle.classList.add('comment-title');
        divCommentBody.classList.add('comment-body');

        divCommentTitle.innerHTML = `<h2>${element.name}</h2>`;
        divCommentBody.innerHTML = `<p>${element.body}</p>`;

        posts.appendChild(divComment);
        divComment.appendChild(divCommentTitle);
        divComment.appendChild(divCommentBody);
    });

}
const showPosts = (json) => {
    json.forEach(element => {
        const divPost = document.createElement('div');
        const divPostTitle = document.createElement('div');
        const divPostBody = document.createElement('div');
        const btnShowComments = document.createElement('button');

        divPost.classList.add('post');
        divPostTitle.classList.add('post-title');
        divPostBody.classList.add('post-body');
        btnShowComments.classList.add('post-btn-show-comments');

        divPost.setAttribute('data-id', element.id)

        divPostTitle.innerHTML = `<h2>${element.title}</h2>`;
        divPostBody.innerHTML = `<p>${element.body}</p>`;
        btnShowComments.innerHTML = `<p>show comments</p>`;


        posts.appendChild(divPost);
        divPost.appendChild(divPostTitle);
        divPost.appendChild(divPostBody);
        divPost.appendChild(btnShowComments);
    
        btnShowComments.addEventListener('click', () => {
            const btnDataId = btnShowComments.parentNode.getAttribute('data-id');
            getCommentsFromApi(`posts/${btnDataId}/comments`);
        })     
    });
};

const getCommentsFromApi = (option) => {
    url = `https://jsonplaceholder.typicode.com/${option}`;

    fetch(url)
        .then(response => response.json())
        .then(json => showComments(json));
}

const getPostsFromApi = (option) => {
    url = `https://jsonplaceholder.typicode.com/${option}`;

    fetch(url)
        .then(response => response.json())
        .then(json => showPosts(json));
}

getPostsFromApi('posts');