import db from '../models/index.js';
const Preference = db.preference;


export const getPreference = async (req) => {
    try {
        
        const isCollectionPresent = Preference.estimatedDocumentCount();

        if (isCollectionPresent === null) {
            Preference.save();
        };

        const isUserPreference = await Preference.find({ username: req.body.username });
        if (!isUserPreference) {
            return ({ status: 404, message: "Preference from user not found." });
        } else {
            return ({ status: 200, message: 'Successfully fetched preference data.', userPreference: isUserPreference })
        }
    } catch (err) {
        console.log(err);
        return ({ status: 500, message: err })
    }
};

export const savePreference = async (req) => {
    try {
        const isCollectionPresent = Preference.estimatedDocumentCount();
        console.log(isCollectionPresent);
        if (isCollectionPresent === null) {
            console.log("Inside Save");
            Preference.save();
        };

        const isUserPreference = await Preference.find({ username: req.body.username });
      
        if (isUserPreference.length !== 0) {
            const isUpdated = await Preference.findOneAndUpdate(
                { username: req.body.username },
                {
                    theme: req.body.theme,
                    language: req.body.language,
                    username: req.body.username,
                },
                {
                    returnOriginal: false
                }
            );

            if (isUpdated !== null) {
                return ({ status: 200, message: "Preference saved successfully!" })
            }
        } else {
            const preference = new Preference({
                theme: req.body.theme,
                    language: req.body.language,
                    username: req.body.username,
            });

            console.log(preference);

            const isPreferenceSaved = preference.save();

            console.log("--------------");
            console.log(isPreferenceSaved);
            if (isPreferenceSaved !== null) {
                return ({ status: 200, message: "Preference saved successfully!" })
            }
        }

    } catch (err) {
        return ({ status: 500, message: err })
    }
};