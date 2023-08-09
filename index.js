require('dotenv').config();
const mongoose = require('mongoose')
const Person = require('./person')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected to Mongo Atlas")
}).catch((err)=>{
    console.error(err)
})

const person = new Person({name: "Gbenga", age: 32, favoriteFoods: ["Rice, Beans"],})
person.save().then(()=>{
    console.log("person is good")
})
console.log(person)

const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Burger', 'Tacos'] }
  ];
  
  Person.create(arrayOfPeople)
  .then(people=>{
    console.log(`people:${people}`);
  })
  .catch(err=>{
    console.error(err);
  }); 
    

  Person.find({ name: 'John Doe' })
  .exec()
  .then(foundPeople => {
    console.log('People with name "John Doe":', foundPeople);
  })
  .catch(err => {
    console.error(err);
  });
  
  // Use model.findOne() to Return a Single Matching Document
  Person.findOne({ favoriteFoods: 'Pizza' })
  .exec().then(foundFood=>{
    console.log('Food with name "Pizza":', foundFood);
  })
  .catch(err=>{
    console.error(err);
  });

  const personId = '64d3e5bdf43c23754cc0cbaa';
  Person.findById(personId)
  .exec().then(foundPerson=>{
    console.log(`Person with Id:${foundPerson}`);
  })
  .catch(err=>{
    console.error(err);
  });
  
  // Perform Classic Updates
  const personIdToUpdate = '';
  Person.findById(personIdToUpdate)
  .exec()
  .then(person => {
    if (!person) {
      console.log('Person not found');
      return;
    }

    person.favoriteFoods.push('Hamburger');
    return person.save();
  })
  .then(updatedPerson => {
    if (updatedPerson) {
      console.log('Updated person:', updatedPerson);
    }
  })
  .catch(err => {
    console.error(err);
  });
  
  // Perform New Updates on a Document Using model.findOneAndUpdate()
  const personNameToUpdate = 'John Doe';
  Person.findOneAndUpdate(
    { name: personNameToUpdate },
    { age: 20 },
    { new: true })
    .exec().then(updatedName=>{
        console.log(`new Name:${updatedName}`);
      })
      .catch(err=>{
        console.error(err);
      });
  
  // Delete One Document Using model.findByIdAndRemove
  const personIdToDelete = '64d3e617e80547f864ae2a9c';
  Person.findByIdAndRemove(personIdToDelete) 
  .exec().then(deletedPerson=>{
    console.log(`Person deleted : ${deletedPerson}`);
  })
  .catch(err=>{
    console.error(err);
  });

  // MongoDB and Mongoose - Delete Many Documents with model.remove()
  const nameToDelete = 'Mary';
  Person.deleteOne({ name: nameToDelete })
  .exec().then(deletedName=>{
    console.log(`Person with Id:${deletedName}`);
  })
  .catch(err=>{
    console.error(err);
  });
  
  // Chain Search Query Helpers
  Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .then(data=>{
        console.log(`food :${data}`);
      })
      .catch(err=>{
        console.error(err);
      });