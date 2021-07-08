import config from '../config/auth.config.js';
import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const User = db.user;
const Role = db.role;
const Work = db.work;

export const getAllWork = async () => {
    try {

        const isCollectionPresent = Work.estimatedDocumentCount();

        if (isCollectionPresent === null) {
            Work.save();
        };

        const allWork = await Work.find({});

        if (allWork !== null) {
            return ({ status: 200, message: "Worked fetched Successfully!", work: allWork })
        }

    } catch (err) {
        return ({ status: 500, message: err })
    }

};

export const getUserWork = async (req) => {
    try {
        const isUserWork = await Work.find({ username: req.body.username });
        if (!isUserWork) {
            return ({ status: 404, message: "Work from user not found." });
        } else {
            return ({ status: 200, message: 'Successfully fetched user data.', userWork: isUserWork })
        }
    } catch (err) {
        console.log(err);
        return ({ status: 500, message: err })
    }
};

export const saveWork = async (req) => {
    try {
        const isUserWork = await Work.find({ username: req.body.username });
       
        if (isUserWork.length !== 0) {
            const isUpdated = await Work.findOneAndUpdate(
                { username: req.body.username },
                {
                    title: req.body.title,
                    description: req.body.description,
                    img: req.body.img,
                    username: req.body.username,
                    author: req.body.author === undefined ? req.body.username :  req.body.author,
                    rating: req.body.rating
                },
                {
                    returnOriginal: false
                }
            );

            if (isUpdated.length !== 0) {
                return ({ status: 200, message: "Work saved successfully!" })
            }
        } else {
            const work = new Work({
                title: req.body.title,
                description: req.body.description,
                img: req.body.img,
                username: req.body.username,
                author: req.body.author === undefined ? req.body.username :  req.body.author,
                rating: req.body.rating
            });

            const isWorkSaved = work.save();


            if (isWorkSaved.length !== 0) {
                return ({ status: 200, message: "Work saved successfully!" })
            }
        }


    } catch (err) {
        return ({ status: 500, message: err })
    }
};

export const saveRating = async (req) => {
    try {
        const isUserWork = await Work.find({ username: req.body.username });

        if (isUserWork.length !== 0) {
            const isUpdated = await Work.findOneAndUpdate(
                { username: req.body.username },
                {
                    rating: req.body.rating
                },
                {
                    returnOriginal: false
                }
            );

            if (isUpdated.length !== 0) {
                return ({ status: 200, message: "Work saved successfully!" })
            }
        } else {
            return ({ status: 200, message: "User does not exist!" })
        }

    } catch (err) {
        return ({ status: 500, message: err.message })
    }
};