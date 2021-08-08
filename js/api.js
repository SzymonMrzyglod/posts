const addCommentApi = (option, postId, comment, commentsToClean) => {
    url = `https://jsonplaceholder.typicode.com/${option}`
    fetch(url, {
            method: "post",
            body: JSON.stringify({
                postId: postId,
                body: comment,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => newPost.addToCommentsArray(json.postId, json.id, json.body))
        .finally(() => {
            createCommentElement(postId, commentsToClean);
        })
}


const getFromApi = (option, id, divComments) => {
    url = `https://jsonplaceholder.typicode.com/${option}`;
    fetch(url)
        .then(response => response.json())
        .then(json => addPost(json, id, divComments))
        .finally(() => {
            newPost.commentsArray.push([])
        });
}

const getRandomDogImg = (postTitleUi) => {
    fetch('https://dog.ceo/api/breed/bulldog/images/random')
        .then(response => response.json())
        .then(json => dogPostImg(json.message, postTitleUi));
}

