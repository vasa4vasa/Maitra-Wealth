const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Pusher = require('pusher');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const session = require('express-session');
const uuid = require('uuid');
const twilio=require('twilio');
const axios = require('axios');
const store = new session.MemoryStore();

const accountSid = 'ACb6fd8704686c5f456120cb05e66d44cb';
const authToken = '4aa165c702e17714c238136cf2f03ba0';
const twilioPhone = '+12513068149';
const client = twilio(accountSid, authToken);


const server = express();
server.use(bodyParser.json());
server.use(cors());

const ONESIGNAL_APP_ID = '256cfce6-82e6-4810-9300-b421cf4ed03b';
const ONESIGNAL_API_KEY = 'ZmJkMDNiODgtNTI4OC00NGExLTkwYmUtZTRhZGY5OWU5NjAy';

const playerId = 'bcb0558e-635c-42b3-b6c2-e335999499f7'; // Replace with the actual OneSignal player ID

//Establish the database connection
server.use(session({
  secret: '58399561-94a0-4b90-b3a7-182483fd1c17', // Your secret key
  resave: false,
  saveUninitialized: true,
  store,
  cookie: {
    sameSite: true,
    secure: false,
    expires: false
  }
}));

//Establish the database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_db",
});


db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  server.listen(8888,function check(error) {
    if (error) 
    {
    console.log("Error....!!!!");
    }
    else 
    {
        console.log("Started....!!!! 8888");
    }
});
// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  const UserEmail = req.headers['useremail'];
  console.log('Received UserEmail:', UserEmail);
  console.log('Received Token:', token);

  if (!token || !UserEmail) {
    return res.status(400).send('Bad Request: Token or UserEmail is missing in request headers');
  }

  // Fetch the token from the database based on the user's email
  db.query('SELECT Token FROM login_activity WHERE UserEmail = ? ORDER BY TimeStamp DESC LIMIT 1', [UserEmail], (err, results) => {
    if (err) {
      console.error('Error retrieving token from database:', err);
      return res.status(500).send('Error retrieving token');
    }

    const storedToken = results[0]?.Token;

    if (!storedToken) {
      console.log('Token not found for UserEmail:', UserEmail);
      return res.status(401).send('Unauthorized: Token not found');
    }

    // Compare the stored token with the token provided in the request headers
    if (storedToken !== token) {
      console.log('Token mismatch');
      return res.status(401).send('Unauthorized: Invalid token');
    }

    // Fetch SecretKey from the database based on the user's email
    db.query('SELECT SecretKey FROM admin WHERE UserEmail = ?', [UserEmail], (err, results) => {
      if (err) {
        console.error('Error retrieving SecretKey:', err);
        return res.status(500).send('Error retrieving SecretKey');
      }

      const SecretKey = results[0]?.SecretKey;

      if (!SecretKey) {
        console.log('SecretKey not found for UserEmail:', UserEmail);
        return res.status(401).send('Unauthorized: Invalid SecretKey');
      }

      console.log('Retrieved UserEmail:', UserEmail);
      console.log('Retrieved SecretKey:', SecretKey);

      jwt.verify(token, SecretKey, (err, decoded) => {
        if (err) {
          // Send a specific response indicating that the token is invalid
          return res.status(401).send('Unauthorized: Invalid token');
        } else {
          // Token is valid, proceed to the next middleware
          req.user = decoded;
          console.log('Token verified successfully. Decoded user:', req.user);
          next();
        }
      });
    });
  });
};







const router = express.Router();


module.exports = router;

