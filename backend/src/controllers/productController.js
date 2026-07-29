const Product = require("../models/Product");


// Create Product
exports.createProduct = async (req, res) => {
    try {

        const product = await Product.create({
            ...req.body,
            seller: req.user._id,
            images: req.file ? [req.file.path] : []
        });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// Get All Products
exports.getProducts = async (req, res) => {
    try {

        const {
            search,
            category,
            condition,
            seller,
            available,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        let filter = {};

        // Search across multiple fields
        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    brand: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    model: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    material: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    color: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        // Category Filter
        if (category) {
            filter.category = category;
        }

        // Condition Filter
        if (condition) {
            filter.condition = condition;
        }

        // Seller Filter
        if (seller) {
            filter.seller = seller;
        }

        // Available Products Only
        if (available === "true") {
            filter.quantity = {
                $gt: 0
            };
        }

        // Price Filter
        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Sorting
        let sortOption = {};

        switch (sort) {

            case "price_asc":
                sortOption.price = 1;
                break;

            case "price_desc":
                sortOption.price = -1;
                break;

            case "oldest":
                sortOption.createdAt = 1;
                break;

            case "newest":
            default:
                sortOption.createdAt = -1;
                break;
        }

        // Pagination
        const currentPage = Number(page);
        const pageSize = Number(limit);
        const skip = (currentPage - 1) * pageSize;

        // Total matching products
        const totalProducts = await Product.countDocuments(filter);

        // Fetch products
        const products = await Product.find(filter)
            .populate("seller", "displayName email")
            .sort(sortOption)
            .skip(skip)
            .limit(pageSize);

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            currentPage,
            totalPages: Math.ceil(totalProducts / pageSize),
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Product
exports.getSingleProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
            .populate("seller", "displayName email");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// Update Product
exports.updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// My Listings
exports.getMyProducts = async (req, res) => {
    try {

        const products = await Product.find({
            seller: req.user._id
        });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};