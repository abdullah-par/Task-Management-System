const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';
require('dotenv').config();

const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || 'https://localhost:7051/api/tasks'}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       console.log(err);
   }
   console.log(`Output generated at ${targetPath}`);
});
