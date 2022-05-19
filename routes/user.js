import express, { Router } from 'express';
import {v4 as uuidv4} from 'uuid';

const route = express.Router();

let users = [];

//everything is /user
route.get('/', (req, res) => {
    res.send(users);
});

route.post('/', (req, res) => {
    const user = req.body;
    const userId = uuidv4();
    const userwithID = {...user, id : userId};
    users.push(userwithID);

    res.send(`user ${user.firstname} added`);
})

route.get('/:id', (req, res) => {
    const {id} = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
})

route.delete('/:id', (req, res) => {
    const {id} = req.params;
    users = users.filter((user) => user.id != id);
    res.send(users);
})

route.patch('/:id', (req, res) => {
    const {id} = req.params;
    const { firstname, lastname, age } = req.body;

    const user = users.find((user) => user.id === id);

    if(firstname) user.firstname = firstname;
    if(lastname) user.lastname = lastname;
    if(age) user.age = age;

    res.send(`user ${id} updated.}`)
})

export default route;