export function padEnd(array, minLength, fillValue = null) {
  return Object.assign(new Array(minLength).fill(fillValue), array);
}

export const validateEmail = (email) => {
  return email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
};