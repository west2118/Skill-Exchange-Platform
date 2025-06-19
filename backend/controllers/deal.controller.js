import Deal from "../models/deal.model.js";
import Exchange from "../models/exchange.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const postDeal = async (req, res) => {
  const { id } = req.params;
  const { proposerId, postId, exchangeId, skillOffer, skillSeek } = req.body;

  console.log(proposerId, postId, exchangeId, skillOffer, skillSeek);

  try {
    const newDeal = await Deal.create({
      proposerId,
      postId,
      exchangeId,
      skillOffer,
      skillSeek,
      receiverId: id,
    });

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) {
      return res.status(400).json({ message: "Proposal didn't exist" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Proposal didn't exist" });
    }

    if (exchange.receiverId.toString() !== id.toString()) {
      return res
        .status(400)
        .json({ message: "Don't have Authorize in this proposal" });
    }

    exchange.status = "Exchanged";
    await exchange.save();

    await Exchange.updateMany(
      {
        _id: { $ne: exchangeId },
        postId,
        status: "Pending",
      },
      {
        $set: { status: "Rejected" },
      }
    );

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        status: "Exchanged",
      },
      { new: true }
    );

    const updatedExchanges = await Exchange.find({ postId });

    res.status(200).json({
      message: "Proposal Accepted Successfully!",
      updatedExchanges,
      updatedPost,
      newDeal,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserDeal = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const userDeals = await Deal.find({
      $or: [{ proposerId: id }, { receiverId: id }],
      status: { $ne: "Completed" },
    });
    if (!userDeals) return;

    res.status(200).json(userDeals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postSession = async (req, res) => {
  const { id } = req.params;
  const { dealId, sessionData } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ message: "User didn't exist" });
    }

    const deal = await Deal.findById(dealId);
    if (!deal) {
      res.status(400).json({ message: "Deal cannot found" });
    }

    if (deal.proposerId.toString() !== id.toString()) {
      res
        .status(400)
        .json({ message: "You don't have authorize in this deal" });
    }

    const updatedDeal = await Deal.findByIdAndUpdate(
      dealId,
      {
        sessions: sessionData,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Session created successfully!", updatedDeal });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllDeal = async (req, res) => {
  try {
    const deals = await Deal.find({});

    if (!deals) return;

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const acceptDealSession = async (req, res) => {
  const { id } = req.params;
  const { dealId } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ message: "User didn't exist" });
    }

    const deal = await Deal.findById(dealId);
    if (!deal) {
      res.status(400).json({ message: "Deal cannot found" });
    }

    if (deal.receiverId.toString() !== id) {
      res
        .status(400)
        .json({ message: "You don't have authorize in this deal" });
    }

    const updatedDeal = await Deal.findByIdAndUpdate(
      dealId,
      {
        status: "In Progress",
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Deal Session Accepted Successfully!", updatedDeal });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postDeal, getUserDeal, postSession, getAllDeal, acceptDealSession };
