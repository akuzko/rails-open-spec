import * as vscode from 'vscode';
import { toggle } from './railsOpenSpec';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'rails-open-spec.toggleSpecFile',
    () => {
      toggle();
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
