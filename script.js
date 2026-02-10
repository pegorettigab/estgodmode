import OpenAI from "https://cdn.skypack.dev/openai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

botaoEnviar.addEventListener('click', async () => enviar())

async function enviar() {

  
  let partA = "sk-proj--";
  let partB = "KmKZFV7qvxXuh3u-"
  let partC = "O8N3iXOlgMdZD-";
  let partD = "bSND7HXKmFLDjHag0s6Xn4JtZ2T4vF88HFaevvrTTvwT3BlbkFJRmvIcfLuVHwH5pbJADcf";
  let partE = "D5UYSktmht9YiNF3ycuzBLajg5Hd_3rYbqIZmxctUr5OrpGrzqm_AA";

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
    model: "gpt-5-nano",
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
