const moviesDB = require("../../model/movies/moviesModel");
const cloudinary = require("../../Cloudinary/cloudinaryconfig");

// create new movie
exports.createmovie = async (req, res) => {
    const file = req?.file ? req.file?.path : "";
    const { moviename, publishyear } = req.body;

    if (!file || !moviename || !publishyear) {
        res.status(400).json({ error: "All fields are required" });
    } else {
        try {
            const upload = await cloudinary?.uploader?.upload(file);

            const existingmovie = await moviesDB.findOne({ moviename: moviename });

            if (existingmovie) {
                res.status(400).json({ error: "This Movie is already exist" });
            } else {
                const moviesData = new moviesDB({
                    userid: req.userMainId, moviename, image: upload?.secure_url, publishyear
                });

                await moviesData.save();
                res.status(200).json({ message: "movie sucessfully create" });
            }
        } catch (error) {
            console.log("error catch", error)
            res.status(400).json({ error: error });
        }
    }
}

// getall movie data
exports.getAllmovie = async (req, res) => {
    const userid = req.userMainId;
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 8;

    try {
        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 8 = 8

        // allmovie count
        const allmoviecount = await moviesDB.countDocuments({ userid: userid });

        //  movie all data
        const moviesdata = await moviesDB.find({ userid: userid })
            .limit(ITEM_PER_PAGE)
            .skip(skip)
            .sort({ _id: -1 })


        const pageCount = Math.ceil(allmoviecount / ITEM_PER_PAGE);

        res.status(200).json({
            Pagination: {
                allmoviecount, pageCount
            },
            moviesdata
        });

    } catch (error) {
        console.log("error catch", error)
        res.status(400).json({ error: error });
    }
}

// get single movie data
exports.getSingleMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const getSingleMovie = await moviesDB.findOne({ _id: id });
        res.status(200).json(getSingleMovie)
    } catch (error) {
        console.log("error catch", error)
        res.status(400).json({ error: error });
    }
}

// delete movie
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const deletemovieData = await moviesDB.findByIdAndDelete({ _id: id });

        res.status(200).json({ message: "Movie Sucessfully delete", deletemovieData })
    } catch (error) {
        console.log("error catch", error)
        res.status(400).json({ error: error });
    }
}

// update movies
exports.updatemovies = async (req, res) => {
    const { id } = req.params;
    const file = req?.file ? req.file?.path : "";
    const { moviename, publishyear, image } = req.body;

    var upload;
    try {
        if (file) {
            upload = await cloudinary?.uploader?.upload(file);
        }

        let dynamicimg = file ? upload?.secure_url : image

        const moviesUpdate = await moviesDB.findByIdAndUpdate({ _id: id }, {
            userid: req.userMainId, moviename, image: dynamicimg, publishyear
        }, { new: true });

        await moviesUpdate.save();
        res.status(200).json({ message: "movie sucessfully updated" });

    } catch (error) {
        console.log("error catch", error)
        res.status(400).json({ error: error });
    }
}