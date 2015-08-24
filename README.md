# rpProduct

This deliverable of this project is a hybrid web application built on top of AngularJS and Ionic, running on iPad. The goal of this project is to provide a platform for evaluating and sampling the perception of computational thinking from school kids, via interactive quizzes.

I managed the project in an agile way. In the first place, features were identified and weighted in user-involved workshops. Then, prototypes were iterated on a weekly basis, and demonstrated to the users in weekly workshops. As a result, the web application evolved in a fast pace, and successfully delivered in 3 months.

The structure of this web application is adapted from the best practice coined by John Papa and maintained actively by the Github community. Specifically, it is composed of modular and reusable components (directives and services). 

The coding style of this application employs many good parts from functional programming paradigm, via using RamdaJS as the helper library and structuring in composed functions. This brings more succinct code and easy-to-test functions. 

The data of this application are structured in document-based NoSql format and stored in PouchDB as the front-end storage and SQLite as the virtual back-end database (running locally as a service in the iOS layer), via Promise-based async calls.

The UI layer is built with Angular-material library, using flex-box module to create a dynamically responsive layout. the user experience of this web application is interactive, driven by drag-drop based gestures and responsive visual feedback
