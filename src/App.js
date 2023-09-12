import "./index.css";
import React, { useState } from "react";

const generateRandomElement = () => {
  const length = Math.floor(Math.random() * 5) + 1;
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let element = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    element += characters.charAt(randomIndex);
  }

  return element;
};

const bubbleSort = (arr) => {
  const sortedArray = [...arr];
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = 0; j < sortedArray.length - i - 1; j++) {
      if (sortedArray[j] > sortedArray[j + 1]) {
        var temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
      }
    }
  }

  return sortedArray;
};
const selectionSort = (arr) => {
  const sortedArray = [...arr];
  const n = sortedArray.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (sortedArray[j] < sortedArray[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = sortedArray[i];
      sortedArray[i] = sortedArray[minIndex];
      sortedArray[minIndex] = temp;
    }
  }
  return sortedArray;
};

const insertionSort = (arr) => {
  const sortedArray = [...arr];
  const n = sortedArray.length;
  for (let i = 1; i < n; i++) {
    const key = sortedArray[i];
    let j = i - 1;
    while (j >= 0 && sortedArray[j] > key) {
      sortedArray[j + 1] = sortedArray[j];
      j--;
    }
    sortedArray[j + 1] = key;
  }
  return sortedArray;
};

const mergeSort = (arr) => {
  const sortedArray = [...arr];
  if (sortedArray.length <= 1) {
    return sortedArray;
  }

  console.log(sortedArray.length);
  const mid = Math.floor(sortedArray.length / 2);
  const left = sortedArray.slice(0, mid);
  const right = sortedArray.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

const quickSort = (arr) => {
  const sortedArray = [...arr];
  if (sortedArray.length <= 1) return sortedArray;

  const pivot = sortedArray[0];
  const left = [];
  const right = [];

  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i] < pivot) {
      left.push(sortedArray[i]);
    } else {
      right.push(sortedArray[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

const App = () => {
  const [array, setArray] = useState([]);
  const types = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
  ];
  const [bubbleArray, setBubbleArray] = useState([]);
  const [bubbleTime, setBubbleTime] = useState(0);
  const [selectionTime, setSelectionTime] = useState(0);
  const [insertionTime, setInsertionTime] = useState(0);
  const [mergeTime, setMergeTime] = useState(0);
  const [quickTime, setQuickTime] = useState(0);
  const [selectionArray, setSelectionArray] = useState([]);
  const [insertionArray, setInsertionArray] = useState([]);
  const [mergeArray, setMergeArray] = useState([]);
  const [quickArray, setQuickArray] = useState([]);
  const handleGenerate = () => {
    const randomArray = Array.from({ length: 1000 }, () =>
      generateRandomElement()
    );
    setArray(randomArray);
    setBubbleArray([]);
    setSelectionArray([]);
    setInsertionArray([]);
    setMergeArray([]);
    setQuickArray([]);
  };
  const handleSort = (type) => {
    setBubbleArray([]);
    setSelectionArray([]);
    setInsertionArray([]);
    setMergeArray([]);
    setQuickArray([]);
    const startTime = performance.now();
    if (type === "Bubble Sort") {
      setBubbleArray(bubbleSort(array));
      const endTime = performance.now();
      setBubbleTime(endTime - startTime);
    }
    if (type === "Selection Sort") {
      setSelectionArray(selectionSort(array));
      const endTime = performance.now();
      setSelectionTime(endTime - startTime);
    }
    if (type === "Insertion Sort") {
      setInsertionArray(insertionSort(array));
      const endTime = performance.now();
      setInsertionTime(endTime - startTime);
    }
    if (type === "Merge Sort") {
      setMergeArray(mergeSort(array));
      const endTime = performance.now();
      setMergeTime(endTime - startTime);
    }
    if (type === "Quick Sort") {
      setQuickArray(quickSort(array));
      const endTime = performance.now();
      setQuickTime(endTime - startTime);
    }
  };
  return (
    <div>
      <div className="container">
        <button className="btn-generate" onClick={handleGenerate}>
          Generate array
        </button>
        {array.length === 1000 && (
          <div className="array-container">
            {array.map((item) => {
              return `${item} ,`;
            })}
          </div>
        )}
        <div>
          <div className="btn-container">
            {types.map((type) => {
              return (
                <button className="btn-sort" onClick={() => handleSort(type)}>
                  {type}
                </button>
              );
            })}
          </div>
          {bubbleArray.length === 1000 && (
            <div className="array-container">
              {bubbleArray.map((item) => {
                return `${item} ,`;
              })}
              <p className="sort-time">
                Bubble Sort Time: {bubbleTime.toFixed(2)} milliseconds
              </p>
            </div>
          )}
          {selectionArray.length === 1000 && (
            <div className="array-container">
              {selectionArray.map((item) => {
                return `${item} ,`;
              })}
              <p className="sort-time">
                Selection Sort Time: {selectionTime.toFixed(2)} milliseconds
              </p>
            </div>
          )}
          {insertionArray.length === 1000 && (
            <div className="array-container">
              {insertionArray.map((item) => {
                return `${item} ,`;
              })}
              <p className="sort-time">
                Insertion Sort Time: {insertionTime.toFixed(2)} milliseconds
              </p>
            </div>
          )}
          {mergeArray.length === 1000 && (
            <div className="array-container">
              {mergeArray.map((item) => {
                return `${item} ,`;
              })}
              <p className="sort-time">
                Merge Sort Time: {mergeTime.toFixed(2)} milliseconds
              </p>
            </div>
          )}
          {quickArray.length === 1000 && (
            <div className="array-container">
              {quickArray.map((item) => {
                return `${item} ,`;
              })}
              <p className="sort-time">
                Quick Sort Time: {quickTime.toFixed(2)} milliseconds
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
