const showPostUi = (e) => {
    const correctPostUi = e.target.parentNode.parentNode;
    const showCommentsBtnUi = correctPostUi.querySelector('.post-body .post-title-button')
    const commentsUi = correctPostUi.querySelector('.comments');
    if (commentsUi.style.display == "block") {
        commentsUi.style.display = "none"
        showCommentsBtnUi.innerText = "Read comments!"
    } else {
        commentsUi.style.display = "block"
        showCommentsBtnUi.innerText = "Hide comments!";
    }
}

setTimeout(function () {
    const postsUi = [...document.querySelectorAll('[data-id]')];
    postsUi.forEach(postUi => {
        const postTitleUi = postUi.querySelector('.post-title');
        const postBodyUi = postUi.querySelector('.post-body');
        const btnReadCommentsUi = document.createElement('button');
        btnReadCommentsUi.innerText = "Read comments!";
        btnReadCommentsUi.classList.add('post-title-button');
        postBodyUi.appendChild(btnReadCommentsUi);
        btnReadCommentsUi.addEventListener('click', showPostUi)
        getRandomDogImg(postTitleUi);
    })
}, 500);

const dogPostImg = (img, postTitleUi) => {
    const imgUi = document.createElement('img');
    imgUi.setAttribute('src', img);
    imgUi.classList.add('post-title-img')
    postTitleUi.appendChild(imgUi);
}
