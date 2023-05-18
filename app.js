

/*Creating a new node app. To do that we are requiring an express module. */
const express = require("express");

//requiring mongoose modules
const mongoose = require ("mongoose");

/**To catch the data from user input we need to install bodyparser module */
const bodyParser = require("body-parser");

// requiring ejs module
const ejs = require("ejs");

/*Requiring a https module. It is a native module inside node.js. Therefore it does not require external
installation process. */
const https = require ("https");

//requiring lodash modules. install lodash by using npm i lodash
const lodash = require ("lodash");

const { log, Console, error } = require("console");

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
//let blogPostArray = [];



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

// connection URL to mongoDB Atlas Cloud Server database where blogpoststDB is the database name
//mongoose.connect("mongodb+srv://faysalshahad:F008801716500376@faysalshahad.nbqqn3d.mongodb.net/blogpostDB", {useNewUrlParser:true, useUnifiedTopology:true});
//mongoose.connect("mongodb+srv://faysalshahad:F008801716500376@faysalshahad.nbqqn3d.mongodb.net/blogpostDB", {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connect("mongodb+srv://faysalshahad:F008801716500376@faysalshahad.nbqqn3d.mongodb.net/blogpostDB", {useNewUrlParser:true, useUnifiedTopology:true});

// connection URL to mongoose database locally where blogpostDB is the database name
//mongoose.connect("mongodb://127.0.0.1:27017/blogpostDB", {useNewUrlParser:true, useUnifiedTopology:true});


//creating itemschema for blogstDB database
const postschema = new mongoose.Schema ({ // postschema start

  blogTitle:

   { 
      //creating javascript object
      type: String,
      //making this taskName field mandatory for the user by using required validator
      required: [true, "Please check the input entry as no blog title has been entered"]
  },

  blogContent:

  {

     //creating javascript object
     type: String,
     //making this taskName field mandatory for the user by using required validator
     required: [true, "Please check the input entry as no blog content has been entered"]

  }
  

}); // postschema end

/**creating mongoose model. Here Post is the name of our collection for blogpostDB database.
 * Mongoose requires always use singluar form. Such as instead of calling it Posts we are simply 
 * calling it Post which a singluar form. Mongoose will cleverly convert this singular form
 * into a plural form when creating the collection. 
 * by following this procedure we have created a new collection called Posts and the Post
 * have to stick to the structure we have specified in the postschema. After following this rule
 * we are ready to create new documents for Post collection.*/ 
const Post = mongoose.model("Post", postschema);

/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/" The forward slash inside
the app.get is representing the home.ejs or home-root. */
app.get("/", function (req, res){

  let displayTodayInEnglish = todayDate.getDateInEnglishFunction();

  let displayTodayInBengali = todayDate.getDateInBengaliFunction();


   /**Reading the data from Mongodb Database from collections tasks by using Task.find({})*/
    
   Post.find({}).then((homePostContent)=> {


    res.render("home", {
      homeDefaultDisplayContent: homeStartingContent, 
     /* newlyAddedTitlebyUser: blogPostsArrayTitle,*/
      /* newlyAddedPostbyUser: blogPostsArrayBody , */
       newlyAddedPostbyUser: homePostContent , 
       homeDisplayDateInEnglish: displayTodayInEnglish, 
       homeDisplayDateInBengali: displayTodayInBengali
      });
    // /**Checking if the tasks collection inside mongoDB database is empty or not. If empty 
    //  * then the following code will execute inside if statement.
    //  */
    //         if (homePostContent.length === 0) {
    
    //     /**Inserting Multiple documents at the same time inside Task collection in todolistDB*/
    
    //             Task.insertMany(listOfNewlyAddedItemsArray).then(()=> {
    //     console.log("Used insertmany method to insert the default values.") // Giving feedback if the code above is susccessful
    // }).catch((error)=>{ // checking for an error
    //     console.log("There is an Error while inserting new task " + error)}); 
                
    //     res.redirect("/"); // redirecting routes to the root page or main page
    
    //         }      
    
    //  /**If the Task collection is not empty then the following code will get executed inside else statement */
    //         else{
    
    //                /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
    //  * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
    //  * Here the list represents list.js file inside views folder. listTitle is being copied 
    //  * exactly as same as the variable listTitle declared inside list.ejs file. day is the 
    //  * variable declared above.
    //  * Here we are creating a response by rendering a file called list which has to exist inside
    //  * the views folder and has to have the extension called .ejs. Then inside the list file we
    //  * are passing in a single variable that has the name whatDayIsToday and the value we are giving
    //  * it is the value of our variable called dayInEnglish.
    //  * newlyAddedItembyUser has been collected from list.ejs and listOfNewlyAddedItems variable has been
    //  * defined on the top section.*/
    
    //             res.render("list", {
    //                 listTitle: "Start",
    //              newlyAddedItembyUser: tasks, 
    //              listDisplayDateInEnglish: displayTodayInEnglish, 
    //              listDisplayDateInBengali: displayTodayInBengali
    //             });
    
    //         }
            
           
    /**Logging the array value inside the console */
            //console.log("Documents inside tasks collection are " + tasks)
        }).catch(function(error){ // cathing an error if there is any
                console.log("There is an Error while retrieving the post content " + error)}); 

     /**Consol Logging the array values */
    // console.log("Getting Data from Compose Page " + blogPostArray.map);
     

  /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
 * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
 * Here the home represents home.ejs file inside views folder. homeDefaultDisplayContent is being copied 
 * exactly as same as the variable homeDefaultDisplayContent declared inside home.ejs file. 
 * homeStartingContent is the variable declared above. Here we are creating a response by rendering a file 
 * called home which has to exist inside the views folder and has to have the extension called .ejs. 
 * Then inside the home file we are passing variables with values. */

  // res.render("home", {
  //   homeDefaultDisplayContent: homeStartingContent, 
  //  /* newlyAddedTitlebyUser: blogPostsArrayTitle,*/
  //   /* newlyAddedPostbyUser: blogPostsArrayBody , */
  //    newlyAddedPostbyUser: blogPostArray , 
  //    homeDisplayDateInEnglish: displayTodayInEnglish, 
  //    homeDisplayDateInBengali: displayTodayInBengali
  //   });


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

  /**Declaring variables to capture user input from the compose page */
  const userSubject=  req.body.subjectTextBox;
     const userBlogContent= req.body.addNewBlogPostTextArea;

     console.log("From Compose Page User Subject " +userSubject + " and User Blog Content " +userBlogContent);

     /**Creating new blog Post Document inside Post collection in database blogpostDB  */

     const blogPostDocument = new Post ({
blogTitle: userSubject,
blogContent: userBlogContent

     });

     blogPostDocument.save().then(()=>{
      res.redirect ("/");
     }).catch(function(error){ // cathing an error if there is any
      console.log("There is an Error while saving the blog post into the blogpostDB database " + error)});

  /* Declaring JavaScript Object
   let postfromComposePage = {
     userSubject:  req.body.subjectTextBox,
     useBlogPost: req.body.addNewBlogPostTextArea

  };
  */

//Populating blogpostArray which has been declared at the top
  //blogPostsArrayTitle.push(postfromComposePage.userSubject);
  //blogPostsArrayBody.push(postfromComposePage.useBlogPost);
//blogPostArray.push(postfromComposePage);

  // console logging the user input
  //console.log("Capturing user input from compose page " + postfromComposePage.userSubject + "\n" +postfromComposePage.useBlogPost);
 // console.log("Capturing user input from compose page " + postfromComposePage.userSubject + "\n" +postfromComposePage.useBlogPost);

  //console.log("Tracking the page or source of the input "+ userSubject);
  //console.log("Capturing user input from compose page "+useBlogPost);

  //redirecting to home page or root route
  //res.redirect ("/");
});


