/**
 * @fileoverview Codeframe reporter
 * @author Vitor Balocco
 */
"use strict";

const chalk = require("chalk");
const { codeFrameColumns } = require("@babel/code-frame");
const path = require("path");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function formatFilePath(filePath, line, column) {
  let relPath = path.relative(process.cwd(), filePath);

  if (line && column) {
    relPath += `:${line}:${column}`;
  }

  return chalk.green(relPath);
}

function formatMessage(message, parentResult) {
  const type = (message.fatal || message.severity === 2) ? chalk.red("error") : chalk.yellow("warning");
  const msg = `${chalk.bold(message.message.replace(/([^ ])\.$/, "$1"))}`;
  const ruleId = message.fatal ? "" : chalk.dim(`(${message.ruleId})`);
  const filePath = formatFilePath(parentResult.filePath, message.line, message.column);
  const sourceCode = parentResult.output ? parentResult.output : parentResult.source;

  const firstLine = [
    `${type}:`,
    `${msg}`,
    ruleId ? `${ruleId}` : "",
    sourceCode ? `at ${filePath}:` : `at ${filePath}`
  ].filter(String).join(" ");

  const result = [firstLine];

  if (sourceCode) {
    result.push(
      codeFrameColumns(sourceCode, { start: { line: message.line, column: message.column } }, { highlightCode: false })
    );
  }

  return result.join("\n");
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(results) {
  let errors = 0;
  let warnings = 0;

  const resultsWithMessages = results.filter(result => result.messages.length > 0);

  let output = '\n\n'

  output += resultsWithMessages.reduce((resultsOutput, result) => {
      const messages = result.messages.map(message => `${formatMessage(message, result)}\n\n`);

      errors += result.errorCount;
      warnings += result.warningCount;

      return resultsOutput.concat(messages);
  }, []).join("\n");

  const summaryColor = errors > 0 ? "red" : warnings > 0 ? "yellow" : "green";
  const summary = `${errors} errors ${warnings} warnings`

  output += chalk[summaryColor].bold(summary)
  output += '\n'

  return (errors + warnings) > 0 ? output : "Keine Fehler gefunden";
};
