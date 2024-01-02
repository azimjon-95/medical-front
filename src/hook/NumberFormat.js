import React, { useState } from "react";

export function NumberFormat(number) {
  const cleanNumber = String(number).replace(/\D/g, "");
  const num = 3;
  const filter = [];
  let startIndex = cleanNumber.length;
  while (startIndex > 0) {
    const endIndex = startIndex;
    startIndex = Math.max(0, startIndex - num);
    filter.unshift(cleanNumber.slice(startIndex, endIndex));
  }
  return filter.join(".");
}

export function PhoneNumberFormat(input) {
  if (!input) return input;
  const numberInput = input.replace(/[^\d]/g, "");
  const numberInputLength = numberInput.length;
  if (numberInputLength < 9) {
    return numberInput;
  } else {
    return `(${numberInput.slice(0, 2)}) ${numberInput.slice(
      2,
      5
    )}-${numberInput.slice(5, 7)}-${numberInput.slice(7, 9)} `;
  }
}
