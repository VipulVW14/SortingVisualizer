export function getHeapSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    heapSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

/*
function buildHeap(auxillaryArray, N, animations){
    for(let i = (N-2)/2; i>=0; i--){
        maxHeapify(auxillaryArray, N, i, animations);
    }

}*/

function heapSort(auxillaryArray, animations){
    const N = auxillaryArray.length;
    for(let i = (N-2)/2; i>=0; i--){
        maxHeapify(auxillaryArray, N, i, animations);
    }
    //buildHeap(auxillaryArray, N, animations);
    for(let i=N-1; i>=1; i--){
        animations.push(["swap", i, auxillaryArray[0]]);
        animations.push(["swap", 0, auxillaryArray[i]]);
        swap(auxillaryArray, i, 0);
        maxHeapify(auxillaryArray, i, 0, animations);
    }
}

function maxHeapify(auxillaryArray, N, i, animations){
    let largest=i;
    const left=2*i+1;
    const right=2*i+2;
    if(left<N && auxillaryArray[left]>auxillaryArray[largest]){
        animations.push(["comparision1", largest, left]);
        animations.push(["comparision2", largest, left]);
        largest = left;
    }
    if(right<N && auxillaryArray[right]>auxillaryArray[largest]){
        animations.push(["comparision1", right, largest]);
        animations.push(["comparision2", right, largest]);
        largest = right;
    }
    if(largest!=i){
        animations.push(["swap", i, auxillaryArray[largest]]);
        animations.push(["swap", largest, auxillaryArray[i]]);
        swap(auxillaryArray, i, largest);
        maxHeapify(auxillaryArray, N, largest, animations);
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


/*Heap sort logic

void maxHeapify(a[], n, i){
    let largest=i;
    let left=2*i+1, right=2*i+2;
    if(left<n && a[left]>a[largest]){
        largest=left;
    }
    if(right<n && a[right]>a[largest]){
        largest=right;
    }
    if(largest != i){
        swap(a[largest], a[i]);
        maxHeapify(a, n, largest);
    }
}

void buildheap(int a[], int n){
    for(let i = (n-2)/2; i>=0; i--){
        maxHeapify(a, n, i);
    }
}

void HeapSort(int a[], int n){
    buildHeap(a, n);
    for(let i=n-1; i>=1; i--){
        swap(a[i], a[0]);
        maxHeapify(a[], n, i);
    }
}

HeapSort(){

}

*/