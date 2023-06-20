var $ = document.getElementById.bind(document);

const app = (function () {
  var students = [];

  const input = $("input");
  const submit = $("add");
  const list = $("list");

  return {
    add(student) {
      students.push(student);
    },

    render() {
      // Biến html mang mục đích nắm giữ địa chỉ bộ nhớ thay dổi sau mỗi lần lặp của map
      const html = students
        .map(function (student, index) {
          return `<li>${student} <span class="delete" data-index="${index}" style = "cursor: pointer;">- Xoá</span></li>`;
        })
        .join(""); // Xong vòng lặp map thì nối chuỗi, nối xong thì return vào bộ nhớ &html

      // Mỗi vòng lặp map khiến cho có sự thay đổi của array
      // và nó sẽ sửa giá trị trong bộ nhớ html và sẽ sửa lại innerHTML
      list.innerHTML = html;
    },

    delete(index) {
      students.splice(index, 1);
    },

    handleAdd() {
      if (input.value) this.add(input.value);
      this.render();
      input.value = "";
    },

    handleDelete(e) {
      const deleteBtn = e.target.closest(".delete");
      if (deleteBtn) {
        const index = deleteBtn.dataset.index;
        this.delete(index);
        this.render();
      }
    },

    init() {
      // Handle DOM evnets
      submit.addEventListener("click", this.handleAdd.bind(this));
      list.addEventListener("click", this.handleDelete.bind(this));
    },
  };
})();

app.init();
