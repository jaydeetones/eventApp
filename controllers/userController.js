import Users from "../models/users.js";

export const createUser = async (req, res) => {
    const params = req.body;

    const isValid = validateParams(params);

    if (isValid != true) {
        return res.status(400).json({ message: isValid.error });
    }

    try {
        const newUser = new Users(params);

        await newUser.save();
        res.status(201).json(newUser);
    } catch(error) {
        res.status(401).json({ message: error.message });
    }
}

const validateParams = params => {
    if (!params.userName) return { "error": "Missing userName key" };
    if (!params.lastName) return { "error": "Missing lastName key" };
    if (!params.firstName) return { "error": "Missing firstName key" };
    if (!params.middleName) return { "error": "Missing middleName key" };

    return true;
}

