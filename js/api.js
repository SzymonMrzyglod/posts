const addCommentApi = (option, postId, name, id, email, comment, commentsToClean) => {
    url = `https://jsonplaceholder.typicode.com/${option}`
    fetch(url, {
            method: "post",
            body: JSON.stringify({
                postId: postId,
                id: id,
                name: name,
                email: email,
                body: comment,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => newPost.addToCommentsArray(json.postId, json.id, json.name, json.email, json.body, id))
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
        })
}