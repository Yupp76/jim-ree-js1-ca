const subjectLength = 10;
const addressLength = 25;

const form = document.querySelector("#contact");

const formName = document.querySelector("#name");
const formSubject = document.querySelector("#subject");
const formEmail = document.querySelector("#email");
const formAddress = document.querySelector("#address");
const formButton = document.querySelector("#button");

function isValidField(type, value) {
  let isValid = null;
  let regExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

  switch (type) {
    case "email":
      isValid = value.trim().length > 5 ? regExp.test(value.trim()) : false;
      return isValid;
    case "subject":
      isValid = value.trim().length < subjectLength ? false : true;
      return isValid;
    case "address":
      isValid = value.trim().length < addressLength ? false : true;
      return isValid;
    case "name":
      isValid = value.trim().length < 1 ? false : true;
      return isValid;
    default:
      return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let invalidFields = [];
  let formFields = [formName, formSubject, formEmail, formAddress];

  for (let field of formFields) {
    if (isValidField(field.id, field.value) === false) {
      invalidFields.push(field.id);
    }
  }

  if (invalidFields.length === 1) {
    alert(`error detected in ${invalidFields[0]} field!`);
  } else if (invalidFields.length > 1) {
    alert(`error detected in the following fields: ${invalidFields.join(", ")}!`);
  } else if (invalidFields.length === 0) {
    alert(`form successfully submitted!`);
    form.reset();
  }
});
