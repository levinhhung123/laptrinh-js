//bind
var checkNumericRange = function (value){
    if(typeof value !== 'number')
        return false;
    else
        return value >= this.minimum && value <= this.maximum;
}
var range = {minimum:10,maximum:20};
var boundCheckNumericRange = checkNumericRange.bind(range);
var result = boundCheckNumericRange(12);
console.log(result);