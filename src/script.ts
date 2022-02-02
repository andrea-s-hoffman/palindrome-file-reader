"use strict";

// imports
const fs = require("fs");
const path = require("path");

// main function
const findPalindromes = (arrayOfStrings: string[]): string => {
  // return statement set to an array to include all of the messages for each file
  const returnStatment: string[] = [];

  // loop through array to access each file individually
  arrayOfStrings.forEach((txtFile, index) => {
    // variables ----------------------------------------------------------------------
    // which line #s have a palindrome will be pushed here
    const linesWithP: string[] = [];
    // not sure why .length didn't work yet so howManyLines is temp workaround
    let howManyLines: number = 0;
    let howManyPs: number = 0;

    // helper functions ---------------------------------------------------------------
    const readFile = (fileName: string): string => {
      return fs.readFileSync(path.join(__dirname, fileName), "utf8");
    };

    const isItAPalindrome = (str: string): boolean => {
      let result = false;
      // loops through each word given a single line will be passed in as arg (str)
      str.split(/\s+/).forEach((word) => {
        if (word.length > 1) {
          const revWord = word.split("").reverse().join("");
          if (revWord === word) {
            result = true;
            howManyPs++;
          }
        }
      });
      return result;
    };
    // --------------------------------------------------------------------------------

    // makes the file readable calling first helper function
    const text: string = readFile(txtFile);
    // turns the file into an array based on line break, then loops each line
    text.split("\n").forEach((line, index) => {
      // calls second helper function to check for palindromes
      if (isItAPalindrome(line)) {
        howManyLines++;
        // adds which line numbers have them
        linesWithP.push((index + 1).toString());
      }
    });
    // set up so I can add in commas and an 'and' in the list conditionally (grammar)
    let linesWithPsReturnMsg = "";
    if (linesWithP.length > 1) {
      linesWithPsReturnMsg = [
        ...linesWithP.splice(0, linesWithP.length - 1).join(", "),
        " and ",
        ...linesWithP.splice(linesWithP.length - 1),
      ].join("");
    } else if (linesWithP.length === 1) {
      linesWithPsReturnMsg = linesWithP.toString();
    }
    // conditionally push certain statements to the return array with data
    returnStatment.push(
      `File ${index + 1} has ${
        howManyPs === 1 ? "1 palindrome" : howManyPs + " palindromes"
      }${
        howManyLines > 1
          ? " on lines " + linesWithPsReturnMsg + "."
          : howManyLines === 1
          ? " on line " + linesWithPsReturnMsg + "."
          : "."
      }`
    );
  });
  return returnStatment.join("\n");
};

// test main function
console.log(
  findPalindromes(["/first_page.txt", "/second_page.txt", "/third_page.txt"])
);
