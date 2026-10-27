const fs=require('node:fs'); const path=require('node:path');
const file=process.env.DATA_FILE || path.join(__dirname,'..','data','db.json');
let db={users:[],sessions:[],submissions:[],activity:[]};
function load(){try{ const raw=JSON.parse(fs.readFileSync(file,'utf8')); for(const k of Object.keys(db)) if(Array.isArray(raw[k])) db[k]=raw[k]; }catch(e){if(e.code!=='ENOENT') console.error('Data load error:',e.message)}}
function save(){fs.mkdirSync(path.dirname(file),{recursive:true});const temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify(db,null,2));fs.renameSync(temp,file)}
load();module.exports={db,save};
