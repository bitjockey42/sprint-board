Kanban Board App
-------------------

This will display tasks from task list provider into kanban board style.

Mainly this is intended for personal use in cases where you want to have a Kanban style task management system but cannot because you use a linear task management system at work.

Supported Task Providers
=========================

A task provider is defined here as a third-party service that manages task lists.

 - [Asana](https://asana.com)

Requirements
==================

Install node and npm.

Then `cd` to the board directory and run

  npm install

This will install the packages from `packages.json`.

Then run 

  grunt build



Setup
===================

Create a `config.js` based on `app/scripts/config.js.example`.

You will need to obtain an API Key for Asana as documented [here](http://developer.asana.com/documentation/#api_keys) and figure out the `WORKSPACE_ID` and `PROJECT_ID` from the `https://app.asana.com/<workspace-id>` url.
