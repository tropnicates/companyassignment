const bcrypt = require("bcrypt");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");


const registerCtrl = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {

    return res.render("users/register", {
      error: "All fields are required",
    });
  }
  try {

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.render("users/register", {
        error: "Exist is taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passswordHashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: passswordHashed,
    });

    req.session.userAuth = user._id;
    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    res.json(error);
  }
};


const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("users/login", {
      error: "Email and password fields are required",
    });
  }
  try {

    const userFound = await User.findOne({ email });
    if (!userFound) {

      return res.render("users/login", {
        error: "Invalid login credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {

      return res.render("users/login", {
        error: "Invalid login credentials",
      });
    }

    req.session.userAuth = userFound._id;

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    res.json(error);
  }
};


const userDetailsCtrl = async (req, res) => {
  try {

    const userId = req.params.id;

    const user = await User.findById(userId);
    res.render("users/updateUser", {
      user,
      error: "",
    });
  } catch (error) {
    res.render("users/updateUser", {
      error: error.message,
    });
  }
};

const profileCtrl = async (req, res) => {
  try {

    const userID = req.session.userAuth;
  
    const user = await User.findById(userID)
      .populate("posts")
      .populate("comments");
    res.render("users/profile", { user });
  } catch (error) {
    res.json(error);
  }
};


const uploadProfilePhotoCtrl = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.render("users/uploadProfilePhoto", {
        error: "Please upload image",
      });
    }

    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);

    if (!userFound) {
      return res.render("users/uploadProfilePhoto", {
        error: "User not found",
      });
    }
  
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    );

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    return res.render("users/uploadProfilePhoto", {
      error: error.message,
    });
  }
};



const uploadCoverImgCtrl = async (req, res) => {
  try {

    if (!req.file) {
      return res.render("users/uploadCoverPhoto", {
        error: "Please upload image",
      });
    }

    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);

    if (!userFound) {
      return res.render("users/uploadCoverPhoto", {
        error: "User not found",
      });
    }

    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        coverImage: req.file.path,
      },
      {
        new: true,
      }
    );

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    return res.render("users/uploadProfilePhoto", {
      error: error.message,
    });
  }
};


const updatePasswordCtrl = async (req, res, next) => {
  const { password } = req.body;
  try {

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passswordHashed = await bcrypt.hash(password, salt);

      await User.findByIdAndUpdate(
        req.session.userAuth,
        {
          password: passswordHashed,
        },
        {
          new: true,
        }
      );

      res.redirect("/api/v1/users/profile-page");
    }
  } catch (error) {
    return res.render("users/uploadProfilePhoto", {
      error: error.message,
    });
  }
};


const updateUserCtrl = async (req, res, next) => {
  const { fullname, email } = req.body;
  try {
    if (!fullname || !email) {
      return res.render("users/updateUser", {
        error: "Please provide details",
        user: "",
      });
    }

    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return res.render("users/updateUser", {
          error: "Email is taken",
          user: "",
        });
      }
    }

    await User.findByIdAndUpdate(
      req.session.userAuth,
      {
        fullname,
        email,
      },
      {
        new: true,
      }
    );
    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    return res.render("users/updateUser", {
      error: error.message,
      user: "",
    });
  }
};


const logoutCtrl = async (req, res) => {

  req.session.destroy(() => {
    res.redirect("/api/v1/users/login");
  });
};

module.exports = {
  registerCtrl,
  loginCtrl,
  userDetailsCtrl,
  profileCtrl,
  uploadProfilePhotoCtrl,
  uploadCoverImgCtrl,
  updatePasswordCtrl,
  updateUserCtrl,
  logoutCtrl,
};
