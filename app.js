

/*Creating a new node app. To do that we are requiring an express module. */
const express = require("express");

/**To catch the data from user input we need to install bodyparser module */
const bodyParser = require("body-parser");

// requiring ejs module
const ejs = require("ejs");

//requiring lodash modules. install lodash by using npm i lodash
const lodash = require ("lodash");

const homeStartingContent = "I have started developing this Blog-post Web application on 1st May 2023. My blog posts are following:";

const aboutContent = "As a full stack developer in IT along with the MBA graduation, I want to start my professional career with a reputable organisation. Decent academic background, my loyalty and confidence will be key factors to present myself as the best candidate for the position in the company.";

const contactContent = "Contact me in LinkedIn https://www.linkedin.com/in/md-faysal-shahad-b565b5162 or by email at faysalshahad@hotmail.com";

const composeContent = "This is an example. 'Hello, Good Morning or Good Evening. Today I have done lot of productive work such as' .........";

/**Locating date.js file which is inside the views */
const todayDate = require(__dirname + "/date.js");

/**Locating texttruncate.js file which is inside the views */
const blogTruncate = require(__dirname + "/texttruncate.js");

// consol loggin todays date in two language such as english and bengali.
console.log(todayDate.getDateInEnglishFunction());
console.log(todayDate.getDateInBengaliFunction()); 

//let blogPostsArrayTitle = [];
//const blogPostsArrayBody = [];
let blogPostArray = [];



/* The variable name app is being used because it is the best practice 
to use app as a name to represent express modules or express app.*/
const app = express();

/**Must requirement code to set up ejs. The code is found from 
 https://github.com/mde/ejs/wiki/Using-EJS-with-Express */
app.set('view engine', 'ejs');

/**This is a must necessary code to declare to use the body-parser module to capture user input. */
app.use(bodyParser.urlencoded({extended: true}));

/*This code will help our server to serve static files such as CSS and Images, we need
to use a special function of Express module. That is known as static. Here the public 
is the folder name where our static files like CSS and images will reside.*/
app.use(express.static("public"));


/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/" The forward slash inside
the app.get is representing the home.ejs or home-root. */
app.get("/", function (req, res){

  let displayTodayInEnglish = todayDate.getDateInEnglishFunction();

  let displayTodayInBengali = todayDate.getDateInBengaliFunction();

     /**Consol Logging the array values */
    // console.log("Getting Data from Compose Page " + blogPostArray.map);
     

  /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
 * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
 * Here the home represents home.ejs file inside views folder. homeDefaultDisplayContent is being copied 
 * exactly as same as the variable homeDefaultDisplayContent declared inside home.ejs file. 
 * homeStartingContent is the variable declared above. Here we are creating a response by rendering a file 
 * called home which has to exist inside the views folder and has to have the extension called .ejs. 
 * Then inside the home file we are passing variables with values. */

  res.render("home", {
    homeDefaultDisplayContent: homeStartingContent, 
   /* newlyAddedTitlebyUser: blogPostsArrayTitle,*/
    /* newlyAddedPostbyUser: blogPostsArrayBody , */
     newlyAddedPostbyUser: blogPostArray , 
     homeDisplayDateInEnglish: displayTodayInEnglish, 
     homeDisplayDateInBengali: displayTodayInBengali
    });


});



/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/about" The forward slash inside
the app.get is representing the about.ejs */
app.get("/about", (req, res) =>{

  /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
 * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
 * Here the about represents about.ejs file inside views folder. aboutDefaultDisplayContent is being copied 
 * exactly as same as the variable aboutDefaultDisplayContent declared inside home.ejs file.  is the 
 * variable declared above.
 * Here we are creating a response by rendering a file called about which has to exist inside
 * the views folder and has to have the extension called .ejs. Then inside the about file we
 * are passing variables with values. */

  res.render("about", {aboutDefaultDisplayContent: aboutContent});
});


