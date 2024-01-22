// Khai báo mảng ngày trong tuần
var y = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

// Nhập giá trị x
var x = 5;

// Sử dụng switch case để xác định ngày của tuần dựa trên chỉ mục
switch (x) {
    case 1:
        console.log("Ngày thứ " + x + " là " + y[x - 1]);
        break;
    case 2:
        console.log("Ngày thứ " + x + " là " + y[x - 1]);
        break;
    case 3:
        console.log("Ngày thứ " + x + " là " + y[x - 1]);
        break;
    case 4:
        console.log("Ngày thứ " + x + " là " + y[x - 1]);
        break;
    case 5:
        console.log("Ngày thứ " + x + " là " + y[x - 1]);
        break;
    case 6:
        console.log("Ngày thứ " + x + " là " + y[x - 1]);
        break;
    case 7:
        console.log("Ngày thứ " + x + " là " + y[x - 1]);
        break;
    default:
        console.log("Giá trị không hợp lệ.");
}