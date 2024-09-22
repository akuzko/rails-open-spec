import { window, workspace, Uri } from 'vscode';
import { basename, dirname } from 'path';
import { mkdirpSync, existsSync, writeFileSync } from 'fs-extra';
import { codeToSpec, specToCode } from './conversions';

export function toggle() {
  const filePath = getFilePath();
  const folderName = getFolderName(filePath);

  if (!filePath || !folderName) {
    return;
  }

  if (isSpecFile(filePath)) {
    openCodeFromSpec(folderName, filePath);
  } else {
    openSpecFromCode(folderName, filePath);
  }
}

function isSpecFile(filePath: string) {
  return filePath.endsWith('_spec.rb');
}

function openCodeFromSpec(folderName: string, filePath: string) {
  const codePath = specToCode(folderName, filePath);

  if (!codePath) {
    return window.showWarningMessage(
      `Failed to fetch source file for '${
        filePath.split(`${folderName}/`)[1] || basename(filePath)
      }'`
    );
  }

  openFile(codePath);
}

function openSpecFromCode(folderName: string, filePath: string) {
  const specPath = codeToSpec(folderName, filePath);

  if (!specPath) {
    return window.showWarningMessage(
      `Failed to fetch spec file for '${
        filePath.split(`${folderName}/`)[1] || basename(filePath)
      }'`
    );
  }

  createIfNeededAndOpenFile(specPath);
}

function getFilePath() {
  return window.activeTextEditor?.document.fileName;
}

function getFolderName(filePath: string | undefined) {
  if (filePath) {
    const uri = Uri.file(filePath);

    return workspace.getWorkspaceFolder(uri)?.name;
  }
}

function openFile(filePath: string) {
  workspace
    .openTextDocument(filePath)
    .then((doc) => window.showTextDocument(doc));
}

function createIfNeededAndOpenFile(filePath: string) {
  if (!existsSync(filePath)) {
    const dirPath = dirname(filePath);

    mkdirpSync(dirPath);
    writeFileSync(filePath, '');
  }

  openFile(filePath);
}
