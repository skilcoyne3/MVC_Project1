var _ = require('underscore');
var models = require('../models');

var Awesome = models.Awesome;

var makerPage = function(req, res) {

    Awesome.AwesomeModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('app', {payments: docs});
    });
};

var makeAwesome = function(req, res) {

    if(!req.body.name) {
        return res.status(400).json({error: "insert something"});
    }
    
    var awesomeData = {
        name: req.body.name,
        //price: req.body.price,
		//cost: req.body.cost,
        owner: req.session.account._id
    };
    
    var newAwesome = new Awesome.AwesomeModel(awesomeData);
    
    newAwesome.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/maker'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeAwesome;