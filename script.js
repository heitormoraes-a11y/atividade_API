const URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";

let publicacoes = [];

const btnCarregar = document.querySelector("#btn-carregar");
const inputFiltro = document.querySelector("#filtro");
const mensagem = document.querySelector("#mensagem");
const listaPosts = document.querySelector("#lista-posts");

btnCarregar.addEventListener("click", carregarPublicacoes);

function carregarPublicacoes() {
    mensagem.textContent = "Carregando publicações...";
    mensagem.className = "carregando";
    btnCarregar.disabled = true;

    listaPosts.replaceChildren();

    fetch(URL)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Erro HTTP: " + resposta.status);
            }
            return resposta.json();
        })
        .then(function (dados) {
            console.log(dados);
            publicacoes = dados.slice(0, 6);
            renderizarPublicacoes(publicacoes);
            mensagem.textContent = "Publicações carregadas com sucesso.";
            mensagem.className = "sucesso";
        })
        .catch(function (erro) {
            console.error("Erro ao carregar publicações:", erro);
            mensagem.textContent = "Desculpe, não foi possível carregar as publicações. Tente novamente mais tarde.";
            mensagem.className = "erro";
            listaPosts.replaceChildren();
        })
        .finally(function () {
            btnCarregar.disabled = false;
        });
}

function renderizarPublicacoes(lista) {
    listaPosts.replaceChildren();

    if (lista.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma publicação encontrada";
        aviso.className = "nenhum-resultado";
        listaPosts.append(aviso);
        return;
    }

    lista.forEach(function (publicacao) {
        const artigo = document.createElement("article");
        artigo.className = "cartao";

        const titulo = document.createElement("h2");
        titulo.textContent = publicacao.title;

        const paragrafo = document.createElement("p");
        paragrafo.textContent = publicacao.body;

        const idPost = document.createElement("p");
        idPost.className = "id-post";
        idPost.textContent = "ID: " + publicacao.id;

        artigo.append(titulo);
        artigo.append(paragrafo);
        artigo.append(idPost);

        listaPosts.append(artigo);
    });
}

inputFiltro.addEventListener("input", function () {
    const termo = inputFiltro.value.trim().toLowerCase();

    const filtradas = publicacoes.filter(function (publicacao) {
        return publicacao.title.toLowerCase().includes(termo);
    });

    renderizarPublicacoes(filtradas);
});
