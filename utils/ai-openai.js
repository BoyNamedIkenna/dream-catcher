import Groq from 'groq-sdk';
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
  });

// Call GROQ API for dream interpretation
export async function getDreamInterpretation(dreamText) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('Server misconfigured: GROQ_API_KEY is missing');
  }

  const model = process.env.GROQ_API_MODEL || 'openai/gpt-oss-120b';

  try {
    const message = await groq.chat.completions.create({
      model,
      max_tokens: 512,
      messages: [
        {
          role: 'system',
          content: 'You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.'
        },
        {
          role: 'user',
          content: `Dream: ${dreamText}`
        }
      ]
    });
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error(`API error: ${error.message}`);
  }
}
