const openRouter="https://openrouter.ai/api/v1/chat/completions"
const model="deepseek/deepseek-chat"
 export const generateResponse=async(prombt)=>{
  if(!process.env.OPENROUTER_API_KEY){
    throw new Error("OPENROUTER_API_KEY is not set in environment variables")
  }
    const response=await fetch(openRouter, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: model,
    messages: [
        {role: 'system', content: 'You are a helpful assistant that helps create code for website builders.'},
      {
        role: 'user',
        content: prombt,
      },
    ],
    temperature:0.2
  }),
});
if(!response.ok){
    const errorData = await response.json().catch(()=>({}))
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}. ${errorData?.error?.message || ''}`)
}
const data=await response.json()
if(!data?.choices?.[0]?.message?.content){
  throw new Error("OpenRouter returned empty response")
}
const messageText = data.choices[0].message.content;
return typeof messageText === 'string' ? messageText : JSON.stringify(data);
}