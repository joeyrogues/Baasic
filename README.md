# Requirements

* node
* npm

# How to?

Just fill in the models in models.json

Example:
```json
[{
  "plural": "users"
}, {
  "plural": "articles"
}]
```

The example above creates the following routes:
* For model Users
  * `GET    /users`
  * `GET    /users/:id`
  * `POST   /users`
  * `POST   /users/:id`
  * `DELETE /users/:id`
* For model Car
  * `GET    /articles`
  * `GET    /articles/:id`
  * `POST   /articles`
  * `POST   /articles/:id`
  * `DELETE /articles/:id`

To run the server

```bash
node App.js
```