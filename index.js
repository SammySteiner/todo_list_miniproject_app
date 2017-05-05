$(document).ready(function(){
  const getall = $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/v1/todos'
  }).then(function(data){
    const rows = data.map(function(todo){
      return `<tr id="todo-${todo.id}"><td>${todo.title}</td><td><a href="#" id=${todo.id}>Details</a></td><td><button class="waves-effect waves-light btn" id=${todo.id}>Done!</button></td></tr>`
    })
      $('#todos').html(rows.join(''))
    })
getall.done(listDescriptionAndDone)
getall.done(listenToDone)
  })

$('form#create-todo').submit(function(e){
  e.preventDefault();
  const params = $(this).serialize()
  const posting = $.ajax({
    url: 'http://localhost:3000/api/v1/todos',
    method: 'POST',
    data: params
  }).then(function(todo){
    $('#todos').append(`<tr id="todo-${todo.id}"><td>${todo.title}</td><td><a href="#" id=${todo.id}>Details</a></td><td><button class="waves-effect waves-light btn" id=${todo.id}>Done!</button></td></tr>`)
    $('input#todo-title').val('')
    $('input#todo-description').val('')
  })
  posting.done(listDescriptionAndDone)
  posting.done(listenToDone)
})

const listenToDone = function(){
      $('button').on('click', function(data){
        const id = data.currentTarget.id
        $.ajax({
          url: `http://localhost:3000/api/v1/todos/${id}`,
          type: 'delete',
          success: function(response){
            $(`#todo-${response}`).html('')
          }
        })
      })
    }


const listDescriptionAndDone = function(){$('a').on('click', function(data){
  const id = data.currentTarget.id
  $.get(`http://localhost:3000/api/v1/todos/${id}`,function(todo){
    $(`#todo-${todo.id}`).html(`<td>${todo.title}</td><td>${todo.description}</td><td><button class="waves-effect waves-light btn" id=${todo.id}>Done!</button></td>`)
  }).then(listenToDone)
  })
}
