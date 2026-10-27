// Dedicated isolated browser worker for student-written code. Terminated on timeout.
self.onmessage=({data})=>{
 const {code,tests}=data;
 try {
   const solve=new Function('"use strict";\n'+code+'\n;return typeof solve === "function" ? solve : null;')();
   if(typeof solve!=='function')throw new Error('Define a function named solve.');
   const results=[];
   for(const t of tests){let actual;try{actual=solve(structuredClone(t.input));const ok=JSON.stringify(actual)===JSON.stringify(t.output);results.push({ok,input:t.input,expected:t.output,actual})}catch(e){results.push({ok:false,input:t.input,expected:t.output,error:String(e.message||e)})}}
   self.postMessage({results});
 }catch(e){self.postMessage({error:String(e.message||e)})}
};
