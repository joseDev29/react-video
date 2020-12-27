import md5 from "md5";

const gravatar = (email) => {
  const formatEmail = email.trim().toLowerCase();
  const hash = md5(formatEmail, { encoding: "binary" });
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

export default gravatar;
