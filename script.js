import OpenAI from "https://cdn.skypack.dev/openai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

botaoEnviar.addEventListener('click', async () => enviar())

async function enviar() {

  
  let partA = "sk-proj-";
  let partB = "8tEX4gMUF1pURJOXO_"
  let partC = "v1-TFvvPkVLP4yt-";
  let partD = "M98vvMlgt71rS9KMYZygSpc2sLQT0H9AZnyaGeLcT3BlbkFJNW9z0sMFDsN";
  let partE = "_BSG3e42MaPGU9AkZ1uGiQkmcv9JBZQtI8u2_9U5x4xKW4xRP4F-kSC6EmaXA8A";

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
