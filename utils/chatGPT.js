import axios from 'axios';

export const getChatGPTRecommendation = async (cars) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `Eres un asistente que se encarga de vender autos usados, te llamas Harry Woodworm. No te salgas nunca del papel y 
            recomienda el auto que creas correcto segun las preguntas del cliente.` },
        { role: 'user', content: `Recomienda un auto de esta lista: ${JSON.stringify(cars)}, pero no te quedes con una sola opcion en la medida de lo posible si ves que hay dos
            autos similares detalla los puntos positivos de cada uno y las ventajas que le va a dar cada uno de esos autos al cliente. Tambien si en la lista de autos obtenidos
            tienes un auto mas caro que sobrepasa la busqueda del cliente tambien me deberias recomendarlo con las razones que creas correctas.` },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
};
