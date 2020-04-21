//Sleep Sort. LOL =)

let arr = [1, 44, 56, 23, 7, 100];

const sleepSort = (arr) => {
    arr.forEach(el => {
        setTimeout(() => {
            console.log(el);
        }, el);
    });
};

sleepSort(arr);

//Output:
//1
//7
//23
//44
//56
//100