server.post('/api/login', (req, res) => { 
  const { UserEmail, Password} = req.body;

  db.query('SELECT * FROM admin WHERE UserEmail = ?', [UserEmail], async(err, results) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send('Error during login');
      }
      if (results.length === 0) {
          return res.status(401).send('Invalid username');
      }
      
      const user = results[0];
      const storedPasswordHash = user.Password;
      const md5Hash = crypto.createHash('md5').update(Password).digest('hex');

      if (md5Hash === storedPasswordHash) {
          // Check if the user already has a SecretKey
          if (!user.SecretKey) {
              const SecretKey = uuid.v4();
              
              // Update the SecretKey in the database
              db.query('UPDATE admin SET SecretKey = ? WHERE UserEmail = ?', [SecretKey, UserEmail], (updateError) => {
                  if (updateError) {
                      console.error('Error updating SecretKey:', updateError);
                      return res.status(500).send('Error updating SecretKey');
                  }
                  
                  const token = jwt.sign({ UserEmail: req.body.UserEmail }, SecretKey, { expiresIn: '30m' });
                  const loginActivity = {
                      UserEmail: UserEmail,
                      Token: token,
                      TimeStamp: new Date()
                  };
                  
                  db.query('INSERT INTO login_activity SET ?', loginActivity, (error, result) => {
                      if (error) {
                          console.error('Error inserting login activity:', error);
                          res.status(500).json({ message: 'Internal server error' });
                          return;
                      }
                      console.log('Login activity inserted successfully:', result);
                  });
                  
                  req.session.user = {
                      UserEmail: UserEmail,
                      Token: token
                  };
                  console.log('Session data after login:', req.session.user);
                  res.json({ token });
              });
          } else {
              // User already has a SecretKey, proceed with login
              const SecretKey = user.SecretKey;
              console.log("sceret Key", SecretKey);
              const token = jwt.sign({ UserEmail: req.body.UserEmail }, SecretKey, { expiresIn: '30m' });
              const loginActivity = {
                  UserEmail: UserEmail,
                  Token: token,
                  TimeStamp: new Date()
              };
              
              db.query('INSERT INTO login_activity SET ?', loginActivity, (error, result) => {
                  if (error) {
                      console.error('Error inserting login activity:', error);
                      res.status(500).json({ message: 'Internal server error' });
                      return;
                  }
                  console.log('Login activity inserted successfully:', result);
              });
              
              req.session.user = {
                UserEmail: UserEmail,
                Token: token
            };
            req.session.save((err) => {
                if (err) {
                    console.error('Error saving session:', err);
                    return res.status(500).send('Error saving session');
                }
                console.log('Session data saved successfully after login:', req.session.user);
                const UserEmail = req.session.user.UserEmail;
                console.log('Session data saved successfully after login:', UserEmail);
                res.json({ token });
            });
          }
      } else {
          res.status(401).send('Invalid username or password');
      }
  });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
      user: 'bamboo52698@gmail.com',
      pass: 'mlev ecjb sygl tnzq'
  }
});

const otpMap = new Map();

function generateOTP(){
  return otpGenerator.generate(6, {upperCase: false, specialChars: false});
}