/**Retrieving the post title ID from or title from posts collection inside database called blogpostDB
 * . Here posttitleID is a parameter. */
app.get ("/posts/:postTitleID", function (req, res) { // app.get ("/posts/:postTitleID", function (req, res) start
  
  /**retrieving the requested title ID from the parameter called postTitle ID. */
   
  const requestedTitleURLID =  req.params.postTitleID;

  // logging the value inisde command prompt
  console.log("Requested Title URL: " + requestedTitleURLID);

/**Reading a partiular document from the collection posts inside mongodb database called blogpostDB
 *  by using findOne method */
    
  Post.findOne({_id: requestedTitleURLID}).then((blogPostContentRequested)=>{

    /**retriving the blog title anf blog content from that particular document. */
    const titleRequested = blogPostContentRequested.blogTitle;

    const contentRequested = blogPostContentRequested.blogContent;

    //rendering to the post page and displaying the desired content
res.render("post", {

  blogTitle: titleRequested,
  blogContent: contentRequested

});
  }).catch((error)=>{ // checking for an error
    console.log("There is an Error while retrieiving Post ID " + error)}); 
    
  //   function(err, post){
  //   res.render("post", {
  //     title: post.title,
  //     content: post.content
  //   });
  // });

  /**checking each item in the blogPost array and arrayItem is the parameter.*/
  //blogPostArray.forEach(function (arrayItem) {
    
    /**retrieving the blog subject or title from blogpost array.
     * lodash function will turn any string into lowercase and will identify gaps or hyphens.
   * it will help to serach very efficiently without having any error.
    */
   // const arrayTitleLodash  = lodash.lowerCase(arrayItem.userSubject);

    // getting just the blog post subject or title.
    //const arrayTitle = arrayItem.userSubject;

    // getting just the blog post body or contents
    //const arrayContent = arrayItem.useBlogPost; 

    // checking if these two variables matches or not
   // if (arrayTitleLodash === requestedTitleURL) {

      // if match is found and redirect to post page and display the blog content
//res.render("post", {

  //blogTitle: arrayTitle,
 // blogContent: arrayContent

//});
    //}

  //});


}); // app.get ("/posts/:postTitleID", function (req, res) finish

/*After this code we have literally just built our very first own server
this is the barebone of any express server.the callback function will give 
us feedback to verify whether the server is running or not. 
also process.env.port has been written when we upload our files to an external server
then this code will help our file to identify and use the available any random port 
on that particular external server company.*/

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000 locally on getting a dynamic port from Heroku server. This is a test message.");
});
