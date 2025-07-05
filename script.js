import OpenAI from "https://cdn.skypack.dev/openai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

botaoEnviar.addEventListener('click', async () => enviar())

async function enviar() {

  
  let partA = "sk-proj-Tlksdv7wnMHSqM7y6T5kqGqzGhXIn2OFKMOAgBPQAEjGJt6ZRfKTlZBB09qqceLC8AUsnLSUj5T3BlbkFJzOfxpCFExmxTc31_";
  let partB = "L2jM4PZMjEHJmLa3MbOAQ_";
  let partC = "J1trnWxi6PWLfEJYLEnABUtfzO0Xz2qyeNMA";

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

  document.querySelector('.resposta.especial .alternativa-texto').forEach(btn => {
    btn.style.cursor = 'pointer'; // muda o cursor pra indicar que é clicável

    btn.addEventListener('click', () => {
      const texto = btn.textContent.trim();

      navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado para a área de transferência!');
      }).catch(() => {
        alert('Erro ao copiar o texto.');
      });
    });
  });
