const SortLib = {
    printStats: function(methodName, comparisons, swaps, hasUndefined) {
        console.log(`--- ${methodName} ---`);
        console.log(`Порівнянь: ${comparisons}`);
        console.log(`Обмінів/Переміщень: ${swaps}`);
        if (hasUndefined) {
            console.log("Виявлено елементи undefined");
        }
    },

    prepareArray: function(arr) {
        let hasUndefined = false;
        let cleanArr = [];
        let undefinedCount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                hasUndefined = true;
                undefinedCount++;
            } else {
                cleanArr.push(arr[i]);
            }
        }
        return { cleanArr, undefinedCount, hasUndefined };
    },

    bubbleSort: function(inputArray, ascending = true) {
        let { cleanArr: arr, undefinedCount, hasUndefined } = this.prepareArray(inputArray);
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                comparisons++;
                let condition = ascending ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
                if (condition) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swaps++;
                }
            }
        }
        
        const result = arr.concat(new Array(undefinedCount).fill(undefined));
        this.printStats("Сортування обміном", comparisons, swaps, hasUndefined);
        return result;
    },

    selectionSort: function(inputArray, ascending = true) {
        let { cleanArr: arr, undefinedCount, hasUndefined } = this.prepareArray(inputArray);
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < arr.length - 1; i++) {
            let minMaxIdx = i;
            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;
                let condition = ascending ? arr[j] < arr[minMaxIdx] : arr[j] > arr[minMaxIdx];
                if (condition) minMaxIdx = j;
            }
            if (minMaxIdx !== i) {
                [arr[i], arr[minMaxIdx]] = [arr[minMaxIdx], arr[i]];
                swaps++;
            }
        }

        const result = arr.concat(new Array(undefinedCount).fill(undefined));
        this.printStats("Сортування мінімальних елементів", comparisons, swaps, hasUndefined);
        return result;
    },

    insertionSort: function(inputArray, ascending = true) {
        let { cleanArr: arr, undefinedCount, hasUndefined } = this.prepareArray(inputArray);
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0) {
                comparisons++;
                let condition = ascending ? arr[j] > key : arr[j] < key;
                if (condition) {
                    arr[j + 1] = arr[j];
                    swaps++;
                    j--;
                } else break;
            }
            arr[j + 1] = key;
        }

        const result = arr.concat(new Array(undefinedCount).fill(undefined));
        this.printStats("Сортування вставками", comparisons, swaps, hasUndefined);
        return result;
    },

    shellSort: function(inputArray, ascending = true) {
        let { cleanArr: arr, undefinedCount, hasUndefined } = this.prepareArray(inputArray);
        let comparisons = 0, swaps = 0;
        let n = arr.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j;
                for (j = i; j >= gap; j -= gap) {
                    comparisons++;
                    let condition = ascending ? arr[j - gap] > temp : arr[j - gap] < temp;
                    if (condition) {
                        arr[j] = arr[j - gap];
                        swaps++;
                    } else break;
                }
                arr[j] = temp;
            }
        }

        const result = arr.concat(new Array(undefinedCount).fill(undefined));
        this.printStats("Сортування Шелла", comparisons, swaps, hasUndefined);
        return result;
    },

    quickSort: function(inputArray, ascending = true) {
        let { cleanArr: arr, undefinedCount, hasUndefined } = this.prepareArray(inputArray);
        let comparisons = 0, swaps = 0;

        const partition = (low, high) => {
            let pivot = arr[Math.floor((low + high) / 2)];
            let i = low, j = high;
            while (i <= j) {
                if (ascending) {
                    while (arr[i] < pivot) { comparisons++; i++; }
                    while (arr[j] > pivot) { comparisons++; j--; }
                } else {
                    while (arr[i] > pivot) { comparisons++; i++; }
                    while (arr[j] < pivot) { comparisons++; j--; }
                }
                comparisons++;
                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swaps++;
                    i++;
                    j--;
                }
            }
            return i;
        };

        const sort = (low, high) => {
            if (arr.length <= 1) return;
            let index = partition(low, high);
            if (low < index - 1) sort(low, index - 1);
            if (index < high) sort(index, high);
        };

        sort(0, arr.length - 1);
        const result = arr.concat(new Array(undefinedCount).fill(undefined));
        this.printStats("Сортування Хоара", comparisons, swaps, hasUndefined);
        return result;
    }
};
