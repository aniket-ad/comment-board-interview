# Comment board problem

<p align="center">
A comment board based on </p>

<div align="center">

<img height="40"  src="https://github.com/devicons/devicon/raw/master/icons/react/react-original.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/webpack/webpack-original.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/bootstrap/bootstrap-original.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/eslint/eslint-original.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/express/express-original.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/sqlite/sqlite-original.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/socketio/socketio-original.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/jest/jest-plain.svg" />
<img height="40" src="https://github.com/devicons/devicon/raw/master/icons/nodejs/nodejs-original.svg" />
</div>

<hr>


## Installation


Clone repo with GitHub CLI

```bash
$ gh repo clone aniket-ad/comment-board-problem
```


Install with yarn

```bash
$ yarn
```

Run both server and client

```bash
$ yarn dev
```

## What's used

### Production Dependencies
- react (CRA)
- node
- express with cors support
- bootstrap
- react-bootstrap
- socket.io (client & server)
- joi (schema validation)
- sqlite3
- dayjs

### Dev Dependancies
- husky (pre-commit:lint-fix, pre-push:test)
- prettier
- eslint
- jest 
- concurrently (run client and server)

## Screenshots

Initial Page Load<br/>
<img width="846" alt="Screen Shot 2022-10-03 at 1 43 06 PM" src="https://user-images.githubusercontent.com/8336291/193645055-c32e2e96-eb2d-4085-8fe8-9b3d259beff8.png">

Validation Input Error<br/>
<img width="725" alt="Screen Shot 2022-10-03 at 1 51 21 PM" src="https://user-images.githubusercontent.com/8336291/193645082-efcac7d8-f6fa-4e60-9948-2e480f314bca.png">

Successful comment post<br/>
<img width="723" alt="Screen Shot 2022-10-03 at 1 45 01 PM" src="https://user-images.githubusercontent.com/8336291/193645348-6eba35d6-87a8-4b00-b176-12917a6d7f0c.png">


## Things that could have been improved/done with time
- Add Logging (instead of console.log have fatal/critical errors logged into google analytics)
- Error handling: Add React error boundary to show an 'Oops error' page
- Have some integration testing using playwright
- E2E testing for the API endpoints(assert schema validation via joi)
- Input sanitization for security(eg. sql injection/xss attacks)
- Dockerize the project to help with deployments and make it cross platform
