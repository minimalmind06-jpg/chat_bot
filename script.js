// ===========================
// REFERÊNCIAS AOS ELEMENTOS HTML
// ===========================
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const newChatButton = document.getElementById("newChatButton");

// ===========================
// RESPOSTAS DO CHATBOT
// ===========================
// Organizamos as respostas por categoria.
// Na próxima etapa vamos tornar isto mais avançado (respostas variadas e aleatórias).
const responses = {
    greetings: "Olá! 👋 Como posso ajudar?",
    name: "Podes chamar-me Chatbot.",
    help: "Claro! Podes perguntar-me algumas coisas ou simplesmente conversar comigo.",
    goodbye: "Até à próxima! 👋",
    unknown: "Ainda estou a aprender a responder a esse tipo de pergunta. 🙂"
};

// ===========================
// FUNÇÃO: decidir a resposta do bot
// ===========================
function getBotResponse(message) {
    // Convertemos para minúsculas para facilitar a comparação
    // (assim "Olá", "olá" e "OLÁ" são todos reconhecidos)
    const text = message.toLowerCase();

    if (text.includes("olá") || text.includes("ola") || text.includes("boas")) {
        return responses.greetings;
    }

    if (text.includes("nome")) {
        return responses.name;
    }

    if (text.includes("ajuda")) {
        return responses.help;
    }

    if (text.includes("hora")) {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, "0");
        const minutos = agora.getMinutes().toString().padStart(2, "0");
        return `Agora são ${horas}:${minutos}. ⏰`;
    }

    if (text.includes("adeus") || text.includes("tchau")) {
        return responses.goodbye;
    }

    // Se nenhuma das condições acima for verdadeira,
    // devolvemos a resposta genérica.
    return responses.unknown;
}

// ===========================
// FUNÇÃO: mostrar uma mensagem no ecrã
// ===========================
function displayMessage(sender, text) {
    // Criamos um novo elemento <div> para a mensagem
    const messageElement = document.createElement("div");

    // Adicionamos as classes CSS "message" e "user" ou "bot"
    messageElement.classList.add("message", sender);

    // Usamos textContent em vez de innerHTML.
    // Isto é mais seguro: mesmo que o utilizador escreva código HTML
    // na mensagem, ele vai aparecer como texto normal, e não ser executado.
    messageElement.textContent = text;

    // Adicionamos a mensagem à área de mensagens
    chatMessages.appendChild(messageElement);
}

// ===========================
// FUNÇÃO: enviar a mensagem do utilizador
// ===========================
function sendMessage() {
    const text = messageInput.value.trim();

    // Se o campo estiver vazio, não fazemos nada
    if (text === "") {
        return;
    }

    // Mostramos a mensagem do utilizador
    displayMessage("user", text);

    // Limpamos o campo de texto
    messageInput.value = "";

    // Como o campo ficou vazio, desativamos o botão de enviar
    sendButton.disabled = true;

    // Obtemos e mostramos a resposta do bot
    const botReply = getBotResponse(text);
    displayMessage("bot", botReply);
}

// ===========================
// EVENTOS
// ===========================

// Ativa ou desativa o botão de enviar consoante o campo tem texto ou não
messageInput.addEventListener("input", () => {
    sendButton.disabled = messageInput.value.trim() === "";
});

// Clicar no botão envia a mensagem
sendButton.addEventListener("click", sendMessage);

// Pressionar Enter envia a mensagem; Shift + Enter cria uma nova linha
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // impede que o Enter crie uma nova linha
        sendMessage();
    }
});