# GitHub-user-searcher
Vanilla JavaScript Application to look for GitHub users' summaries. This a frontend test given by Marfeel as a technical test.

### General Comments: 

**1.-** This JavaScript application was built as a complete project. The main element itself is not seen as a component because it is built as a set of components. That's why styles are divided among different modules as I'm working with Sass. I made use of webpack to bundle this application. Inside webpack's configuration I'm making use of babel and Sass modules to compile code and make it work on any browser with no issue at all.

**2.-** You can access to all files of the project, even my webpack config files.

**3.-** I deployed this application using Heroku, so you can access through this link: https://dh-marfeel-test.herokuapp.com/. Otherwise you will need to set up a static server that could watch dist folder to access the application.

**4.-** I prepared different tests using jasmine in order to make sure its functionallity through the development and debugging processes.

### Last Update:

**1.-** The object that called the GitHub API was removed and a class named 'GateWay' took its place. This is the most important update, because tests were remade to handle the new class. However, the main architecture didn't suffer changes at all.

**2.-** Objects received as arguments were destructured to handle only those values that are needed. This is a good way to optimize memory usage and it makes the code more readable.

**3.-** The 'for' loop used to create list items in the repositorie list was replaced for an array method called 'forEach'. In order to make sure that all items are being processed and make the code more semantic. As a consequence, it is not necessary to validate how many times the list items are printed.

**4.-** Error message was rewritten to make it look better.


