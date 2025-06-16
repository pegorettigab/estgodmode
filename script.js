import OpenAI from "https://cdn.skypack.dev/openai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

botaoEnviar.addEventListener('click', async () => enviar())

async function enviar() {
  let partA = "sk-proj-h864AQNgA0pTGHT3UXvmVyZxB0PBOFUvvSda";
  let partB = "CjcBKZLOlAMlNMgw19jFC1dnwV3T5JPZKpYUsPT3BlbkFJND8v9Z0tHtFGZuGbIEUguGsFU1b_";
  let partC = "hNdUuz-iU7zw03jJRusRBcdIu49XqEsctimxb6latKhh8A";

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
