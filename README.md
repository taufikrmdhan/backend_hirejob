<h1 align="center">Hire Job</h1>

## Description
Hirejobs is an application to find work developed using several technologies including PostgreSQL, Express.js, and Next.js. In this application, users can log in as recruiters and job seekers. The job seeker menu will later display a list of job seeker users along with some information related to their personal data, besides that users can also do CRUD on their own profile page. The recruiter menu will display a list of recruiters along with some of their company data, and recruiters can also do CRUD on their recruiter's profile page.

## Build With

<ul id="user-content-build-with" dir="auto">
  <li><a href="https://www.postgresql.org/" rel="nofollow">postgre SQL (for Database Management System)</a></li>
  <li><a href="https://www.postman.com/" rel="nofollow">Postman for API documentation management</a></li>
  <li><a href="https://www.npmjs.com/" rel="nofollow">NPM for dependency management</a></li>
  <li><a href="https://github.com/motdotla/dotenv">dotenv: for using environment variabels</a></li>
  <li><a href="https://helmetjs.github.io/" rel="nofollow">helmet: for set security HTTP headers</a></li>
  <li><a href="https://www.npmjs.com/package/xss" rel="nofollow">XSS: to sanitize untrusted HTML (to prevent XSS)</a></li>
  <li><a href="https://github.com/expressjs/cors">CORS: Cross-Origin Resourece-Sharing enabled using</a></li>
  <li><a href="https://github.com/kelektiv/node.bcrypt.js">bcrypt: for hashing password</a></li>
  <li><a href="https://eslint.org/" rel="nofollow">ESLINT: for linting and prettier code formatter</a></li>
  <li><a href="https://expressjs.com/" rel="nofollow">ExpressJS: for CRUD management</a></li>
  <li><a href="https://jwt.io/" rel="nofollow">JWT: for generate JSON WEB TOKEN</a></li>
  <li><a href="https://nodejs.org/en/" rel="nofollow">NodeJS</a></li>
  <li><a href="https://github.com/taufikrmdhan/backend_hirejob/blob/main/package.json">and you can see the dependencies used in the package.json</a></li>
</ul>

## Run Project
Install package : npm i

Run Project : npm start

## Project Structure

```
|── Backend
   |── public    # File image from multer
   |── src       # Project source code
       |── config        # config db
       |── controller    # Logic/controller db
       |── helper        # setting env, generateJWT and standard response
       |── middleware    # setting Authentication, jwtAuth, and config multer (delete and upload image)
       |── model         # model / db query
       |── router        # route API
   |── .env            # Setting env backend to connecting   
   |── .gitignore      # File name for not uploaded on github
   |── .README.md      # For Readme In github
```

## Related Project
Frontend web Application.\
[frontend-hirejobApp](https://github.com/taufikrmdhan/hirejob_nextjs)
<br/>
[deploy-hirejobApp](https://hirejob-nextjs.vercel.app/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
