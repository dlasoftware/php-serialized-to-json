// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const unserialize = require('./unserialize');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('php-serialized-to-json.go', function () {
		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selections = editor.selections;
            // Replace the selected text with the new text
            editor.edit((editBuilder) => {
                selections.forEach((selection) => {
					try {
						editBuilder.replace(selection, JSON.stringify(unserialize(editor.document.getText(selection)), null, 4));
					} catch(e) {

					}
                });
            });
        }
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
