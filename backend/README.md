# ez-backend

### Components
* ez-Budget
* ez-Schedule

### Rules
* Don't directly push things into `Master`!!!
* Whenever requesting for merge
  * Please report test coverage
  * Please report if build has been successful
  * Please write test cases
  * Example Template
    * Build: *Success*
    * Test case written: *Yes (If not, please explain the reason why)* 
    * Test Coverage: *70%*
  * If you do NOT wish your merge request to be merged (it could be that you are still working on it or whatever the reason is), please put `WIP:` in front merge request title.
  * When pushing your branch, please run `./gitpush <branch-name>`
    * To see options `./gitpush --help`
 
 ### Python Script
 * Install `python3`
 * Install `pip`
 * `pip install <package>`
   * colorama
   * mypy
   * pylint
   * pypl
   * pycodestyle
   * pydocstyle
   
### Swagger
* `localhost:8080/swagger-ui.html`
* How to use
  * Use sign-in endpoint to get the auth token.
  * Click `Authorize` button in Swagger UI to add auth token.
  * Add `Bearer <auth token>` to the input box.
  * Login and use other endpoints.

 
 #### Feel free to update this.