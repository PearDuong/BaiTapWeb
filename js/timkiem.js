function levenshteinDistance(a, b) {
    const matrix = [];
  
    // Khởi tạo ma trận
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Lặp qua để tính khoảng cách
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // Thay thế
            matrix[i][j - 1] + 1,     // Thêm
            matrix[i - 1][j] + 1      // Xóa
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
  
  function searchProduct() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
  
    // So khớp sản phẩm gần đúng
    const matches = allProducts.map(product => ({
      product,
      distance: levenshteinDistance(product.name.toLowerCase(), searchInput)
    }));
  
    // Chọn sản phẩm có khoảng cách nhỏ nhất
    const bestMatch = matches.reduce((prev, current) => (current.distance < prev.distance ? current : prev), { distance: Infinity });
  
    // Ngưỡng tối đa cho khoảng cách chỉnh sửa (tuỳ chỉnh, ví dụ: 5)
    if (bestMatch.distance <= 5) {
      window.location.href = bestMatch.product.link; // Chuyển hướng tới sản phẩm
    } else {
      alert('Không tìm thấy sản phẩm phù hợp. Vui lòng thử lại!');
    }
  }