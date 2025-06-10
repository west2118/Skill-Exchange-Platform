const sessionLogin = async (req, res) => {
  const { idToken } = req.body;
  const expiresIn = 60 * 60 * 24 * 7 * 1000;

  try {
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });
    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Session Created" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const refreshSession = async (req, res) => {
  const { idToken } = req.body;
  const expiresIn = 60 * 60 * 24 * 7 * 1000;

  try {
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });
    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Session Created" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProfile = async (req, res) => {
  const sessionCookie = req.cookie.session || "";

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    res.status(200).json({ uid: decoded.uid, email: decoded.email });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { sessionLogin, refreshSession, getProfile };
