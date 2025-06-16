import OpenAI from "https://cdn.skypack.dev/openai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

botaoEnviar.addEventListener('click', async () => enviar())

async function enviar() {
  let key = "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";

  if(keyInput.value != "") {
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
