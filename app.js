const mongoose= require('mongoose');
//const db= require('./models');
//express app
//connect to mongodb


const express=require('express');
const rootRouter = require('./routes/index');

const app=express();
app.use(express.json());
app.use(rootRouter);

//listen for request
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log( 'Listening on port ${port}...' ));

const dbURI='mongodb+srv://user1:123abc@bpr.tahew.mongodb.net/BPR_Atlas?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));



//todo: asdg


// app.get('/',(req,res)=>{
//     res.send('<p>home Page</p>');
// });


// exports.userValidator = () => {
//     return [
//       check('username').notEmpty().withMessage('Username or email is required'),
//       check('password').notEmpty().withMessage('Password is required'),
//       check('profile_image').notEmpty().withMessage('Profile_image is required'),
//       check('first_name').notEmpty().withMessage('First_name is required'),
//       check('last_name').notEmpty().withMessage('Last_name is required'),
//       check('email').notEmpty().isEmail().withMessage('Valid email is required'),
//       check('phone').notEmpty().withMessage('Phone is required'),
//       check('sex').notEmpty().withMessage('Sex is required'),
//     ]
//   }

//    roomValidator = () => {
//     return [
//       check('description').notEmpty().withMessage('Description or email is required'),
//       check('size').notEmpty().withMessage('Size is required'),
//       check('photo').notEmpty().withMessage('Photo is required'),
//       check('infoPanel').notEmpty().withMessage('InfoPanel is required'),
//     ]
//   }


// function validateUser(user){
//     // const schema={
//     //     name: Joi.string().min(3).required()
//     // };
//     // return Joi.validate(course,schema);
    
//     const schema = Joi.object({
//         name: Joi.string().min(1).required()
//             });
//             const validation = schema.validate(course);
    
//             return validation;
//     // schema.validateAsync({ email, password, fullName }).then(val => {
//     //     req.body = val;
//     //   }).catch(err => {
//     //     throw new Error('Failed to validate input ' + err.details[0].message);
//     //   })
// }

// // app.get('/add-listing',(req,res)=>{
// //     const listing= new Listing({
// //         title:'new list',
// //         descrpition:'descrrrp'
// //     });

// //     blog.save()
// //     .then((result)=>{res.send(result)})
// //     .catch((err)=>{console.log(err);
// //     });
// // })


// // app.get('/all-listings',(req,res)=>{
// //     Blog.find()
// //     .then((result)=>{
// //         res.send(result);
// //     })
// //     .catch((err)=>{
// //         console.log(err);
// //     });
// // })


// // app.get('/single-listing',(req,res)=>{
// //     Blog.findById('idddd')
// //      .then((result)=>{
// //         res.send(result);
// //     })
// //     .catch((err)=>{
// //         console.log(err);
// //     });
// // })

// app.get('/' , (req,res)=> {
// res.send('Hello World!!!!');
// });

// app.get('/api/courses' , (req, res)=> {

//     res.send(courses);
// });

// app.post ('/api/courses',(req, res)=> {

//     const {error} = validateCourse(req.body);

//         if (error){

//             res.status(400).send(error.details[0].message);
//             return;
//         }});


// app.get('/api/courses/:id' , (req, res)=> {

//    const course = courses.find(c => c.id === parseInt (req.params.id));
//    if (!course) res.status(404).send('The course with the given id was not found')
//    res.send(course);
// });



// // app.put ('/api/courses/:id', (req, res)=> {

// //     const course = courses.find(c => c.id === parseInt (req.params.id));
// //     if (!course) res.status(404).send('The course with the given id was not found')
    
// //     const schema = Joi.object({
// //         name: Joi.string().min(3).required()
        
// //             });
        
// //             const validation = schema.validate(req.body);
            
// //         res.send(validation);

// // const {error} = validateCourse(req.body);

// //         if (error){q

// //             res.status(400).send(result.error.details[0].message);
// //             return;
// //         }

// //         course.name = req.body.name;
// //         res.send(course);
// //         });

// //         function validateCourse(course){
// //             const schema = {
// //                 name: Joi.string().min(3).required()
// //                  };

// //                  return Joi.validate(course, schema);
// //                 }
// //     });



// const createListing = function(listing) {
//     return db.Listing.create(listing).then(docListing => {
//       console.log("\n>> Created Listing:\n", docListing);
//       return docListing;
//     });
//   };
  
//   const addRoomToListing = function(listingId, listingId) {
//     return db.Listing.findByIdAndUpdate(
//         listingId,
//       { listing: listingId },
//       { new: true, useFindAndModify: false }
//     );
//   };


//   const run = async function() {
//     var room = await createRoom({
//       title: "Listing #1",
//       author: "bezkoder"
//     });
  
//    var listing = await createListing({
//       name: "Node.js",
//       description: "Node.js listing"
//     });
  
//     room = await addRoomToListing(room._id, listing._id);
//     console.log("\n>> Room:\n", room);
//   };