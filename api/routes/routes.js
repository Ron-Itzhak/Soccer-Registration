const { request, response } = require('express');
var express = require('express');
var router = express.Router();
const singUpTemplateCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt')
/* signup page. */

//ron installs
const Joi = require ('joi');
var bodyParser = require('body-parser')


//const complexityOptions = {
   // min: 5,
   // max: 20
    //lowerCase: 1,
    //upperCase: 1,
    //numeric: 1,
    //symbol: 1,
    //requirementCount: 4,
    //password: passwordComplexity(complexityOptions),

 // };
  
router.post('/signup',async (request,response)=> {
    const saltPassword = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(request.body.password,saltPassword)

    const schema = Joi.object({
        fullName: Joi.string().regex(/^[a-zA-Z, ]+$/).min(6).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
 
    });

    try {
    const result = await schema.validateAsync(request.body);
    }
    catch (error) {console.log(error);
        //res.status(401).json({ error: 'Unauthorized' });
       // return;
 

        return response.status(400).send(error.details[0].message).end(error);
        
        // original message working :return response.status(400).send(error.details[0].message).end(error);

    //response.status(400);
    //return response.json(`Error in User Data : ${error.message}`);
    //TODO correct this on the frontend
    }

    //email lowercase check if already exist
    var email_req = request.body.email;
    email_req = email_req.toLowerCase();

    singUpTemplateCopy.findOne({ email: email_req }, function (err, existingUser) {
        if (err){
            console.log(err)
        }
        if (existingUser==null){
            const signedUpUser = new singUpTemplateCopy({
                fullName:request.body.fullName,
                email:email_req,
                password:securedPassword 
            })
        
            //save to dataBase
            signedUpUser.save()
            .then(data=>{response.json(data)})
            .catch(error=>{response.json(error)})
            
            
            }
        else{
            response.status(200).send('Account already exist with this email').end();
            //handle that in the fronthand
            //console.log("Result : ", docs);
            
        }
    });


    // try {
    // const existUser = await singUpTemplateCopy.findOne({ email: email_req});
    // if (existUser) {
    //     console.log('Error: Account already exist');
    //     response.end({success:false,
    //         message: 'Error: Account already exist with this email'});
    //   }
    // }
    // catch (error) {
    //     res.status(error.response.status)
    // }

    
   
   


    // singUpTemplateCopy.find({
    //     email:email_req

    // },(err,previousUsers)=>{
    //     if(err){response.end('Error: server error')
    //     }
    //     else if(previousUsers>0){response.end('Error: Account already exist')
    //     }

        
    
    // });



});



router.post('/login',(request,response)=> {
    console.log('request body test:'+ request.body.email)
    if(request.body.email){
    var email_req = request.body.email;
        email_req = email_req.toLowerCase();
    }

    singUpTemplateCopy.findOne({ email: email_req}, function (err, existingUser) {
        if (err){
            console.log(err);
            return res.status(500).send('Error on the server.');
        }
        if (existingUser==null){
            response.status(404).send('There is no account with this emails');
            }
        else{
            var passwordIsValid = bcrypt.compareSync(request.body.password, existingUser.password);
            if (!passwordIsValid) return response.status(401).send({ auth: false, token: null });


        //     request.session.user = {
        //         email: existingUser.email,
        //         name: existingUser.name
        //   };

            request.session.user = existingUser;
            request.session.save()

            console.log('successful login');
            console.log('firstName:'+request.session.user);
            response.status(200).send('successful login with user :\n'+request.session.user);
            //handle that in the fronthand  
        }
    });
});


router.get('/dashboard',(request,response)=> {
     if(!request.session.user){
        console.log('request.session: '+request.session.user);
         return response.status(401).send('Not authorized');
     }

    console.log('req.session: '+request.session.user);
    response.status(200).send('Welcome');
    //response.send("rules");
});

router.get('/logout',(req,res) => {
    //delete request.session.passport;

    //req.session.destroy();
    res.redirect('/');
});

// router.get('/',(req,res) => {
//     res.send('Server side');

// });


module.exports = router;
