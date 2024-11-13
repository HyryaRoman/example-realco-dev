/*
  Technically, this could be done with placeholder text,
  however <label> has semantic meaning that placeholder does not.
*/
function setupLabeledInput(e: Element) {
  const input = e.getElementsByClassName("labeled-input__input")[0] as HTMLInputElement;

  input.addEventListener("input", (ev:Event) => {
    const target = ev.target as HTMLInputElement;
    const isEmpty = target?.value.length === 0;
    e.classList.toggle('labeled-input--state-empty', isEmpty);
    e.classList.toggle('labeled-input--state-filled', !isEmpty);
  })

  const isEmpty = input.value.length === 0;
  e.classList.toggle('labeled-input--state-empty', isEmpty);
  e.classList.toggle('labeled-input--state-filled', !isEmpty);
}

Array.from(document.getElementsByClassName("labeled-input")).forEach(setupLabeledInput);
