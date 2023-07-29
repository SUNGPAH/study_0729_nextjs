const GPT_API_KEY = "-"
const GPT_API_ENDPOINT = 'https://api.openai.com/v1/completions';

export default async function handler(req, res) {

  let _data 
  const { prompt } = req.body;
  
  try {
    const response = await fetch(GPT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 50,
      }),
    });

    _data = await response.json();
  } catch (error) {
    console.error('Error requesting data from GPT API:', error);
    throw error;
  }

  res.status(200).json({ message: _data.choices[0].text.trim() });
}