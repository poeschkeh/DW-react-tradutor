import React,{ useState } from "react";

function App() {
  const languages = [
    { code: "en-us", name: "Inglês" },
    { code: "es", name: "Espanhol" },
    { code: "fr", name: "Francês" },
    { code: "de", name: "Alemão" },
    { code: "it", name: "Italiano" },
    { code: "pt-br", name: "Português" },
  ];

  const [idiomaOrigem, setIdiomaOrigem] = useState('pt-br');
  const [idiomaDestino, setIdiomaDestino] = useState('en-us');
  const [textoEntrada, setTextoEntrada] = useState('');
  const [traduzirTexto, setTraduzirTexto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const caracteres = 250; //Limita a quantidade caracteres até 250

  const caracteresRestantes = caracteres - textoEntrada.length;  //Calcula a quantidade de caracteres que restam

  const handleTraducao = async () => {  
    if (textoEntrada.length === 0) {
      setError("O campo de texto não pode estar vazio");
      return;
    }

    setIsLoading(true);
    setError('');
    setTraduzirTexto('');

    try {  //Faz a chamada da API
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoEntrada)}&langpair=${idiomaOrigem}|${idiomaDestino}`
      );
      const data = await response.json();

      if (data.responseData.translatedText) {
        setTraduzirTexto(data.responseData.translatedText);
      } else {
        setError("Não foi possível traduzir.");
      }

      setIsLoading(false);
    } catch (err) {
      setError("Erro ao tentar traduzir.");
      setIsLoading(false);
    }
  }

return (
  <div className="min-h-screen bg-slate-400 flex flex-col">
    <header className="bg-black shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
        <h1 className="text-white text-2xl font-bold">Tradutor</h1>
      </div>
    </header>

    <main className="flex-grow flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <select
            className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
            value={idiomaOrigem}
            onChange={(e) => setIdiomaOrigem(e.target.value)} //Seleciona o idioma de origem para tradução
          >   
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          <button className="p-2 rounded-full hover:bg-gray-100 outline-none" onClick={handleTraducao}>
            <svg
              className="w-5 h-5 text-headerColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>

          <select
            className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
            value={idiomaDestino}
            onChange={(e) => setIdiomaDestino(e.target.value)} //Seleciona o idioma para qual o texto deve ser traduzido
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4">
            <textarea
              className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none"
              placeholder="Digite seu texto..."
              value={textoEntrada}
              maxLength={caracteres}
              onChange={(e) => setTextoEntrada(e.target.value)}
            ></textarea>
            <p className="text-sm text-gray-500">{caracteresRestantes} Caracteres Restantes</p>
          </div>

          <div className="relative p-4 bg-secondaryBackground border-l border-gray-200">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-blue-500 border-t-2"></div>
              </div>
            ) : traduzirTexto ? ( 
              <p className="text-lg text-textColor">{traduzirTexto}</p>
            ) : (
              <p className="text-lg text-textColor">Texto traduzido</p>

            )}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 border-t border-red-400 text-red-700">
            {error}
          </div>
        )}
      </div>
    </main>

    <footer className="bg-black border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-white">
        &copy; {new Date().getFullYear()} Tradutor
      </div>
    </footer>
  </div>
);
}

export default App;
