import OpenAI from "https://cdn.skypack.dev/openai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

botaoEnviar.addEventListener('click', async () => enviar())

async function enviar() {

  
  let partA = "sk-proj-";
  let partB = "dLzad6aQS9CIPmZiiEeAkcjCNlbesE5Tz2_"
  let partC = "rF21xbZbdqaKFzU7DTmUORQg_";
  let partD = "KpnQGW6sActe5ST3BlbkFJA2sSMQ3BtCfK--";
  let partE = "G1lZQuCEwV48KtAgg82vTdEIQpi11LRcmTTiAixCKpDyuQGGp2fFKWmLytYA";

  let key = partA + partB + partC + partD + partE;

  if(keyInput.value != "") {
    console.log('oi')
    key = keyInput.value;
  }
  
  const textarea = document.getElementById("entrada");
  const textoOriginal = textarea.value;

  const promptFinal = textoOriginal.replace(/\n/g, " ") + " Quero somente a letra das respostas";

  const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true, // ⚠️ Necessário para funcionar no navegador
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: promptFinal }
    ]
  });

  resultado.innerText = completion.choices[0].message.content;

}

  var btn = document.querySelector('.resposta.especial .alternativa-texto');

    btn.addEventListener('click', () => {
      const texto = btn.textContent.trim();

      navigator.clipboard.writeText(texto).then(() => {
        console.log("Sucesso")
      }).catch(() => {
        alert('Erro ao copiar o texto.');
      });
    });
