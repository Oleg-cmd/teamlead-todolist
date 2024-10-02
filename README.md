
# 📝 Teamlead TodoList for Jira Cloud

This project is a Teamlead TodoList application built for Jira Cloud. It allows users to fetch tasks from Jira projects, count tasks, and retrieve project lists using the Jira Cloud REST API. The frontend is developed using React and Redux Toolkit, while the backend leverages Atlassian Connect Express for seamless integration with Jira.

🎯 Features

    - Fetch Tasks: Retrieve and work with tasks from a selected Jira project with filters like maximum results.
    - Project List: Fetch and display the list of all Jira projects in the user's instance.
    - Jira Cloud Integration: Easily integrates with Jira Cloud using the Atlassian Connect framework.


📦 Dependencies

    - Atlassian Connect Express (ACE): Framework for building Atlassian cloud add-ons.
    - React: Frontend UI library for building user interfaces.
    - Mobx: State management for React applications.
    - Jira Cloud REST API: API for interacting with Jira projects and issues.

Experimental mode explanation

    - Experimental mode changes the logic of the application. For its operation a query is executed to get
    the number of tasks in the project. After that, a request to get all tasks (due to their number) is 
    executed, and the maximum value specified by the user simply distributes the tasks to the pages in the
    pagination. This improves the user experience when navigating between pages, but it may not work well
    if the number of tasks is very large.


    - In classic mode, each pagination page triggers a separate API request.



## For easy setup project use docker:
    1) configure credentials.json (ex. credentials.json.sample)
    2) start docker engine
    3) build app:  docker build -t teamlead-todolist .
    4) run app: docker run -p 3000:3000 teamlead-todolist


### Setup without docker may cause problems with Dependencies:
    1) configure credentials.json (ex. credentials.json.sample)
    2) npm upgrade
    3) npm ci
    4) npm run build

    


### Documentation

[Atlassian-Connect-Express](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/README.md)

[Atlaskit](hhttps://atlassian.design/components/).
