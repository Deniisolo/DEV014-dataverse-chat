// src/lib/openAIApi.js

// Importa la función para obtener la API KEY desde apiKey.js
import { getApiKey } from "./apiKey.js";

export const communicateWithOpenAI = (messages, id) => {
  const promises = [];
  if (Array.isArray(id)) {
    console.log("este es un array");
    for (let i = 0; i < id.length; i++) {
      const result = solicitude(id[i])
      promises.push(result)
    }
  } else {
    console.log("No es un array");
  }
  console.log(promises)
  function solicitude(id) {
    const OPENAI_API_KEY = getApiKey();
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `${messages}` },
        {
          role: "system",
          content: `Responde en primera persona como si fuera este cantante:${id}`,
        },
      ],
      temperature: 0.7,
    };
    return fetch("https://api.openai.com/v1/chat/completions", {
      //endpoint fetch me retorna una promesa
      method: "POST", // enviar información
      headers: {
        //sitaxis del fetch
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data), //este hace parte del metodo: post
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        throw error;
      });
  }

  //Aquí es donde debes implementar la petición con fetch o axios
};