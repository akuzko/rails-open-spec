import { workspace } from 'vscode';

export type ConvertDefinition = {
  codeDirectory: string;
  specDirectory: string;
};

export function getDefinitions() {
  return workspace
    .getConfiguration()
    .get<ConvertDefinition[]>('rails-open-spec.convertDefinitions');
}
