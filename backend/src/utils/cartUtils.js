const Product = require("../models/Product");

const calculateTotal = async (cart) => {

    let total = 0;

    for (const item of cart.items) {

        const product = await Product.findById(item.product);

        if (product) {
            total += product.price * item.quantity;
        }

    }

    return total;
};

module.exports = calculateTotal;