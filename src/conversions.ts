import { getDefinitions } from './configuration';
import type { ConvertDefinition } from './configuration';

export function codeToSpec(folderName: string, filePath: string) {
  const definitions = getDefinitions();
  const [basePath, relativePath] = filePath.split(folderName);

  const definition =
    relativePath &&
    definitions?.find((definition) => {
      const codePath = definition.codeDirectory.startsWith('/')
        ? definition.codeDirectory
        : `/${definition.codeDirectory}`;

      return relativePath.startsWith(codePath);
    });

  if (definition) {
    const relativeSpecPath = relativePath
      .replace(definition.codeDirectory, definition.specDirectory)
      .replace(
        /([^\/]+)\.rb$/,
        (_match, filenameWithoutExtension) =>
          `${filenameWithoutExtension}_spec.rb`
      );

    return basePath + folderName + relativeSpecPath;
  }
}

export function specToCode(folderName: string, filePath: string) {
  const definitions = getDefinitions();
  const [basePath, relativePath] = filePath.split(folderName);

  const definition =
    relativePath &&
    definitions?.find((definition) => {
      const specPath = definition.specDirectory.startsWith('/')
        ? definition.specDirectory
        : `/${definition.specDirectory}`;

      return relativePath.startsWith(specPath);
    });

  if (definition) {
    const relativeCodePath = relativePath
      .replace(definition.specDirectory, definition.codeDirectory)
      .replace(
        /([^\/]+)_spec\.rb$/,
        (_match, filenameWithoutExtension) => `${filenameWithoutExtension}.rb`
      );

    return basePath + folderName + relativeCodePath;
  }
}
