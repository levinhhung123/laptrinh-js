const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();

// Kết nối tới MongoDB
mongoose.connect("mongodb://localhost:27017/Login-tut", { useNewUrlParser: true, useUnifiedTopology: true });

// Định nghĩa mô hình dữ liệu
const dataKhaosatSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    occupation: String,
    rating: String,
    favorite: [String],
    frequency: String,
    device: String,
    platform: String,
    recommend: String,
    satisfaction: String,
    improvement: String,
    favoriteGenre: String,
    streamingHours: String,
    gameGenre: String,
    liveEvents: String,
    contentSource: String,
    remark: String
});

// Tạo model từ schema
const DataKhaosat = mongoose.model('DataKhaosat', dataKhaosatSchema);

// Chuyển đổi dữ liệu thành định dạng JSON
app.use(express.json());

// Phục vụ các file tĩnh từ thư mục "public"
app.use(express.static("public"));

// Giúp express xử lý URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Sử dụng EJS làm view engine
app.set("view engine", "ejs");

// Route cho trang đăng nhập
app.get("/", (req, res) => {
    res.render("login");
});

// Route cho trang đăng ký
app.get("/signup", (req, res) => {
    res.render("signup");
});

// Đăng ký người dùng mới
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    // Kiểm tra nếu username đã tồn tại trong database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        return res.send(`
        <html>
          <head>
            <style>
              /* Căn giữa toàn bộ trang */
              html, body {
                height: 100%;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
              }
      
              /* Phần tử chứa thông báo */
              .error-message {
                background-color: #fff3cd;
                color: #856404;
                border: 1px solid #ffeeba;
                border-radius: 5px;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
      
              /* Biểu tượng cảnh báo */
              .alert-icon {
                width: 20px;
                height: 20px;
                margin-right: 10px;
              }
            </style>
          </head>
          <body>
            <div class="error-message">
              <img src="https://cdn-icons-png.freepik.com/256/6785/6785371.png" alt="Alert Icon" class="alert-icon">
              <span>Người dùng đã tồn tại. Xin hãy chọn tên người dùng khác.</span>
            </div>
          </body>
        </html>
      `);
    } else {
        // Hash password bằng bcrypt
        const saltRounds = 10; // Số vòng salt cho bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Thay thế password ban đầu bằng password đã hash

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        return res.send(`
        <html>
          <head>
            <style>
              /* Căn giữa toàn bộ trang */
              html, body {
                height: 100%;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f8f9fa; /* Nền trang */
              }
      
              /* Phần tử chứa thông báo thành công */
              .success-message {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
                border-radius: 5px;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
      
              /* Biểu tượng thành công */
              .success-icon {
                width: 30px;
                height: 30px;
                margin-right: 10px;
              }
            </style>
          </head>
          <body>
            <div class="success-message">
              <img src="https://cdn-icons-png.freepik.com/512/6785/6785304.png" alt="Success Icon" class="success-icon">
              <span>Chúc mừng bạn đã đăng ký thành công.</span>
            </div>
          </body>
        </html>
      `);
    }
});

// Đăng nhập người dùng
app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // Kiểm tra nếu người dùng là admin
        if (username === "admin" && password === "3120221057") {
            // Lấy dữ liệu khảo sát từ MongoDB
            const surveyData = await DataKhaosat.find({});
            return res.render("admin", { data: surveyData });
        }

        const check = await collection.findOne({ name: username });
        if (!check) {
            return res.send(`
            <html>
              <head>
                <style>
                  /* Căn giữa toàn bộ trang */
                  html, body {
                    height: 100%;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
          
                  /* Phần tử chứa thông báo lỗi */
                  .error-message {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                    border-radius: 5px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
          
                  /* Biểu tượng cảnh báo */
                  .alert-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                  }
                </style>
              </head>
              <body>
                <div class="error-message">
                  <img src="https://cdn-icons-png.freepik.com/256/6785/6785368.png" alt="Alert Icon" class="alert-icon">
                  <span>Tên người dùng không được tìm thấy.Vui lòng thử lại.</span>
                </div>
              </body>
            </html>
          `);
          
        }

        // So sánh password đã hash từ database với password từ người dùng nhập vào
        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (!isPasswordMatch) {
          return res.send(`
          <html>
            <head>
              <style>
                /* Căn giữa toàn bộ trang */
                html, body {
                  height: 100%;
                  margin: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
        
                /* Phần tử chứa thông báo lỗi */
                .error-message {
                  background-color: #f8d7da;
                  color: #721c24;
                  border: 1px solid #f5c6cb;
                  border-radius: 5px;
                  padding: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
        
                /* Biểu tượng cảnh báo */
                .alert-icon {
                  width: 20px;
                  height: 20px;
                  margin-right: 10px;
                }
              </style>
            </head>
            <body>
              <div class="error-message">
                <img src="https://cdn-icons-png.freepik.com/256/891/891399.png?ga=GA1.1.500343580.1716438507&semt=ais_hybrid" alt="Alert Icon" class="alert-icon">
                <span>Sai mật khẩu. Vui lòng thử lại.</span>
              </div>
            </body>
          </html>
        `);
        } else {
            return res.render("home");
        }
    } catch (error) {
        res.send("Wrong Details");
    }
});

// Route để xử lý form submission và lưu vào MongoDB
app.post("/submit-survey", async (req, res) => {
    // Dữ liệu từ form
    const surveyData = req.body;
    // Tạo một đối tượng DataKhaosat từ dữ liệu khảo sát
    const newSurvey = new DataKhaosat(surveyData);
    // Lưu vào MongoDB
    try {
        await newSurvey.save();
        // Chuyển hướng tới trang success.html
        res.redirect('/html/success.html');
    } catch (err) {
        console.error(err);
        res.status(500).send('Đã xảy ra lỗi khi lưu dữ liệu vào MongoDB');
    }
});

// Route để hiển thị trang chỉnh sửa
app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const surveyEntry = await DataKhaosat.findById(id);
        if (!surveyEntry) {
            return res.status(404).send("Entry not found");
        }
        res.render("edit", { entry: surveyEntry });
    } catch (err) {
        console.error(err);
        res.status(500).send('Đã xảy ra lỗi khi lấy dữ liệu');
    }
});

// Route để cập nhật dữ liệu
app.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        await DataKhaosat.findByIdAndUpdate(id, updatedData);
        // Redirect to admin page after update
        const surveyData = await DataKhaosat.find({});
        res.render("admin", { data: surveyData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Đã xảy ra lỗi khi cập nhật dữ liệu');
    }
});

// Route để xóa dữ liệu
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await DataKhaosat.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Đã xảy ra lỗi khi xóa dữ liệu');
    }
});

// Định nghĩa cổng cho ứng dụng
const port = 5001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
