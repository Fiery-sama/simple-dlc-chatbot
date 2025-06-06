let faqs = [];

// Load FAQ data from faqs.json
fetch('faqs.json')
  .then(response => response.json())
  .then(data => {
    faqs = data;
  });

// Handle user message
function handleSend() {
  const input = document.getElementById('user-input');
  const userText = input.value.trim();
  if (!userText) return;

  addMessage('user', userText);
  const response = getBotResponse(userText);
  addMessage('bot', response);

  input.value = '';
}

// Get bot reply from local FAQ
function getBotResponse(userText) {
  userText = userText.toLowerCase();
  for (let faq of faqs) {
    if (userText.includes(faq.question.toLowerCase())) {
      return faq.answer;
    }
  }

  // Fuzzy match if not exact
  for (let faq of faqs) {
    if (faq.question.toLowerCase().includes(userText)) {
      return faq.answer;
    }
  }

  return "Sorry, I don't know that yet. Try asking about WhatsApp, Paytm or Google Maps.";
}

// Show message in chat window
function addMessage(sender, text) {
  const chatWindow = document.getElementById('chat-window');
  const message = document.createElement('div');
  message.className = sender;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Auto-show chatbot on mobile
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 768) {
    document.getElementById("chatbot-container").style.display = "flex";
  }
});
