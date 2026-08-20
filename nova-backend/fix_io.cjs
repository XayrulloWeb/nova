const fs = require('fs');
let code = fs.readFileSync('src/routes/admin.js', 'utf8');
code = code.replace(/const \{ io \} = require\('\.\.\/index'\);/g, '');
code = code.replace(/io\.emit\(/g, 'require(\'../index\').io.emit(');
fs.writeFileSync('src/routes/admin.js', code);
console.log('Fixed io.emit in admin.js');
