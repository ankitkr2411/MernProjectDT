const mongoose = require("mongoose");

const blouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    mrp: {
        type: Number,
        required: true,
    },

    colors: [
        {
            color: {
                type: String,
            },

            sizes: [
                {
                    size: {
                        type: String,
                    },

                    stock: {
                        type: Number,
                    }
                }
            ],

            description: {
                type: String,
            },

            image: [
                {
                    type: String,
                }
            ],

            price: {
                type: String,
            }
        }
    ],


})

//created collection name SAREE and we can access it through Saree
const Blouse = mongoose.model('BLOUSES', blouseSchema);

module.exports = Blouse;