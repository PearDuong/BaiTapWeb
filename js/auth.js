$(document).ready(function () {
  // Xử lý đăng ký
  $('#registerForm').on('submit', function (e) {
      e.preventDefault();
      const name = $('#regName').val(); // Lấy giá trị tên người dùng
      const email = $('#regEmail').val(); // Lấy giá trị email
      const password = $('#regPassword').val(); // Lấy giá trị mật khẩu

      if (name && email && password) {
          const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng từ localStorage
          const userExists = users.some((user) => user.email === email); // Kiểm tra xem email đã tồn tại hay chưa

          if (userExists) {
              alert('Email đã được sử dụng, vui lòng chọn email khác!');
          } else {
              users.push({ name, email, password }); // Thêm người dùng mới vào danh sách
              localStorage.setItem('users', JSON.stringify(users)); // Lưu danh sách người dùng vào localStorage
              alert('Đăng ký thành công!');
              $('#registerModal').modal('hide'); // Ẩn modal đăng ký
          }
      } else {
          alert('Vui lòng điền đầy đủ thông tin!');
      }
  });

  // Xử lý đăng nhập
  $('#loginForm').on('submit', function (e) {
      e.preventDefault();
      const email = $('#loginEmail').val(); // Lấy giá trị email
      const password = $('#loginPassword').val(); // Lấy giá trị mật khẩu

      // Kiểm tra thông tin đăng nhập từ localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng
      const user = users.find((u) => u.email === email && u.password === password); // Tìm người dùng theo email và password

      if (user) {
          alert(`Đăng nhập thành công! Xin chào, ${user.name}`);
          $('#loginModal').modal('hide'); // Ẩn modal đăng nhập

          // Lưu thông tin người dùng hiện tại vào localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Cập nhật giao diện
          $('#loginLink').addClass('d-none');
          $('#logoutLink').removeClass('d-none');
          $('#registerLink').addClass('d-none'); // Ẩn nút Đăng ký
          $('#userName').text(`Xin chào, ${user.name}`).removeClass('d-none'); // Hiển thị tên người dùng
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
      $('#registerLink').removeClass('d-none'); // Hiển thị lại nút Đăng ký
      $('#userName').addClass('d-none').text(''); // Ẩn tên người dùng
  });

  // Kiểm tra trạng thái đăng nhập khi tải trang
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Lấy thông tin người dùng hiện tại từ localStorage
  if (currentUser) {
      // Nếu người dùng đã đăng nhập, cập nhật giao diện
      $('#loginLink').addClass('d-none');
      $('#logoutLink').removeClass('d-none');
      $('#registerLink').addClass('d-none');
      $('#userName').text(`Xin chào, ${currentUser.name}`).removeClass('d-none'); // Hiển thị tên người dùng
  }
});