import mongoose from 'mongoose';
import {
    Router
} from 'express';
import Restaurant from '../model/restaurant';
import bodyParse from 'body-parser';

export default ({
    config,
    db
}) => {
    let api = Router();

    api.post('/add', (req, res) => {
        let newRest = new Restaurant();
        newRest.name = req.body.name;

        newRest.save(err => {
            if (err) {
                res.send(err)
            }
            res.json({
                message: 'Restaurant save succeddfully'
            })
        })
    })

    api.get('/read', (req, res) => {
        Restaurant.find({}, (err, restaurants) => {
            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        })
    })

    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.json(err);
            }
            res.json(restaurant);
        })
    })

    api.put('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.json(err);
            }
            restaurant.name = req.body.name;
            restaurant.save(err =>{
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: "Restuarant has benn update"
                })
            });
        })
    })
    return api;
}