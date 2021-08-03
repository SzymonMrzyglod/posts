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


const getFromApi = (option, id) => {
    url = `https://jsonplaceholder.typicode.com/${option}`;

    fetch(url)
        .then(response => response.json())
        .then(json => addPost(json, id));
}

getFromApi('posts');