/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/contact" The forward slash inside
the app.get is representing the contact.ejs */
app.get("/contact", (req, res) =>{

  /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
 * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
 * Here the contact represents contact.ejs file inside views folder. contactDefaultDisplayContent is 
 * being copied exactly as same as the variable contactDefaultDisplayContent declared inside contact.ejs file.  
 * contactCOntent is the variable declared above.
 * Here we are creating a response by rendering a file called contact which has to exist inside
 * the views folder and has to have the extension called .ejs. Then inside the contact file we
 * are passing variables with values. */

  res.render("contact", {contactDefaultDisplayContent: contactContent});
});

/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/compose" The forward slash inside
the app.get is representing the compose.ejs */
app.get("/compose", function (req, res) {

  let displayTodayInEnglish = todayDate.getDateInEnglishFunction();

  let displayTodayInBengali = todayDate.getDateInBengaliFunction();

  /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
 * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
 * Here the contact represents compose.ejs file inside views folder. contactDefaultDisplayContent is 
 * being copied exactly as same as the variable contactDefaultDisplayContent declared inside contact.ejs file.  
 * contactCOntent is the variable declared above.
 * Here we are creating a response by rendering a file called contact which has to exist inside
 * the views folder and has to have the extension called .ejs. Then inside the contact file we
 * are passing variables with values. */

  res.render("compose", {
    composeDefaultDisplayContent: composeContent, 
    composeDisplayDateInEnglish: displayTodayInEnglish, 
    composeDisplayDateInBengali: displayTodayInBengali
  });

});


app.post("/compose", (req, res) =>{

  // Declaring JavaScript Object
   let postfromComposePage = {
     userSubject:  req.body.subjectTextBox,
     useBlogPost: req.body.addNewBlogPostTextArea

  };

//Populating blogpostArray which has been declared at the top
  //blogPostsArrayTitle.push(postfromComposePage.userSubject);
  //blogPostsArrayBody.push(postfromComposePage.useBlogPost);
blogPostArray.push(postfromComposePage);

  // console logging the user input
  console.log("Capturing user input from compose page " + postfromComposePage.userSubject + "\n" +postfromComposePage.useBlogPost);
 // console.log("Capturing user input from compose page " + postfromComposePage.userSubject + "\n" +postfromComposePage.useBlogPost);

  //console.log("Tracking the page or source of the input "+ userSubject);
  //console.log("Capturing user input from compose page "+useBlogPost);

  //redirecting to home page or root route
  res.redirect ("/");
});

/**Retrieving the Blog subject or title from blogPArray. Here post title name is a parameter. */
app.get ("/blogPostArray/:postTitleName", function (req, res) {
  
  /**retrieving the requested title name from the parameter called postTitleName. 
   * lodash function will turn any string into lowercase and will identify gaps or hyphens.
   * it will help to serach very efficiently without having any error.
   */
  const requestedTitleURL =  lodash.lowerCase(req.params.postTitleName);
  console.log("Requested Title URL: " + requestedTitleURL);

  /**checking each item in the blogPost array and arrayItem is the parameter.*/
  blogPostArray.forEach(function (arrayItem) {
    
    /**retrieving the blog subject or title from blogpost array.
     * lodash function will turn any string into lowercase and will identify gaps or hyphens.
   * it will help to serach very efficiently without having any error.
    */
    const arrayTitleLodash  = lodash.lowerCase(arrayItem.userSubject);

    // getting just the blog post subject or title.
    const arrayTitle = arrayItem.userSubject;

    // getting just the blog post body or contents
    const arrayContent = arrayItem.useBlogPost; 

    // checking if these two variables matches or not
    if (arrayTitleLodash === requestedTitleURL) {

      // if match is found and redirect to post page and display the blog content
res.render("post", {

  blogTitle: arrayTitle,
  blogContent: arrayContent

});
    }

  });

});

/*After this code we have literally just built our very first own server
this is the barebone of any express server.the callback function will give 
us feedback to verify whether the server is running or not. 
also process.env.port has been written when we upload our files to an external server
then this code will help our file to identify and use the available any random port 
on that particular external server company.*/

app.listen(3000, function() {
  console.log("Server started on port 3000. This is a test message.");
});
