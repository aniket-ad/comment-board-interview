1. I had initial issues getting the project running after initializing with create-react-app
2. The latest node version was causing issue with the specified sqlite 3 version so I had to update sqlite3 version to the latest
3. Used react bootstrap to get some styling going very quickly
4. I had to enable cors everywhere in order to be able to fetch and post data to express server
5. Implemented updating the comments list initially via just updating the state, but later used socket io to broadcast comments being posted
6. Used JOI for data input validation and sanitization. Input validation is done on the server side
7. Jest was used for testing
8. Prettier was used for linting
9. Added Husky - Git hooks for linting on pre-commits
