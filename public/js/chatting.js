// 메시지 입력 요청 이벤트

$(function () {
  document.querySelector('form').addEventListener('submit', function (e) {
    if (document.querySelector('.chat_text_input').value == '') {
      e.preventDefault()
      $('.chat_request').addClass('active')
      $('.chat_request_bg').addClass('active')
    }
  })
  $('.chat_request p')
    .eq(1)
    .on('click', function () {
      $('.chat_request').removeClass('active')
      $('.chat_request_bg').removeClass('active')
    })
})

// 채팅 날짜

$(function () {
  function date() {
    let now = new Date()
    let hou2 = now.getHours()
    let min = now.getMinutes()

    Number.prototype.pad = function (num) {
      for (var n = this.toString(); n.length < num; n = 0 + n);
      return n
    }

    let houEl2 = hou2.pad(2)
    let minEl = min.pad(2)

    let dateValue = document.querySelector('.date_input')

    dateValue.value = `${houEl2}:${minEl}`
  }
  date()
})