server.post('/api/forgot-password', (req,res) => {

  const {email} = req.body;
  db.query('SELECT * FROM admin WHERE UserEmail = ?', [email], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error occurred while checking email' });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'Email not found' });
      }

      const otp = generateOTP();
      otpMap.set( email, otp );

      const mailOptions = {
          from: 'bamboo52698@gmail.com',
          to: email,
          subject: 'Password Reset OTP',
          text: `Your OTP is: ${otp}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if(error){
              console.log(error);
              res.status(500).json({ message: 'Failed to send OTP' });
          }else {
          console.log('Email sent: ' + info.response);
              otpMap.set(email, otp);
              res.status(200).json({ message: 'OTP sent successfully' });
          }
      });
  });
});

server.post('/api/verify-otp', (req,res) => {
  const {email,otp}=req.body;
  const storedOTP = otpMap.get(email);

  if(otp === storedOTP){
      otpMap.set(email, { verified: true });
      res.status(200).json({ message: 'OTP verified successfully' });
  }else{
      res.status(400).json({ message: 'Invalid OTP' });
  }
});

server.post('/api/reset-password', (req,res) => {
  const {email, new_password } = req.body;
  const otpData = otpMap.get(email);

  if(!otpData || !otpData.verified){
      return res.status(403).json({message: 'OTP verfication required before reset password'})
  }
  
  const md5Hash = crypto.createHash('md5').update(new_password).digest('hex');

  console.log('Resetting password for email:', email);
  console.log('New password MD5 hash:', md5Hash);

  db.query('UPDATE admin SET Password =? WHERE UserEmail =?', [md5Hash, email], (error, results) =>{
      if(error){
          console.error(error);
          res.status(500).json({ message: 'Failed to reset password'});
      }else{
          res.status(200).json({ message: 'Password reset succesfully'})
          otpMap.delete(email);
      }
  });
});

server.get("/api/allusers/", (req, res) => {
    var sql = "SELECT * FROM users";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  server.get("/api/alluserscount/", (req, res) => {
    var sql = "SELECT count(*) FROM users";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });



  // Today Downloads
server.get("/api/todaydownusers/", (req, res) => {
  var sql = "SELECT * FROM users WHERE DATE(AppInstalledDate) =curdate();";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});




  server.get("/api/todaysubscribedusers/", (req, res) => {
    var sql = "select * from users where date(AppInstalledDate) = curdate()";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  server.get("/api/todaysubscribeduserscount/", (req, res) => {
    var sql = "select count(*) from users where date(AppInstalledDate) = curdate()";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  

  
server.get("/api/totalsubscribers/", (req, res) => {
  var sql = "select * from users where IsSubscribedUser like 1";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

  
server.get("/api/totalsubscriberscount/", (req, res) => {
  var sql = "select count(*) from users where IsSubscribedUser like 1";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/totalsubscriberscount/", (req, res) => {
  var sql = "select count(*) from users where IsSubscribedUser like 1";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});



server.get("/api/todayexpiredusers/", (req, res) => {
  var sql = "select * from users where date(AppExipiredDate) = curdate()";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/todayexpireduserscount/", (req, res) => {
  var sql = "select count(*) from users where date(AppExipiredDate) = curdate()";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

 


 
server.get("/api/totalexpireduserscount/", (req, res) => {
  var sql = "select count(*) from users where IsSubscribedUser not like 1";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});



  
server.get("/api/todayexpireduser/", (req, res) => {
  var sql = "SELECT * FROM users where date(AppExipiredDate) =  curdate();";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});




server.get("/api/totalexpiredusers/", (req, res) => {
  var sql = "select * from users where IsSubscribedUser not like 1";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

  


  server.put("/api/user/update/:ID",verifyToken, (req, res) => {

    let sql =
      "UPDATE users SET UserName ='" +
      req.body.UserName +
      "', UserEmail ='" +
      req.body.UserEmail +
      "',UserMobileNo='" +
      req.body.UserMobileNo +
      "',LastUpdatedDate='" +
      req.body.LastUpdatedDate +
      "',AppInstalledDate='" +
      req.body.AppInstalledDate +
      "',AppExipiredDate='" +
      req.body.AppExipiredDate +
      "'  WHERE ID=" +
      req.params.ID;
    
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Users details are not updated" });
      } else {
        res.send({ status: true, message: "Users details are updated" });
      }
    });
  });


  
   //Delete the Records
   server.delete("/api/user/delete/:ID",verifyToken,(req, res) => {
    
    const UserEmail = req.session;
    console.log('Session data:', UserEmail);
    let sql = "DELETE FROM users WHERE ID=" + req.params.ID + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "User Deleted Failed" });
      } else {
        res.send({ status: true, message: "User Deleted successfully" });
      }
    });
  });

  server.post("/api/user/add/",verifyToken,(req, res) => {
    console.log('Session data:', req.session.user);

    const { Name, Email, MobileNumber,createdDate,Expiredate } = req.body;

    // Validate that required fields are provided
    if (!Name || !Email || !MobileNumber) {
        res.status(400).send({ status: false, message: "Incomplete user data provided" });
        return;
    }

    // Check if the email or mobile number already exists in the database
    let checkDuplicateSql = "SELECT * FROM users WHERE UserEmail = ? OR UserMobileNo = ?";
    db.query(checkDuplicateSql, [Email, MobileNumber], (duplicateError, duplicateResults) => {
        if (duplicateError) {
            res.status(500).send({ status: false, message: "Error checking duplicate records" });
            return;
        }

        if (duplicateResults.length > 0) {
            res.send({ status: false, message: "User with the provided email or mobile number already exists" });
            return;
        }

    let details = {
      UserName: req.body.Name,
      UserEmail: req.body.Email,
      UserMobileNo: req.body.MobileNumber,
      AppInstalledDate: req.body.createdDate,
      createdBy : "1",
      AppExipiredDate : req.body.Expiredate,
      createdDate : req.body.createdDate
    };
    let sql = "INSERT INTO users SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "User creation failed" });
      } else {
        res.send({ status: true, message: "User created successfully" });
      }
    });
  });
});




  // message page code

  

  server.post("/api/message/add/",verifyToken, (req, res) => {
    const { content, notificationType, notificationStyle } = req.body;
    let details = {
      content,
      date: req.body.date,
      id:req.body.id
    };
    
    let sql = "INSERT INTO updates SET ?";
    db.query(sql, details, (error,results) => { 
         if (error) {
            console.error('Error inserting message:', error);
            return res.status(400).send({ status: false, message: 'Error inserting message' });
         }
         
         // Logic to handle different notification types
         if (notificationType === 'sms') {
             sendSms(content);
         }else if (notificationType === 'both'){
            sendSms(content);
            if (notificationStyle === 'glance') {
                sendGlanceNotification(content);
            } else if (notificationStyle === 'original') {
                sendOriginalNotification(content);
            }
         }
          else if (notificationType === 'notification') {
             if (notificationStyle === 'glance') {
                 sendGlanceNotification(content);
             } else if (notificationStyle === 'original') {
                 sendOriginalNotification(content);
             }
         } else {
             return res.status(400).send({ status: false, message: "Invalid notification type or style" });
         }
         
         res.status(200).send({ status: true, message: "Message added successfully" });
    });
});

// Function to send notification
function sendOriginalNotification(content) {
    const notification = {
      app_id: ONESIGNAL_APP_ID,
      headings: { en: 'You have received a notification' },
      contents: { en: content },
      include_player_ids: [playerId]
    };
  
    console.log('Sending notification to player ID:', playerId);
  
    axios.post('https://onesignal.com/api/v1/notifications', notification, {
      headers: {
        'Authorization': `Basic ${ONESIGNAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Notification sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending notification:', error);
      });
}
  
function sendGlanceNotification(content) {
    const notification = {
      app_id: ONESIGNAL_APP_ID,
      headings: { en: 'You have received a notification' },
      contents: { en: '....' },
      include_player_ids: [playerId]
    };
  
    console.log('Sending notification to player ID:', playerId);
  
    axios.post('https://onesignal.com/api/v1/notifications', notification, {
      headers: {
        'Authorization': `Basic ${ONESIGNAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Notification sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending notification:', error);
      });
}
  
function sendSms(content) {
    const messageBody = `You have received a new message: ${content}`;
  
    let sql = "SELECT mobileno FROM sms";
    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error fetching mobile numbers:", error);
        return;
      }
  
      // Iterate over the results and send SMS to each mobile number
      results.forEach(row => {
        const mobileno = row.mobileno;
  
        client.messages
          .create({
            body: messageBody,
            from: twilioPhone,
            to: mobileno
          })
          .then(message => {
            console.log(`SMS sent successfully to ${mobileno}:`, message.sid);
          })
          .catch(error => {
            console.error(`Error sending SMS to ${mobileno}:`, error);
          });
      });
    });
}

  
  
  server.get("/api/message/", (req, res) => {
    let sql = "SELECT * FROM updates;" // Typo: should be "message_tb"
    db.query(sql, function (error, result) {
  
      if (error) {
        console.log("Error Connecting to DB", error);
        res.status(500).send({ status: false, message: "Error connecting to DB" });
      } else {
        res.send({ status: true, data: result });
      }
    });
    
  });
  
  server.put("/api/message/update/:id",verifyToken, (req, res) => {
    let sql =
      "UPDATE updates SET content ='" +
      req.body.content +
      "'  WHERE id=" +
      req.params.id;
  
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Users details are not updated" });
      } else {
        res.send({ status: true, message: "Users details are updated" });
      }
    });
  });
  
  server.delete("/api/message/delete/:content", verifyToken, (req, res) => {
    let sql = "DELETE FROM updates WHERE content=?";
    db.query(sql, [req.params.content], (error) => {
      if (error) {
        res.send({ status: false, message: "Message Deletion Failed" });
      } else {
        res.send({ status: true, message: "Message Deleted successfully" });
      }
    });
  });
  


  
// Define your route handler

server.get("/api/levels", (req, res) => {
  var sql = "SELECT * FROM levels;";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});



server.get('/api/levels/edit/:sn', (req, res) => {
  const sn = req.params.sn; // Extract SN from request parameters
  const sql = "SELECT * FROM commoditiespoint WHERE commodities = ?"; // Parameterized query
  db.query(sql, [sn], function (error, result) {
    if (error) {
      console.log("Error Connecting to DB:", error);
      res.status(500).send({ status: false, error: "Error connecting to database" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/commodities", (req, res) => {
  var sql = "SELECT COMMODITIES FROM commoditiespoint where COMMODITIES not in (select SN from levels);";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
}); 

server.get('/api/commod/:SN', (req, res) => {
  const sn = req.params.SN;
  const sql =  "SELECT * FROM commoditiespoint WHERE COMMODITIES like ?";

  db.query(sql, [`%${sn}%`], function (error, result) {
    if (error) {
      console.error("Error:", error);
      res.send({ status: false, message: "Error fetching data" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});



server.post("/api/levels/add/",verifyToken,(req, res) => {
  let details = {
    TV: req.body.TV,  
    SN: req.body.SN,
    MN: req.body.MN,
    R1: req.body.R1,
    R2: req.body.R2,
    R3: req.body.R3,
    S1: req.body.S1,
    S2: req.body.S2,
    S3: req.body.S3,
    created_on : req.body.created_on,
    created_by : req.body.created_by
    // Add other fields if necessary
  };
  let sql = "INSERT INTO levels SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Levels creation failed" });
    } else {
      res.send({ status: true, message: "Levels created successfully" });
    }
  });
});



server.delete("/api/levels/delete/:ID",verifyToken,(req, res) => {
  let sql = "DELETE FROM levels WHERE ID=" + req.params.ID + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Deletion Failed" });
    } else {
      res.send({ status: true, message: "Deleted successfully" });
    }
  });
});



server.put("/api/levels/update/:SN",verifyToken, (req, res) => {
  let sql =
    "UPDATE levels SET TV=?, SN = ?, MN = ?, R1 = ?, R2 = ?, R3 = ?, S1 = ?, S2 = ?, S3 = ?, updated_on = ? WHERE SN = ?";
  
  let values = [
    req.body.TV,
    req.body.SN,
    req.body.MN,
    req.body.R1,
    req.body.R2,
    req.body.R3,
    req.body.S1,
    req.body.S2,
    req.body.S3,
    req.body.updated_on,
    req.params.SN
  ];

  let a = db.query(sql, values, (error, result) => {
    if (error) {
      res.status(500).send({ status: false, message: "levels details are not updated" });
    } else {
      res.status(200).send({ status: true, message: "levels details are updated" });
    }
  });
});



//Tips or Calls

//Tips or Calls

server.get("/api/calls", (req, res) => {
  var sql = "SELECT * FROM calls;";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


server.delete("/api/calls/delete/:id",verifyToken, (req, res) => {
  let sql = "DELETE FROM calls WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Deletion Failed" });
    } else {
      res.send({ status: true, message: "Deleted successfully" });
    }
  });
});

server.post("/api/calls/add/",verifyToken, (req, res) => {
  let mysql = {
    "created_on" : req.body.createdon,
    "call_type" : req.body.calltype,
    "type" : req.body.type,
    "commodity" : req.body.com,
    "additional_commodity_string" : req.body.add_word,
    "expiry_date" : req.body.expirydate,
    "price_type" : req.body.pricetype,
    "at_price" : req.body.atprice,
    "target1" : req.body.target1,
    "target2" : req.body.target2,
    "target3" : req.body.target3,
    "stop_loss" : req.body.stoploss,
    "last_sms" : req.body.lastsms
    // Add other fields if necessary
  };
  let sql = "INSERT INTO calls SET ?";
  db.query(sql, mysql, (error) => {
    if (error) {
      res.send({ status: false, message: "calls failed" });
    } else {
      res.send({ status: true, message: "calls created successfully" });
    }
  });
});


server.get("/api/commoditie", (req, res) => {
  var sql = "SELECT name,id FROM commodities where id;";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
}); 

server.put("/api/calls/update/:id",verifyToken, (req, res) => {
  let sql =
    "UPDATE calls SET created_on ='" +
    req.body.createdon +
    "', call_type ='" +
    req.body.calltype +
    "',type ='" +
    req.body.type +
    "',commodity='" +
    req.body.com +
    "', expiry_date ='" +
    req.body.expirydate +
    "', price_type ='" +
    req.body.pricetype +
    "', at_price ='" +
    req.body.atprice +
    "', target1 ='" +
    req.body.target1 +
    "', target2 ='" +
    req.body.target2 +
    "', target3 ='" +
    req.body.target3 +
    "', stop_loss ='" +
    req.body.stoploss +
    "', last_sms ='" +
    req.body.lastsms +
    "'  WHERE id = " +
    req.params.id;
  
  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Edit calls details are not updated" });
    } else {
      res.send({ status: true, message: "Edit Calls details are updated" });
    }
  });
});

server.put("/api/calls/follows/:id",verifyToken, (req, res) => {
  let sql =
    "UPDATE calls SET created_on ='" +
    req.body.createdon +
    "', updated_on ='" +
    req.body.updatedon + 
    "', last_sms ='" +
    req.body.lastsms +
    "', follow_up ='" +
    req.body.follow +
    "', target1_achieved ='" +
    req.body.target1_achieved + 
    "', target2_achieved ='" +
    req.body.target2_achieved + 
    "', target3_achieved ='" +
    req.body.target3_achieved + 
    "', profit_loss ='" +
    req.body.returns +
    "'  WHERE id = " +
    req.params.id;
  
  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Follow calls details are not updated" });
    } else {
      res.send({ status: true, message: "Follow Calls details are updated" });
    }
  });
});



server.get("/api/comvalue/:commodityId", (req, res) => {
  var sql = "SELECT c.id AS id, c.name AS name,cp.R1 , cp.R2, cp.R3, cp.T1,cp.T2,cp.T3,cp.SL FROM commodities c JOIN commoditiespoint cp ON c.id = cp.Commodities_ID;";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
}); 
