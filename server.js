import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Coloque seu token Hugging Face aqui
const HUGGINGFACE_TOKEN='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';

app.post('/chat', async (req,res)=>{
  const question=req.body.question;
  try{
    const response=await fetch('https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${HUGGINGFACE_TOKEN}`
      },
      body: JSON.stringify({inputs:question})
    });
    const data = await response.json();
    res.json({answer:data[0]?.generated_text || "Desculpe, não consegui responder."});
  }catch(err){
    console.error(err);
    res.json({answer:"Ocorreu um erro ao tentar responder."});
  }
});

const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log(`Servidor rodando na porta ${PORT}`));
