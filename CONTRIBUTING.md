# Contributing to Rapid React :tada:

Contributions are always welcome. :partying_face: Before contributing please read the [code of conduct](https://github.com/vinaysharma14/rapid-react/blob/master/CODE_OF_CONDUCT.md). To contribute, [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) **Rapid React**, commit your changes, & send a [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) pointing to `development` branch. :balloon:

```bash
$ git clone https://github.com/<your-github-username>/rapid-react
$ cd rapid-react
$ npm install
```

## Ways to Contribute :heart:

- Write a blog, share on LinkedIn, Tweet about the project.
- Improve documentation.
- Fix a bug.
- Implement a new feature.
- Discuss potential ways to improve project.
- Improve existing implementation, performance, e.t.c.

## Found a bug? Missing a specific feature? :mailbox_with_mail:

Feel free to raise a bug or a feature request. Please search the [issue tracker](https://github.com/vinaysharma14/rapid-react/issues) beforehand, your issue/feature may have already been discussed or fixed in master.

### File a bug :beetle:

In case you've encountered a bug, please make sure:

- You are using the latest version.
- You have read the [documentation](https://github.com/vinaysharma14/rapid-react/blob/master/README.md) first, and double-checked your configuration.
- You have acknowledged from troubleshooting & debugging the errors are likely a bug in this project, and not coming from e.g. your environment or custom scripts/commands.
- In your issue description, please include:
  - A clear and descriptive title.
  - A comprehensive description of the expected behavior & use case of an issue, in as much detail as possible.
  - Your operating system and other environment information.
  - All steps to reproduce the issue.

### Raise a feature request :gift:

We would love to hear amazing features from you! :heart: Please raise it in the issue tracker and make sure you provide:

- A clear and descriptive title.
- A comprehensive description of of the suggested enhancement, why you need it, how it should work.
- As much detail and context as possible.

## Coding Guidelines :computer:

In addition to the following guidelines, please follow the conventions already established in the code.

- **Spacing:**<br>
  Use two spaces for indentation. No tabs.
- **Naming:**<br>
  Keep variable & method names concise & descriptive.
  Variable names `index`, `array`, are preferable to `i`, `arr`.
- **Quotes:**<br>
  Single-quoted strings are preferred to double-quoted strings; however, please use a double-quoted string if the value contains a single-quote character to avoid unnecessary escaping.
- **Comments:**<br>
  Please use descriptive comments to annotate significant additions.
- **Commit messages:**<br>
  Give extra care to your commit messages. Write short and descriptive messages with appropriate prefix such as:

  ```bash
  $ git commit -m "chore: added new eslint <name-of-rule> rule"
  $ git commit -m "fix: folder scaffolding crash due to <condition>"
  $ git commit -m "feature: <description-of-new-feature>"
  ```

Guidelines are enforced using [ESLint](https://eslint.org/):

```bash
$ npm run lint
```

**Note:** make sure to always keep [README.md](https://github.com/vinaysharma14/rapid-react/blob/master/README.md) up to date with new features being added, existing functionalities being deprecated, e.t.c.
