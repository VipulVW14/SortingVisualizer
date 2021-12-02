import React from 'react';

import { getMergeSortAnimations } from '../sortingAlgorithms/MergeSort';
import { getHeapSortAnimations } from '../sortingAlgorithms/HeapSort';
import { getQuickSortAnimations } from '../sortingAlgorithms/QuickSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/InsertionSort';
import { getSelectionSortAnimations } from '../sortingAlgorithms/SelectionSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort';
import { getCycleSortAnimations } from '../sortingAlgorithms/CycleSort';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 2;

const NUMBER_OF_ARRAY_BARS =110;

const PRIMARY_COLOR = 'tomato';

const SECONDARY_COLOR = 'blue';

const algorithms = {
  "mergeSort": getMergeSortAnimations,
  "insertionSort": getInsertionSortAnimations,
  "quickSort": getQuickSortAnimations,
  "cycleSort": getCycleSortAnimations,
  "selectionSort": getSelectionSortAnimations,
  "bubbleSort": getBubbleSortAnimations,
  "heapSort": getHeapSortAnimations,
}

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 650));
    }
    this.setState({ array });
  }

  disableSortButtons() {
    document.getElementById("generateNewArray").disabled = true;
    document.getElementById("mergeSort").disabled = true;
    document.getElementById("quickSort").disabled = true;
    document.getElementById("heapSort").disabled = true;
    document.getElementById("insertionSort").disabled = true;
    document.getElementById("cycleSort").disabled = true;
    document.getElementById("selectionSort").disabled = true;
    document.getElementById("bubbleSort").disabled = true;
  }

  restoreStoreButtons() {
    document.getElementById("generateNewArray").disabled = false;
    document.getElementById("mergeSort").disabled = false;
    document.getElementById("quickSort").disabled = false;
    document.getElementById("heapSort").disabled = false;
    document.getElementById("cycleSort").disabled = false;
    document.getElementById("bubbleSort").disabled = false;
    document.getElementById("selectionSort").disabled = false;
    document.getElementById("insertionSort").disabled = false;
  }

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }



  sort(algorithmName) {
    this.disableSortButtons();
    const [animations, sortArray] = algorithms[algorithmName](this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange === true) {
        const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
      else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.restoreStoreButtons(), (animations.length - 1) * ANIMATION_SPEED_MS);
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>//{value} to check if algorithm is working or not 
        ))}

        
        <button id="generateNewArray" class="buttonstyle" style={{ marginRight: '50px' }} onClick={() => this.resetArray()}>Generate New Array</button>
        <button id="mergeSort" class="buttonstyle" style={{ marginRight: '8px' }} onClick={() => this.sort('mergeSort')}>Merge Sort</button>
        <button id="quickSort" class="buttonstyle" style={{ marginRight: '8px' }} onClick={() => this.sort('quickSort')}>Quick Sort</button>
        <button id="heapSort" class="buttonstyle" style={{ marginRight: '8px' }} onClick={() => this.sort('heapSort')}>Heap Sort</button>
        <button id="bubbleSort" class="buttonstyle" style={{ marginRight: '8px' }} onClick={() => this.sort('bubbleSort')}>Bubble Sort</button>
        <button id="insertionSort" class="buttonstyle" style={{ marginRight: '8px' }} onClick={() => this.sort('insertionSort')}>Insertion Sort</button>
        <button id="selectionSort" class="buttonstyle" style={{ marginRight: '8px' }} onClick={() => this.sort('selectionSort')}>Selection Sort</button>
        <button id="cycleSort" class="buttonstyle" style={{ marginRight: '8px' }} onClick={() => this.sort('cycleSort')}>Cycle Sort</button>

        </div>
     

    );

  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}