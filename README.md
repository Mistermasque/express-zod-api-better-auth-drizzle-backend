# express-zod-api-better-auth-drizzle-backend

Node.js backend API scaffold using Express Zod API, Drizzle ORM, and Better Auth with a simple ABAC role configuration.

## Project Initialization

```sh
yarn init
touch yarn.lock

yarn add express

yarn add ts-node typescript --dev
yarn add zipfs --dev
```

Reference: [Gist for setup](https://gist.github.com/Ananthu-M-A/caa5c24934a7f16667f2f38e26a822b3)

### VS Code TypeScript Configuration

```sh
yarn dlx @yarnpkg/sdks vscode
```

Reference: [How to correctly resolve path aliases in TypeScript](https://stackoverflow.com/questions/77612285/how-to-correctly-resolve-path-aliases-in-typescript)

## Folder Structure

```
.
├── src/                # Main source code
│   ├── auth/           # Authentication and role logic
│   ├── config/         # App and environment configuration
│   ├── db/             # Database models and Drizzle setup
│   ├── endpoints/      # API endpoint definitions
│   ├── middlewares/    # Express middlewares
│   ├── routes/         # API route definitions
│   ├── types/          # Shared TypeScript types
│   └── utils/          # Utility functions
├── scripts/            # Project scripts (generation, migration, etc.)
├── tmp/                # Temporary files (e.g., CLI output)
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── .env.example        # Example environment configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

---
Feel free to expand this README with more details about usage, scripts, and documentation as your project

# express-zod-api-better-auth-drizzle-backend
Node JS Backend API With Express Zod API, Drizzle and Better Auth with a simple ABAC role config.

## Init a project

yarn init
touch yarn.lock

yarn add express

yarn add ts-node typescript --dev
yarn add zipfs --dev

https://gist.github.com/Ananthu-M-A/caa5c24934a7f16667f2f38e26a822b3

Init vscode for typscript configuration
yarn dlx @yarnpkg/sdks vscode


https://stackoverflow.com/questions/77612285/how-to-correctly-resolve-path-aliases-in-typescript
