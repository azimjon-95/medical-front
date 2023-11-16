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
    if (numberInputLength < 4) {
        return numberInput;
    } else if (numberInputLength < 7) {
        return `(${numberInput.slice(0, 3)}) ${numberInput.slice(3)}`;
    } else {
        return `(${numberInput.slice(0, 3)}) ${numberInput.slice(
            3,
            6
        )}-${numberInput.slice(6, 10)}`;
    }
    return "";
}

