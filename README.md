# Project technical-test

technical test for backend developer

## Documentation

[Documentation](https://loopback.io/doc/en/lb4/)

## Deployment

Create a new file `.env` from `.env.example` and add the PostgreSQL Configuration. Later, follow the steps below.

1. Create User & UserCredentials for integrating JWT

```
$ lb4 model User
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Model User will be created in src/models/user.model.ts

Let's add a property to User
Enter an empty property name when done

? Enter the property name:
   create src/models/user.model.ts
   update src/models/index.ts

Model User was/were created in src/models
```

```
$ lb4 model UserCredentials
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Model UserCredentials will be created in src/models/user-credentials.model.ts

Let's add a property to UserCredentials
Enter an empty property name when done

? Enter the property name:
   create src/models/user-credentials.model.ts
   update src/models/index.ts

Model UserCredentials was/were created in src/models
```

2. Replace `models/user.model.ts` & `models/user-credentials.model.ts` by [user.model.ts](https://github.com/loopbackio/loopback-next/blob/master/extensions/authentication-jwt/src/models/user.model.ts) & [user-credentials.model.ts](https://github.com/loopbackio/loopback-next/blob/master/extensions/authentication-jwt/src/models/user-credentials.model.ts)

Create repositories for User and UserCredentials

```
$ lb4 repository
? Please select the datasource PostgresqlDatasource
? Select the model(s) you want to generate a repository for UserCredentials, User
? Please select the repository base class DefaultCrudRepository (Juggler bridge)
? Please enter the name of the ID property for UserCredentials: id
? Please enter the name of the ID property for User: id
   create src/repositories/user-credentials.repository.ts
   create src/repositories/user.repository.ts
   update src/repositories/index.ts
   update src/repositories/index.ts

Repositories UserCredentialsRepository, UserRepository was/were created in src/repositories
```

Run

```
npm run build
```

Modify datasources/postgresql.datasource.ts to meet the proper PostgreSQL configurations then create a new PostgreSQL database depending on your configurations.

Run

```
npm run migrate
```

Delete the following files:

models/user.model.ts
models/user-credentials.model.ts
repositories/user.repository.ts
repositories/user-credentials.repository.ts

Modify models/index.ts by deleting the following lines:

```
export * from './user.model';
export * from './user-credentials.model';
```

Modify repositories/index.ts by deleting the following lines:

```
export * from './user-credentials.repository';
export * from './user.repository';
```

NOTE: I suggested a new feature request for a better JWT integration

## 🛠 Skills

Javascript, NodeJS, NestJS, React, PHP, Laravel, HTML, CSS...

## Authors

- [@korozcolt](https://www.github.com/korozcolt)

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
