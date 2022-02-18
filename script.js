window.addEventListener("load", function () {
  const form = document.querySelector(".todo-form"); // form nhập todolist
  const wrapperTodo = document.querySelector(".toDoList"); // div bọc các todo item

    /* 
        - Biến todos sẽ lưu mảng chứa todo item
        - Và biến todos sẽ được lưu vào localStorage với key "todoList"
        - Kiểm tra nếu đã có localStorage thì lấy cái localStorage có key "todoList" (là 1 mảng) đã lưu trước đó ra thay cho mảng rỗng
        - Nếu không có (nghĩa là chưa lưu item nào) thì tạo mới 1 mảng, 
            xử lý lưu todo item sẽ thêm mảng todos đó vào localStorage với key "todoList"
        ***Code: localStorage ? this.localStorage.getItem("todoList") : [];***
    */
  let todos = localStorage.length > 0 ? JSON.parse(localStorage.getItem("todoList")) : [];

  // Hàm hiển thị todo item ra html
  function addTodoItem(value) {
    const template = `<li>${value}</li>`;
    wrapperTodo.insertAdjacentHTML("beforeend", template);
  }

  // Nếu mảng todos đã có item trong đó rồi, thì lấy item đó ra bỏ vào hàm createTodoItem để hiển thị
  if (Array.isArray(todos) && todos.length > 0) {
    [...todos].forEach((item) => addTodoItem(item));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoItemValue = this.elements["to-do"].value;
    addTodoItem(todoItemValue);

    //----------- Xử lý lưu vào localStorage -----------
    todos.push(todoItemValue); // thêm todo item vào mảng todos

    // Kiểm tra đã tồn tại localStorage chưa và lưu mảng todo vào localStorage có key "todoList"
    localStorage && localStorage.setItem("todoList", JSON.stringify(todos));

    this.elements["to-do"].value = "";
  });

  //----------- Xử lý xóa item-----------
  wrapperTodo.addEventListener("click", function (e) {
    //* Xóa todo item ra khỏi DOM
    const todoItemClicked = e.target;
    wrapperTodo.removeChild(todoItemClicked);

    //* Xóa todo item ra khỏi localStorage
    const todoText = e.target.textContent; // Lấy ra nội dung của todo item muốn xóa
    // Từ nội dung lấy ra tìm vị trí của phần tử trong list bằng cách kiểm tra nội dung của phần tử trong list với phần tử lấy ra đó
    const indexTodo = todos.findIndex((item) => item === todoText);
    todos.splice(indexTodo, 1); // Tại vị trí index đã tìm ra trên, xóa chính phần tử có index đó
    localStorage.setItem("todoList", JSON.stringify(todos)); // Cập nhập lại localStorage
  });
});
