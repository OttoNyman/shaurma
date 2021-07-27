const fs = require('fs');
const path = require('path');

const environmentFilesDirectory = path.join(__dirname, './src/environments');
const targetEnvironmentFileName = 'environment.prod.ts';

// Define default values in case there are no defined ones,
// but you should define only non-crucial values here,
// because build should fail if you don't provide the correct values
// for your production environment
const defaultEnvValues = {
  PREFIX_STORAGE_TYPE: 'localStorage',
  PREFIX_USER_TOKEN_FIELD_NAME: 'userToken',
};

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentFileName),
  {encoding: 'utf-8'}
);

const output = environmentTemplate.replace('$$', process.env.API_URL);
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), output);

process.exit(0);