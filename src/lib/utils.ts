export const validateEmail = (email: string) => {
  const regex =
    /[0-9]{2}(cse|cseaiml|cseds|cseiot|bca|mca)[0-9]{1,4}\.[a-z]{4,}@giet\.edu/g;
  return regex.test(email);
};
