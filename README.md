# motorway-task

this is a simple task that makes a call to motorway api and calculates how many times each visitor has visited the office.

## set up

run `npm i` to install everything
run `cp .env.example .env` to create a new env file

## Running the script

to run the script, in terminal run `npm run visitors`
this will out put an object with visitors name and how many times they have visited the office

### How did the test go

I spent a little more time that i would have liked. i had issues with some of the tests, and ended up spending too much time on them. I had issues with mocking the responses and returning "data" key. so im not sure if its because mocking axios will return the data regardless, but in my script i was also returning data. so there was constant confusion in terms of how i implemented it. So as it is the tests are not optimal

I was able to return the results and not returning any weekend results

I noticed that the apis responses would differ alot when making calls, and there was different results when made with postman or the script.
