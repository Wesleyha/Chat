// Menu
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => menu.classList.toggle("active"));

function showSection(sectionId){
  document.querySelectorAll(".section").forEach(sec=>sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
  menu.classList.remove("active");
}

// Chatbot
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatButton = document.getElementById('chat-button');

async function enviarPergunta(){
  const question = chatInput.value.trim();
  if(!question) return;

  const userMsg = document.createElement('div');
  userMsg.className='message user';
  userMsg.innerHTML=`<strong>Você:</strong> ${question}`;
  chatMessages.appendChild(userMsg);
  chatInput.value='';

  const botMsg=document.createElement('div');
  botMsg.className='message bot';
  botMsg.innerHTML=`<em>IA está digitando...</em>`;
  chatMessages.appendChild(botMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try{
    const response = await fetch('http://localhost:10000/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({question})
    });
    const data = await response.json();
    botMsg.innerHTML=`<strong>IA:</strong> ${data.answer}`;
  }catch(err){
    botMsg.innerHTML=`<strong>IA:</strong> Ocorreu um erro ao tentar responder.`;
    console.error(err);
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatButton.addEventListener('click', enviarPergunta);
chatInput.addEventListener('keypress', e=>{if(e.key==='Enter') enviarPergunta();});
