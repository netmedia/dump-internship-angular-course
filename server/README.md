# Installation
1. Install Node 8 and npm 5
2. Install [Mongo DB](https://www.mongodb.com)
3. Create ``.env`` file from ``.env.template`` and set your configuration
4. ``npm i``

# Starting the app
1. Start MongoDB ``"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"``. Run this from command line  window
2. ``npm start`` to run regularly, ``npm run dev`` for live reload on code changes.

# CLI
When in project root, run ``./cli/scriptName scriptCommand --scriptFlag``  

``--help`` flag is available for scripts and commands.

Example:

``./cli/manage --help`` to get a list of available commands for the ``manage`` script.  
``./cli/manage createuser --name 'Test User' --email test@user.com -a`` to create a new admin user 
with the ``createuser`` command from the ``manage`` script.

# Auth
The app reads the ``email`` and ``password`` fields from the post request to ``/api/login`` and returns the user entity containing a ``token``. This token should be sent to protected api routes through the ``authorization`` header using the ``bearer`` scheme by default (scheme editable through the ``.env`` file).

Example ``authorization`` header would then look like:  
``bearer someLongTokenValueHere``

# API

```
/api
  /login
    / - POST login with email and password fields
  /items
    / - GET list all items
    /:id - GET show item by id
    / - POST create item
    /:id - PUT update item by id
    /:id - DELETE delete item by id
```
