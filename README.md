# G-LootTest
This is the web application for the assessment project for a job application for G-Loot as a Javascript Developer.

DESCRIPTION:
I have used Vue JS as Javascript Framework to complete the task. The page that I have built consists of mainly two parts. To increase reusability I have seperated them as two Vue components which are "handling listing the player list" and "adding a new player". Listing player component includes one row which has been iterated in a loop. The edit mode is handled by a variable called isEditable which includes a cuid of a player if it is on edit mode; else it has the value of null if it is not in edit mode. So the row template has a condition and changes depending on the value. Due to using components and every row has its own instance, it is possible for a user can edit multiple rows at the same time.

Also the API calls for adding a new player and listing the players from the api are async calls as the assessment requested.

For Style sheeting I have used Bootstrap. I thought there are really good style elements ready to be used and it is not necessary to reinvent the wheel and just use them. :)

IMPORTANT NOTE:
Also in the API that is provided to complete this task; I have fixed which looks like a small bug to me. Everytime when I try to use the API to delete a player I was getting an exception about CORS credentials do not allow me to do a DELETE operation. So I have added a one line of code in the index.js in the API to fix this issue as you can see below.

I have not checked in this code change in GitHub since I thought maybe that is something intended for the testers to find. So just to let you know.. :)

function allowCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // This line of code has been added by me !!!!!!!!!!!!
  next();
}


CONCLUSION:
It was really fun!!!
