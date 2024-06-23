# Term Talk

A simple and secure CLI-based chat application built using Socket.IO. 

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Quick Start](#quickstart)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)


## Overview
With this tool, you can set up a chat server on your local system, enabling connections with friends from anywhere. The system allows an unlimited number of users to join in the conversation. The chats are securely hosted on your own server, the messages are encrypted and automatically disposed of once the conversation concludes, ensuring utmost security for communications.

## Installation

To install this package, you'll need [Node.js](https://nodejs.org/) installed on your system. Then install the package globally using npm:

```bash
npm install -g termtalk
```

## Usage

After installing the package, you can start a chat server by running the following command: 

```bash
tt-host
```

To join a chat server, you can run the following command:

```bash
tt-join
```

## Features

- Secure chat through CLI
- Real-time communication using Socket.IO
- Easy to set up and use
- No limit on number of users
- Messages are encrypted
- Disposable conversation with no physical storage

## Quick Start

Clone the repository:

```bash
git clone https://github.com/achhayapathak/termtalk.git
```

Install Dependencies:

```bash
cd ./termtalk
npm install
```

Start the chat server:

```bash
npm run host
```

Join a chat:

```bash
npm run join
```

## Contributing

This project welcomes all constructive contributions. Here are couple of things you need to keep in mind before contributing:

- Please open an issue on Github if there isn't any already one before working on it.
- This project follows semantic versioning, please see https://semver.org/ before contributing. 
- Update the version of the application in the package.json file everytime you make a commit following the semver standards.
- Please follow the standard commit message format that I am using, here is an example: *v1.3.8 bug-fix: removed the provenance flag.*
-  It starts with the current version of the application and then mentions whether the update was a bug-fix, an enhancement or a feature and then you provide the description of the change. Add the issue number in the statement as well.
- **Raise the PR to the dev branch instead of the main branch**. Mention the issues number in the description of the PR.

Happy contributing!


## Author

[Achhaya Pathak](https://www.github.com/achhayapathak)

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.