import Post from "../models/post.model.js";

const postPost = async (req, res) => {
  try {
    const {
      skillSeek,
      skillOffer,
      description,
      availTimeFrom,
      availTimeTo,
      preferredTime,
      address,
    } = req.body;
    const { id } = req.params;

    const post = new Post({
      userId: id,
      skillSeek,
      skillOffer,
      description,
      availTimeFrom,
      availTimeTo,
      preferredTime,
      address,
    });

    const newPost = await post.save();

    res.status(200).json({ message: "Posted Successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postPost };
