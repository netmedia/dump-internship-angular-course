# Installation
1. Install Node 8 and npm 5
2. Create ``.env`` file from ``.env.template`` and set your configuration
3. ``npm i``

# Starting the app
``npm start`` to run regularly, ``npm run dev`` for live reload on code changes.

# CLI
When in project root, run ``./cli/scriptName scriptCommand --scriptFlag``  

``--help`` flag is available for scripts and commands.

Example:  

``./cli/manage --help`` to get a list of available commands for the ``manage`` script.  
``./cli/manage createuser --name 'Test User' --email test@user.com -a`` to create a new admin user with the ``createuser`` command from the ``manage`` script.

