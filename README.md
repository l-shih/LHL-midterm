<h1>Mid-Term Project; Option 7: Food Pick-Up Ordering</h1>
<b>ToC</b>
<ul>
  <li><a href='project_description'>Project Description</a></li>
  <li><a href='stack_requirements'>Stack Requirements</a></li>
  <li><a href='dependencies'>Dependencies</a></li>
  <li><a href='final_product'>Final Product</a></li>
  <li><a href='contributors'>Project Contributors</a></li>
</ul>
<hr>
<h2><a id='project_description'>Project Description</a></h2>
<em><p>
A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.
</p></em>
<hr>
<h2><a id='stack_requirements'>Stack Requirements</a></h2>
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
<hr>
<h2><a id='depenencies'>Dependencies</a></h2>
<ul>
  <li><b><em><code>dotenv</code></em></b> (4.0.0 or above)</li>
  <li><b><em><code>Node</code></em></b> (5.10 or above)</li>
  <li><b><em><code>NPM</code></em></b> (3.8.x or above)</li>
  <li><b><em><code>Express</code></em></b> (4.13.4 or above)</li>
  <li><b><em><code>ejs</code></em></b> (2.4.1 or above)</li>
  <li><b><em><code>body-parser</code></em></b> (1.15.2 or above)</li>
  <li><b><em><code>node-sass-middleware</code></em></b> (0.11.0 or above)</li>
  <li><b><em><code>knex</code></em></b> (0.14.1 or above)</li>s
  <li><b><em><code>knex-logger</code></em></b> (0.1.0 or above)</li>
  <li><b><em><code>morgan</code></em></b> (1.7.0 or above)</li>
  <li><b><em><code>pg</code></em></b> (7.4.0 or above)</li>
  <li><b><em><code>twilio</code></em></b> (3.1.0 or above)</li>
  <li><b><em><code>moment-timezone</code></em></b> (0.5.14 or above)</li>
</ul>
<hr>
<h2><a id='final_product'>Final Product</a></h2>
<h3>Lighthouse Pub</h3>
<blockquote>
  <em><p>
    Feeling hungry? Feeling thirsty? Do you have an insane amount of coding ahead of you, and 
    feel constantly hungry, and can never feel satiated?
    <br><br>
    Then <u>you should come down to <b>Lighthouse Pub</b>!</u>
    <br><br>
    At Lighthouse Pub, we provide a vast <code>array</code> of food options that will keep any
    developer from feeling hungry or thirsty! 
    Take a scrumptious bite into our Bacon King burger, or quench your thirst with a cool Strawberry 
    Banana Smoothie!
    <br>Come for the eats, <code>then</code> proceed to crush some code!
    At Lighthouse Pub, we'll give you all the food & drink you need to get that <code>app</code> done!
    We <code>Promise</code>!
  </p></em>
</blockquote>
<h5><i>Index/Cover Page</i></h5>
<img src='https://github.com/chance-gao/LHL-midterm/blob/readme/imgs/lighthouse_pub_index_page.png'>
<h5><i>Menu Page</i></h5>
<img src='https://github.com/chance-gao/LHL-midterm/blob/readme/imgs/lighthouse_pub_menu_page.png'>
<h5><i>Orders-Review Page</i></h5>
<img src='https://github.com/chance-gao/LHL-midterm/blob/readme/imgs/lighthouse_pub_orders_page.png'>
<hr>
<h2><a id='project_contributors'>Project Contributors</a></h2>
<ol>
  <li><b><em><a href='https://github.com/chance-gao'>Chance GAO</a></em></b>
    <ul>
      <li>Created the <em>menu</em> page and made significant contributions to the 
      functionality of the server back-end</li>
    </ul>
  </li>
  <br>
  <li><b><em><a href='https://github.com/l-shih'>Lilian SHIH</a></em></b>
    <ul>
      <li>Created & styled the <i>cover</i> and <i>error</i> pages and assisted the other 
      contributors in planning and code-implementation</li>
    </ul>
  </li>
  <br>
  <li><b><em><a href='https://github.com/kdubss'>Kang WANG</a></em></b>
    <ul>
      <li>Created the <i>orders-review</i> page and repo <code>README</code>, and 
      assisted the other contributors in planning and code-implementation</li>
    </ul>
  </li>
  <br>
  <li>Everyone contributed equally in project <i>pre-planning</i> and <i>planning</i>, 
  and contributors worked together to effectively implement code and web page functionality</li>
</ol>