# rails-open-spec

This extension for VS Code provides a way to quickly switch to spec for opened file and vice versa.

Inspired by [malt03/rails-rspec-file-toggle](https://github.com/malt03/rails-rspec-file-toggle)

## Features

```json
[
  {
    "command": "rails-open-spec.toggleSpecFile",
    "title": "Rails Open Spec: Toggle spec file",
    "key": "ctrl+alt+r"
  }
]
```

## Extension Settings

This extension contributes the following settings:

- `rails-open-spec.convertDefinitions`: An array of `{ codeDirectory, specDirectory }` objects that specify mapping
  between application code and spec files.

```json
"rails-open-spec.convertDefinitions": {
  "default": [
    {
      "codeDirectory": "app/controllers",
      "specDirectory": "spec/requests"
    }
  ],
  "description": "Convert code file path `${codeDirectory}/**/*.rb` to spec path `${specDirectory}/**/*_spec.rb`.",
  "type": "array"
}
```

## Release Notes

### 0.0.1

Unpublished release of `rails-open-spec`
