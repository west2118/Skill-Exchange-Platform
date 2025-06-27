import User from "../models/user.model.js";

const postProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      firstName,
      lastName,
      email,
      location,
      offeredSkills,
      seekedSkills,
    } = req.body;

    const user = await User.findOneAndUpdate(
      { uid },
      {
        firstName,
        lastName,
        email,
        location,
        offeredSkills,
        seekedSkills,
      },
      { upsert: true, new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editOfferedSkills = async (req, res) => {
  const { id } = req.params;
  const { offeredSkills } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        offeredSkills: offeredSkills,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Offered skills edited successfully!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editSeekedSkills = async (req, res) => {
  const { id } = req.params;
  const { seekedSkills } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        seekedSkills: seekedSkills,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Seeked skills edited successfully!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) return;

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postProfile, getUsers, editOfferedSkills, editSeekedSkills };
