$(document).ready(function() {
    // Kiểm tra trạng thái đăng nhập khi tải trang
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Chỉ sử dụng khóa 'user'
  
    if (loggedInUser) {
      // Nếu người dùng đã đăng nhập, cập nhật giao diện
      $('#loginLink').addClass('d-none');
      $('#logoutLink').removeClass('d-none');
      $('#registerLink').addClass('d-none');
      $('#userName').text(`Xin chào, ${loggedInUser.name}`).removeClass('d-none');
    } else {
      // Nếu chưa đăng nhập, hiển thị lại các nút đăng nhập/đăng ký
      $('#loginLink').removeClass('d-none');
      $('#logoutLink').addClass('d-none');
      $('#registerLink').removeClass('d-none');
      $('#userName').addClass('d-none').text('');
    }
  
    // Xử lý đăng xuất
    $('#logoutLink').on('click', function() {
      alert('Bạn đã đăng xuất!');
      
      // Xóa trạng thái đăng nhập
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn'); // Xóa nếu bạn không cần nữa
  
      // Hiển thị lại giao diện mặc định
      $('#loginLink').removeClass('d-none');
      $('#logoutLink').addClass('d-none');
      $('#registerLink').removeClass('d-none');
      $('#userName').addClass('d-none').text('');
    });
  });