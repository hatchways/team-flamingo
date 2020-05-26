export function validateEmail(email) {
  var re = /\w+[.|\w]\w+@\w+[.]\w+[.|\w+]\w+/;
  return re.test(String(email).toLowerCase());
}
