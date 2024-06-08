function isPrime(number) {
    // Kiểm tra nếu số đầu vào là 2 hoặc 3, đều là số nguyên tố
    if (number === 2 || number === 3) {
        return true;
    }

    // Kiểm tra nếu số đầu vào là số chẵn hoặc là số nhỏ hơn 2, không phải là số nguyên tố
    if (number % 2 === 0 || number < 2) {
        return false;
    }

    // Kiểm tra từ 3 đến căn bậc hai của số đầu vào, nếu có ước số nào thì không phải là số nguyên tố
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
        if (number % i === 0) {
            return false;
        }
    }

    // Nếu qua được tất cả các kiểm tra, số đầu vào là số nguyên tố
    return true;
}

// Ví dụ sử dụng hàm
let numberToCheck = 17;
if (isPrime(numberToCheck)) {
    console.log(`${numberToCheck} là số nguyên tố.`);
} else {
    console.log(`${numberToCheck} không là số nguyên tố.`);
}