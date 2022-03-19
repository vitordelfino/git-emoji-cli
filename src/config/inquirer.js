const chalk = require("chalk");
const inquirer = require("inquirer");
const { commits } = require("../utils/commits");
const { addScopeToCommit } = require("../utils/add-scope-to-commit");

const scope = {
  type: "input",
  name: "scope",
  message: "Scope of the commit?",
};

const commitType = {
  type: "search-list",
  name: "commitType",
  value: "",
  message: "Choose a commit type:",
  choices: commits,
};

const commitMessage = {
  type: "maxlength-input",
  name: "commitMessage",
  message: "Write a commit message:",
  maxLength: 100,
  filter(input, answers) {
    return addScopeToCommit(answers.commitType, answers.scope, input);
  },
  transformer(input, answers) {
    return chalk.green(
      addScopeToCommit(answers.commitType, answers.scope, input)
    );
  },
};

function configureInquirer() {
  inquirer.registerPrompt("search-list", require("inquirer-search-list"));
  inquirer.registerPrompt(
    "maxlength-input",
    require("inquirer-maxlength-input-prompt")
  );

  return inquirer;
}

module.exports = { scope, commitType, commitMessage, configureInquirer };
