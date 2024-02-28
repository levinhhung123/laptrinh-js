function findMaxMin(arr) {
    if (arr.length === 0) {
        return "Mảng trống";
    }
    
    let max = arr[0];
    let min = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    
    return [max, min];
}


const arr = [2, 3, 4, 5];
const [max, min] = findMaxMin(arr);
console.log("Số lớn nhất:", max);
console.log("Số nhỏ nhất:", min);