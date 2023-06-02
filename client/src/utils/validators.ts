interface Signup {
  email: string;
  username: string;
  password: string;
}
interface Login {
  email: string;
  password: string;
}

export const isEmail = (str: string): Boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

export const isAlphaNumeric = (str: string): Boolean => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
};

export const signupValidator = (args: Signup): Signup => {
  const res = {
    email: "",
    username: "",
    password: "",
  };

  if (!args.email) {
    res.email = "Please enter an Email";
  } else if (!isEmail(args.email)) {
    res.email = "Please enter a valid Email";
  }

  if (!args.username) {
    res.username = "Please enter a Username";
  } else if (!isAlphaNumeric(args.username)) {
    res.username = "Please enter a Valid Username";
  } else if (args.username.length < 6) {
    res.username = "Username should be more than 6 characters";
  } else if (args.username.length > 20) {
    res.username = "Username should be less than 20 characters";
  }

  if (!args.password) {
    res.password = "Please enter a Password";
  } else if (args.password.length < 6) {
    res.password = "Password should be more than 6 characters";
  }

  return res;
};

export const loginValidator = (args: Login): Login => {
  const res = {
    email: "",
    password: "",
  };

  if (!args.email) {
    res.email = "Please enter an Email";
  }

  if (!args.password) {
    res.password = "Please enter your Password";
  }

  return res;
};
