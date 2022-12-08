<h1 align="center">Hire Job</h1>

## Description
Hirejobs is an application to find work developed using several technologies including PostgreSQL, Express.js, and Next.js. In this application, users can log in as recruiters and job seekers. The job seeker menu will later display a list of job seeker users along with some information related to their personal data, besides that users can also do CRUD on their own profile page. The recruiter menu will display a list of recruiters along with some of their company data, and recruiters can also do CRUD on their recruiter's profile page.

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
[deploy-hirejobApp](https://hirejob-nine.vercel.app/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
