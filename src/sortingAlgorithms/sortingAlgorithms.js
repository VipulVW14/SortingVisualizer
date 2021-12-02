export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

/*BUBBLE SORT*/
export function getBubbleSortAnimations(array) {
  let animations  = [];
  let auxillaryArray = array.slice();
  bubbleSort(auxillaryArray, animations);
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ",arraysAreEqual(javaScriptSortedArray, auxillaryArray));
  array = auxillaryArray;
  return [animations, array];
}

function bubbleSort(auxillaryArray, animations) {
  const N = auxillaryArray.length;
  let iters = N - 1;
  while(iters > 0) {
      let swapped = false;
      for(let i = 0; i < iters; ++i) {
          animations.push(["comparision1", i, i + 1]);
          animations.push(["comparision2", i, i + 1]);
          if(auxillaryArray[i] > auxillaryArray[i + 1]) {
              swapped = true;
              animations.push(["swap", i, auxillaryArray[i + 1]]);
              animations.push(["swap", i + 1, auxillaryArray[i]]);
              swap(auxillaryArray, i, i + 1);
          }
      }
      if(swapped === false) break;
      iters--;
  }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}

function arraysAreEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
      return false;
  }
  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
}