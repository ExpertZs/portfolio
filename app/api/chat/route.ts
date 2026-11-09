import { POST as answer } from '../ai/route';
import { readBody } from '@/lib/server';
export async function POST(req:Request){let body;try{body=await readBody(req)}catch{return Response.json({error:'Invalid request'},{status:400})}const response=await answer(new Request(req.url,{method:'POST',headers:req.headers,body:JSON.stringify({mode:'ask',input:body.message})}));if(!response.ok)return response;const result=await response.json();return Response.json({reply:result.answer,source:result.source});}
