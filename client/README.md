DUMP Internship - Angular & Typescript
======================================

This application represents a demo project for **DUMP Internship 2017 Angular course**.
Frontend app is generated with [Angular CLI](https://github.com/angular/angular-cli). It uses it's own local dev server on `http://localhost:4200/`.

The aplication emphasis and points to common mistakes which Angular beginners usually make and shows some bad practices which need to be avoided.
Also, it contains a TODO list (at the bottom) with tasks in order to fix the issues and write more readable and maintanable code.

### Installation
```
git clone https://github.com/anteburazer/dump-internship-angular-course.git
cd dump-internship-angular-course
npm install
ng serve -o
```

### Run Development
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `npm run start` for a dev server and custom hooks which will set environment to development and merge all i18n files needed for multi language support.

### Build for production
All builds make use of bundling, and using the `--prod` flag in `ng build --prod` or `ng serve --prod` will also make use of uglifying and tree-shaking functionality.


When application is built for production it's copied in `/dist` folder which is the public folder for **Angular CLI**.

## TODO
- Create localized data store
- Refactor components to be more thiner and simpler
- Refactor feature modules to be independent, standalone and decoupled
- Extract extractData() and handleError() functions into common logic
- Reduce token expiration time and implement logic getting a new one
- Implement custom validator and add a validation for minimum date of 'warrantyUntilDate' Item property
- Implement logic for displaying SUCCESS and ERROR notification in one place
- Show popup with DELETE and CANCEL buttons before deleting an item 