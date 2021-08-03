const addCommentApi = (option, id) => {
    url = `https://jsonplaceholder.typicode.com/${option}`
    fetch(url, {
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
        .then((json) => newPost.addNewComment(json.postId, json.id, json.title, json.body, id));
}


const getFromApi = (option, id) => {
    url = `https://jsonplaceholder.typicode.com/${option}`;

    fetch(url)
        .then(response => response.json())
        .then(json => addPost(json, id));
}


