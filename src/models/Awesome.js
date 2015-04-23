var mongoose = require('mongoose');
var _ = require('underscore');
var cost;

var AwesomeModel;

var setName = function(name) {
    return _.escape(name).trim();
};

var AwesomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    /*
    price: {
        type: Number,
        min: 0,
        required: true
    },
	*/
	/*cost: {
		type: Number,
		min: 0, 
		required: false
	},*/
    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

AwesomeSchema.methods.toAPI = function() {
	//this.cost = this.price; 
    return {
        name: this.name,
        //price: this.price,
		//cost: this.cost
    };
};

AwesomeSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return AwesomeModel.find(search).select("name").exec(callback);
};


AwesomeModel = mongoose.model('Awesome', AwesomeSchema);


module.exports.AwesomeModel = AwesomeModel;
module.exports.AwesomeSchema = AwesomeSchema;