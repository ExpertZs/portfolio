import { profile } from '@/lib/data';
import { allowRequest, readBody } from '@/lib/server';
export async function POST(req:Request){
 if(!allowRequest(req))return Response.json({error:'Please wait a minute and try again.'},{status:429});
 let b;try{b=await readBody(req)}catch{return Response.json({error:'Invalid request.'},{status:400})}
 if(typeof b.website==='string'&&b.website)return Response.json({error:'Unable to submit.'},{status:400});
 const {name,email,message}=b;
 const title=typeof b.title==='string'?b.title.trim():'Portfolio inquiry';
 if(title.length>100||/[\r\n]/.test(title))return Response.json({error:'Invalid subject.'},{status:400});
 if(typeof name!=='string'||name.trim().length<2||name.length>100||typeof email!=='string'||email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof message!=='string'||message.trim().length<10||message.length>5000)return Response.json({error:'Please enter a valid name, email, and message (10–5,000 characters).'},{status:400});
 const draft=`mailto:${profile.email}?subject=${encodeURIComponent(title+' — '+name)}&body=${encodeURIComponent(message+'\n\nFrom: '+name+'\nEmail: '+email)}`;
 if(!process.env.RESEND_API_KEY||!process.env.CONTACT_FROM)return Response.json({draft,message:'Your email draft is ready. Open it below and send it from your email app. Nothing has been sent yet.'});
 try{const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.CONTACT_FROM,to:[profile.email],reply_to:email,subject:title,text:`Name: ${name}\nEmail: ${email}\n\n${message}`}),signal:AbortSignal.timeout(12000)});if(!res.ok)throw new Error('Delivery failed');return Response.json({message:'Your message was sent. Thank you for getting in touch!'})}catch{return Response.json({draft,message:'Delivery is temporarily unavailable. You can send your message using the email draft below.'})}
}
