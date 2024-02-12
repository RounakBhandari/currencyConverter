const baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const showRate = document.querySelector(".msg p");
for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    changeFlag(evt.target);
  });
}

const changeFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }
  const newUrl = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let apiResponse = await fetch(newUrl);
  let data = await apiResponse.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmt = amount.value * rate;
  showRate.innerText = `${amount.value} ${fromCurr.value} = ${finalAmt.toFixed(
    2
  )} ${toCurr.value}`;
});
