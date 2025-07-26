import OpenAI from "https://cdn.skypack.dev/openai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

botaoEnviar.addEventListener('click', async () => enviar())

async function enviar() {

  
  let partA = "sk-proj-3EDwdk-oj40CEM71co";
  let partB = "q93dLNw_FwkzKKEIg5bmHGwseXdSSAE7ejLaVNHyp5meLPMhuHCVjPlOT3BlbkFJJ3ViozPPJBAudmuK0qmA1rFqSkKW";
  let partC = "4POmWTLfuCh9QqHUqZ5kZ8eXj9nWF6eXNmSx6VoN4NL70A";

  let key = partA + partB + partC;

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
