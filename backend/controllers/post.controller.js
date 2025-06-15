import Exchange from "../models/exchange.modal.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

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

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    if (!posts) return;

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserPost = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const userPosts = await Post.find({ userId: id });
    if (!userPosts) return;

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getNearbyPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const userProposals = await Exchange.find({
      proposerId: id,
      status: "Pending",
    });
    const proposedPostId = userProposals.map((user) => user.postId.toString());

    const posts = await Post.find({
      userId: { $ne: id },
      _id: { $nin: proposedPostId },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPerfectMatch = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const userProposals = await Exchange.find({
      proposerId: id,
      status: "Pending",
    });
    const proposedPostId = userProposals.map((proposal) =>
      proposal.postId.toString()
    );

    const posts = await Post.find({
      userId: { $ne: id },
      _id: { $nin: proposedPostId },
    });

    const matchedResults = posts.filter(
      (post) =>
        user.offeredSkills.includes(post.skillSeek) &&
        user.seekedSkills.includes(post.skillOffer)
    );

    res.status(200).json(matchedResults);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postPost, getPosts, getNearbyPosts, getUserPost, getPerfectMatch };
