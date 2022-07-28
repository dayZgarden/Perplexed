
export const randomizeArray = (arr, incorrect) => {
    for(let i = 1; i < 4; i++){
        arr[i] = incorrect[i-1];
    }
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}