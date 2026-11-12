import { cpSync, mkdirSync, rmSync } from 'node:fs';
const out='www';
rmSync(out,{recursive:true,force:true}); mkdirSync(out,{recursive:true});
for (const path of ['index.html','manifest.webmanifest','sw.js','css','js','assets']) cpSync(path,`${out}/${path}`,{recursive:true});
console.log('Web assets generated in www/');
