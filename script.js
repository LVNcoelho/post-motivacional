// --- Dados dos Posts Motivacionais ---
// IMPORTANTE: os nomes das imagens aqui DEVEM ser EXATOS aos nomes dos arquivos na sua pasta assets/images/
const postsMotivacionais = [
    {
        titulo: "RESILIÊNCIA E SUPERAÇÃO",
        imagem: "assets/images/reflexao.jpg", // Nome do seu arquivo: reflexao.jpg
        paragrafo: "Não dependa das circunstâncias, sua felicidade não vem das coisas externas."},
    {
        titulo: "CONTINUE SEMPRE",
        imagem: "assets/images/continue.jpg", // Nome do seu arquivo: continue.jpg
        paragrafo: "Mesmo que o caminho seja difícil, cada passo te leva mais perto do seu objetivo. Continue em frente, não desista!"
    },
    {
        titulo: "O SUCESSO TE ESPERA",
        imagem: "assets/images/sucesso.jpg", // Nome do seu arquivo: sucesso.jpg
        paragrafo: "O sucesso não é um destino, mas uma jornada de aprendizado contínuo. Celebre cada pequena vitória."
    }
    // Você pode adicionar mais posts aqui seguindo o mesmo formato:
    /*
    , // Não esqueça a vírgula antes de adicionar um novo objeto!
    {
        titulo: "NOVO TÍTULO AQUI",
        imagem: "assets/images/NOMEDA_SUA_NOVA_IMAGEM.jpg", // Use o nome EXATO do seu arquivo
        paragrafo: "Sua nova frase motivacional para este post."
    }
    */
];

let indicePostAtual = 0; // Começa no primeiro post (índice 0)

// --- Referências aos elementos HTML (encontra os elementos pelo ID) ---
const tituloElemento = document.getElementById('titulo-motivacional');
const imagemElemento = document.getElementById('imagem-motivacional');
const paragrafoElemento = document.getElementById('paragrafo-motivacional');
const btnNovaInspiracao = document.getElementById('btn-nova-inspiracao');

// --- Função para o efeito de digitação ---
function digitarTexto(elemento, textoCompleto, velocidade = 50) {
    let i = 0;
    elemento.textContent = ''; // Limpa o conteúdo antes de digitar
    const intervalo = setInterval(() => {
        if (i < textoCompleto.length) {
            elemento.textContent += textoCompleto.charAt(i);
            i++;
        } else {
            clearInterval(intervalo); // Para o efeito quando o texto terminar
        }
    }, velocidade);
}

// --- Função para carregar e exibir um post ---
function carregarPost(indice) {
    const post = postsMotivacionais[indice]; // Pega o objeto do post com base no índice atual
    if (!post) { // Caso o índice seja inválido (algo deu errado, por exemplo)
        console.error("Post não encontrado para o índice:", indice);
        return;
    }

    // Carrega a imagem imediatamente (sem efeito de digitação para a imagem)
    imagemElemento.src = post.imagem;

    // Digita o título
    digitarTexto(tituloElemento, post.titulo, 70); // Velocidade do título (70ms por caractere)

    // Adiciona um pequeno atraso antes de digitar o parágrafo para que o título comece primeiro
    // O atraso é baseado no tempo que o título leva para ser digitado + 200ms de buffer
    setTimeout(() => {
        digitarTexto(paragrafoElemento, post.paragrafo, 50); // Velocidade do parágrafo (50ms por caractere)
    }, post.titulo.length * 70 + 200); 
}

// --- Função para ir para o próximo post ---
function proximoPost() {
    // Incrementa o índice. O '%' (operador de módulo) garante que ele volte a 0
    // quando o índice ultrapassar o número total de posts, criando um loop.
    indicePostAtual = (indicePostAtual + 1) % postsMotivacionais.length; 
    carregarPost(indicePostAtual); // Carrega o novo post
}

// --- Event Listeners (Onde as coisas começam a acontecer) ---
// Quando a página HTML estiver totalmente carregada (DOMContentLoaded), carrega o primeiro post.
document.addEventListener('DOMContentLoaded', () => {
    carregarPost(indicePostAtual);
});

// Quando o botão "Nova Inspiração" é clicado, chama a função proximoPost.
btnNovaInspiracao.addEventListener('click', proximoPost);
