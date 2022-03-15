const { configureInquirer } = require("./inquirer");
const { configureGit } = require("./simple-git");

function configure() {
  const git = configureGit();

  const inquirer = configureInquirer();

  return { git, inquirer };
}

function initialize() {
  const { git, inquirer } = configure();

  inquirer.prompt([commitType, commitMessage]).then((answers) => {
    const commit = `${answers.commitMessage}`;
    return git.commit(commit);
  });
}

module.exports = { configure, initialize };