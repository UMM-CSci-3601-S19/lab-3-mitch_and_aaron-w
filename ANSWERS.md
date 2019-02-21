## Questions

1. :question: Notice anything new in our ``.gitignore``? There are actually
multiple ``.gitignore`` files in this project. Where are they?
Why might we have more than one, and how do they interact?

  The .gitignore files are located in angular-spark-lab,
  in angular-spark-lab/server, and in angular-spark-lab/client.
  
  We might have more than one .gitignore file because we want to ignore
  different types of files in different directories. The .gitignore file in
  angular-spark-lab applies to the whole project, while the .gitignore files
  in the server and client directories only apply to their respective
  directories.
  
2. :question: Note also that there are now multiple ``build.gradle`` files
as well! Why is this?

  There are build.gradle files in angular-spark-lab,
  in angular-spark-lab/server, and in angular-spark-lab/client.
  This is so we can build/run the client and the server separately
  if we want to.
  
3. :question: How does the navigation menu (with Home and Users) work in this project?
Compare `Server.java` and `app.routes.ts`.
Both do a kind of routing; what does each accomplish and how?

  The navigation menu is used to send requests to the server. Server.java has some of the same pathing as in
  lab 2. It sends back data for the client to display using .get() and by accessing the api.
  app.routes.ts determines what information to display on the page by pulling that information from
  the relevant components.

4. :question: What does the `user-list.service.ts` do? Why is it not just done in
the `user-list.component.ts`?

  user-list.service.ts writes requests to the http client. This is not done in user-list.component.ts
  because we want to keep the component that displays the data separate from the one that fetches the data.
  This way, we can make changes to the server side of things without having to implement user-list.component
  differently.
