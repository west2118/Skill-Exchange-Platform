import Exchange from "../models/exchange.model.js";
import User from "../models/user.model.js";

const getAllExchange = async (req, res) => {
  try {
    const exchanges = await Exchange.find({});

    if (!exchanges) return;

    res.status(200).json(exchanges);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserExchange = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const userExchanges = await Exchange.find({
      $or: [{ proposerId: id }, { receiverId: id }],
      status: { $ne: "Exchanged" },
    });
    if (!userExchanges) return;

    res.status(200).json(userExchanges);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postExchange = async (req, res) => {
  try {
    const { proposerId, receiverId, postId, skillOffer, skillSeek, message } =
      req.body;

    const alreadyExchange = await Exchange.findOne({
      proposerId,
      postId,
      status: "Pending",
    });
    if (alreadyExchange) {
      return res.status(400).json({ message: "Already Submitted Proposal" });
    }

    const newExchange = await Exchange.create({
      proposerId,
      receiverId,
      postId,
      skillOffer,
      skillSeek,
      message,
    });

    res
      .status(200)
      .json({ message: "Propose exchange successfully", newExchange });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const cancelExchange = async (req, res) => {
  try {
    const { id } = req.params;
    const { exchangeId } = req.body;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ message: "User didn't exist" });
      }

      const exchange = await Exchange.findById(exchangeId);
      if (!exchange) {
        return res.status(400).json({ message: "User didn't exist" });
      }

      if (exchange.proposerId.toString() !== id.toString()) {
        return res
          .status(400)
          .json({ message: "You don't have authorize in this proposal" });
      }

      const updatedExchange = await Exchange.findByIdAndUpdate(
        exchangeId,
        {
          status: "Cancelled",
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Cancelled Successfully!", updatedExchange });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postExchange, getUserExchange, getAllExchange, cancelExchange };
