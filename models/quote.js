
const mongoose = require('mongoose');


const quotesSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    nameOfTheQuote: {
        type: String,
        required: true
    },
    typeOfQuote: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    sourceOfTheQuote: {
        type: String,
        required: true

    }
});

function validateQuote(quote){
    const schema = Joi.object({
        author: Joi.string().min(3).max(100).required(),
        nameOfTheQuote: Joi.string().min(3).max(100).required(),
        typeOfQuote: Joi.string().min(6).max(255).required(),
        quote: Joi.string().min(5).max(255).required(),
        sourceOfTheQuote: Joi.string().min(7).max(100).required()
    });
    return schema.validate(quote);
}

const Quote = mongoose.model('Quote', quotesSchema);


module.exports = Quote;
