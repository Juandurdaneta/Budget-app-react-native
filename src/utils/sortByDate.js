export const sortByDate = (arr) => {

    arr.sort(function(a, b){
        var keyA = new Date(a.date);
        var keyB = new Date(b.date);

        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;

    });


    return arr;

}