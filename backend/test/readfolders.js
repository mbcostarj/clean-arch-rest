const fs = require('fs');
const path = require('path');

function getDirectoryStructure(dirPath, indent = 0) {
  const files = fs.readdirSync(dirPath);
  let structure = "";

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      structure += "\t".repeat(indent) + file + "\\\n";
      structure += getDirectoryStructure(filePath, indent + 1);
    } else {
      structure += "\t".repeat(indent) + file + "\n";
    }
  });

  return structure;
}

const projectRoot = './../frontend/';
const directoryStructure = getDirectoryStructure(projectRoot);
fs.writeFileSync('estrutura_do_projeto.txt', directoryStructure);

console.log('Árvore de pastas exportada para estrutura_do_projeto.txt');