<h1>Mid-Term Project; Option 7: Food Pick-Up Ordering</h1>
<hr>
<h2>Project Description</h2>
<em><p>
A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.
</p></em>
<hr>
<h2>Stack Requirements</h2>
<p>The project <em>must</em> use,
<ul>
  <li><b><em>ES6</em></b> for server-side (<code>Node</code>) code</li>
  <li><b><em>ES5</em></b> fof front-end code</li>
  <li><b><code>Node</code></b></li>
  <li><b><em>Express</em></b>
    <ul>
      <li><b><em>RESTful</em></b> routes</li>
      <li>Using <b><code>AJAX</code></b> or complete <b>SPA approach</b> is optional</li>
    </ul>
  </li>
  <li>One of the following two <code>CSS</code> grid and UI frameworks,
    <ul>
      <li><b>Bootstrap 3</b></li>
      <li><b>Zurb Foundation 5</b></li>
    </ul>
  </li>
  <li><b><em><code>jQuery</code></em></b></li>
  <li><b><em><code>SASS</code></em></b> for styling</li>
  <li><b><em>PostgreSQL</em></b> for Database</li>
  <li><b><em>Knex.js</em></b> for querying and migrations</li>
  <li><b><em><code>git</code></em></b> for version control</li>
  <li><b><em>heroku</em></b> for hosting (<i>optional</i>)</li>
</ul>















# Node Skeleton
<h1><u>BEFORE beginning to code for any parts of the project, make sure to <code>pull</code> from the repo <em>first</em>
to make sure all the code is <em>up-to-date</em></u></h1>
## Project Setup

# 1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above