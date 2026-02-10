// 1. Importar a SDK do Google Generative AI via CDN compatível com navegador
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const keyInput = document.getElementById("key");
const botaoEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");
const textarea = document.getElementById("entrada");

botaoEnviar.addEventListener('click', async () => enviar());

async function enviar() {
  

  let key = "AIzaSyBWUSU1BSZ4eP55_dG9mVnNkFBc4EmsAFw"; 

  // Prioriza o input do usuário se houver algo digitado
  if(keyInput.value != "") {
    key = keyInput.value;
  }
  
  if (!key || key === "SUA_CHAVE_GEMINI_AQUI_SE_QUISER_FIXAR") {
      alert("Por favor, insira uma API Key do Google Gemini válida.");
      return;
  }

  const textoOriginal = textarea.value;
  const promptFinal = textoOriginal.replace(/\n/g, " ") + " Quero somente a letra das respostas";

  try {
    resultado.innerText = "Carregando...";

    // 2. Inicializar a instância do Google Generative AI
    const genAI = new GoogleGenerativeAI(key);

    // 3. Escolher o modelo (gemini-1.5-flash é rápido e barato/gratuito)
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // 4. Gerar o conteúdo
    const result = await model.generateContent(promptFinal);
    const response = await result.response;
    const text = response.text();

    // Exibir o resultado
    resultado.innerText = text;

  } catch (error) {
    console.error("Erro ao comunicar com o Gemini:", error);
    resultado.innerText = "Erro: " + error.message;
  }
}

// Lógica do botão de copiar (mantida igual)
var btn = document.querySelector('.resposta.especial .alternativa-texto');
if (btn) { // Verificação de segurança caso o elemento não exista
    btn.addEventListener('click', () => {
      const texto = btn.textContent.trim();
      navigator.clipboard.writeText(texto).then(() => {
        console.log("Sucesso");
      }).catch(() => {
        alert('Erro ao copiar o texto.');
      });
    });
}
