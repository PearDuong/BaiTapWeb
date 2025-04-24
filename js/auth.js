$(document).ready(function () {
    const safeJSONParse = (key) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (e) {
        console.error(`Lỗi khi parse JSON từ localStorage key: ${key}`, e);
        return null;
      }
    };
  
    // Xử lý đăng ký
    $('#registerForm').on('submit', function (e) {
      e.preventDefault();
  
      const name = $('#regName').val().trim();
      const email = $('#regEmail').val().trim();
      const password = $('#regPassword').val();
      const confirmPassword = $('#regConfirmPassword').val();
  
      // Kiểm tra các điều kiện
      if (!name || !email || !password || !confirmPassword) {
        alert('Vui lòng điền đầy đủ tất cả các ô!');
        return;
      }
  
      if (!/^[a-zA-Z]/.test(name)) {
        alert('Tên phải bắt đầu bằng chữ cái!');
        return;
      }
  
      // Kiểm tra định dạng email bằng regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ, vui lòng nhập đúng định dạng email!');
        return;
    }
  
      if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
      }
  
      // Lấy danh sách người dùng từ localStorage
      const users = safeJSONParse('users') || [];
      const userExists = users.some((user) => user.email === email);
  
      if (userExists) {
        alert('Email đã được sử dụng, vui lòng chọn email khác!');
      } else {
        // Thêm người dùng mới vào danh sách và lưu vào localStorage
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
  
        alert('Đăng ký thành công!');
        $('#registerModal').modal('hide'); // Ẩn modal đăng ký
      }
    });
  
    // Xử lý đăng nhập
    $('#loginForm').on('submit', function (e) {
      e.preventDefault();
      const email = $('#loginEmail').val().trim();
      const password = $('#loginPassword').val();
  
      // Kiểm tra thông tin đăng nhập từ localStorage
      const users = safeJSONParse('users') || [];
      const user = users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        alert(`Đăng nhập thành công! Xin chào, ${user.name}`);
        $('#loginModal').modal('hide'); // Ẩn modal đăng nhập
  
        // Lưu thông tin người dùng hiện tại vào localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
  
        // Cập nhật giao diện
        $('#loginLink').addClass('d-none');
        $('#logoutLink').removeClass('d-none');
        $('#registerLink').addClass('d-none');
        $('#userName').text(`Xin chào, ${user.name}`).removeClass('d-none');
      } else {
        alert('Sai email hoặc mật khẩu!');
      }
    });
  
    // Xử lý đăng xuất
    $('#logoutLink').on('click', function () {
      alert('Bạn đã đăng xuất!');
  
      // Xóa thông tin người dùng hiện tại khỏi localStorage
      localStorage.removeItem('currentUser');
  
      // Cập nhật giao diện
      $('#loginLink').removeClass('d-none');
      $('#logoutLink').addClass('d-none');
      $('#registerLink').removeClass('d-none');
      $('#userName').addClass('d-none').text('');
    });
  
    // Đảm bảo xóa backdrop khi modal đóng
    $('#registerModal, #loginModal').on('hidden.bs.modal', function () {
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    });
  
    // Kiểm tra trạng thái đăng nhập khi tải trang
    const currentUser = safeJSONParse('currentUser');
    if (currentUser) {
      $('#loginLink').addClass('d-none');
      $('#logoutLink').removeClass('d-none');
      $('#registerLink').addClass('d-none');
      $('#userName').text(`Xin chào, ${currentUser.name}`).removeClass('d-none');
    }
  });