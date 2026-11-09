const requests = new Map<string,{count:number,until:number}>();
export function allowRequest(request:Request){
 const origin=request.headers.get('origin');
 if(origin){try{const parsed=new URL(origin);const sameHost=parsed.host===request.headers.get('host');if(!sameHost&&origin!==new URL(request.url).origin&&origin!==process.env.NEXT_PUBLIC_SITE_URL)return false;}catch{return false;}}
 const key=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'shared';const now=Date.now();
 for(const [k,v] of requests)if(v.until<now)requests.delete(k);
 const entry=requests.get(key);if(entry&&entry.count>=20)return false;
 if(entry)entry.count++;else {if(requests.size>10000)return false;requests.set(key,{count:1,until:now+60000})}return true;
}
export async function readBody(request:Request){const reader=request.body?.getReader();if(!reader)throw new Error('Empty body');let size=0;const chunks:Uint8Array[]=[];while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16000){await reader.cancel();throw new Error('Body too large')}chunks.push(value)}const parsed:unknown=JSON.parse(Buffer.concat(chunks).toString('utf8'));if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw new Error('Expected a JSON object');return parsed as Record<string,unknown>}
