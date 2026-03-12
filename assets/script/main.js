document.addEventListener("DOMContentLoaded", loadPosts);

function addPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Preencha todos os campos.");
        return;
    }

    const post = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleString()
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);

    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadPosts();
}

function loadPosts() {
    const container = document.getElementById("posts-container");
    if (!container) return;

    container.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.reverse().forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <small>${post.date}</small>
            <br><br>
            
            <a href="post.html?id=${post.id}">
                <button>Ver postagem</button>
            </a>
        
            <button onclick="deletePost(${post.id})" style="background-color:#c0392b;">
                Deletar
            </button>
        `;

        container.appendChild(postElement);
    });
}

function deletePost(id) {
    const confirmDelete = confirm("Tem certeza que deseja deletar esta postagem?");

    if (!confirmDelete) return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.filter(post => post.id !== id);

    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();
}

fetch("./partials/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

fetch("./partials/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });
