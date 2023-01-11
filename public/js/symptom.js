// 금단증상 버튼 클릭 이벤트 (버튼 색 변경과 내용 변화가 함께 들어있음)

$(function () {
  let nameArr = [
    '신경과민',
    '우울감',
    '불안',
    '두통',
    '갈증,목, 잇몸, 혀의 통증',
    '집중력 감소',
    '소화장애',
    '기침',
    '공복감, 배고픔',
    '불면',
    '피로감',
    '따끔따끔 쑤시는 느낌',
  ]
  let symArr = [
    ' 니코틴은 안정감을 주고, 긴장을 해소하는 효과를 가지고 있습니다. 오랫동안 흡연하여 일단 중독이 되면 금연하여 니코틴 공급이 끊어졌을 때 신경계에 일대 혼란이 일어납니다. 결과적으로 신경질적이 되기 쉽고 예민하게 됩니다. 수일간 지속되다가 사라집니다.',
    ' 금연 후에 마음이 울적해지는 것은 흔히 일어나는 현상입니다. 이런 증상은 수일간 지속되다가 사라집니다. 그렇지만 우울증 때문에 담배를 다시 피우기 시작한다면 좌절감과 죄책감으로 더 우울해질 수 있습니다. ',
    ' 금연 후 자율신경 및 내분비계통의 부조화로 인해 생기는 증상입니다. 불안, 초조, 욕구불만, 노여움 등의 증상과 같이 나타나기도 합니다. 대개 생활 속에서 겪는 일들과 연결되어 있어 금단 증상임을 깨닫기 어려운 경우가 많습니다. 수일간 지속되다가 사라집니다.',
    ' 보통 금연하는 사람의 4명 중 1명에게 나타날 수 있는 증상입니다. 혈액순환 속도가 조금 느려지면서 뇌로 가는 혈액과 산소를 충분히 얻지 못해서 나타나는 증상입니다. 수주일 이내에 사라집니다.',
    ' 이러한 증상은 입안에 항상 존재하면서 영향을 주던 화학물질에 의해 길들여졌다가 구강의 조직들이 회복되는 과정에서 일어나는 증상으로 수주일간 지속되다가 사라집니다.',
    ' 금연 후 정신 집중이 되지 않아서 일을 할 수 없다는 사람이 있습니다. 이 또한 금단 증상의 하나이고, 금연 후 대개 2주~수주 이내에 사라집니다.',
    ' 장 운동이 느려질 수 있습니다. 소화가 잘 안되고 변비가 생기고 가스가 찰 수 있습니다. 보통 1~2주 정도 지속 될 수 있습니다.',
    ' 기침은 니코틴 금단증상과 관련이 없습니다. 이것은 기도를 막고 호흡을 힘들게 했던 가래와 타르를 제거하기 위한 신체의 정상적인 방어 과정이라고 볼 수 있습니다. 금연 후 수일 동안 지속되다가 사라집니다.',
    ' 대부분의 사람들이 금연 후 느낄수 있는 증상으로 평소에 먹던 양보다 더 많이 먹으려는 경향이 생기고 음식물에 대한 적응이 잘 이루어지면서 체중이 증가하는 것을 흔히 볼 수 있습니다. 수 주일 이내에 사라집니다.',
    ' 금단증상으로 수면장애가 발생하거나 두통,신경과민, 기침 등의 증상에 의해서 수면장애가 발생합니다.',
    ' 여러 금단 증상과 더불어 쉽게 피로감을 느낄 수 있습니다.',
    ' 따끔따끔 쑤시는 느낌 (특히 다리와 팔)은 산소 공급이 다시 정상적으로 이루어지면서 나타나는 현상입니다.',
  ]

  let methodArr = [
    '1) 휴식을 취하고 신선한 공기를 마시며 산책하기 <br> 2) 운동 시작하기 <br> 3) 심호흡을 함으로써 긴장을 완시키기 <br> 4) 경험했던 조용하고 평화로운 장면 생각하기',
    '1) 운동을 하여 땀을 흘리고, 물 많이 마시기 <br> 2) 몸을 편하게 눕히는 이완 운동하기 <br> 3) 따뜻한 물로 샤워하기 <br> 4) 과일 쥬스 마시기 <br> 5) 즐거운 생각하기',
    '1) 온수로 목욕 또는 샤워 <br> 2) 가벼운 산책 또는 운동 <br> 3) 누워서 쉬기 <br>  4) 경험했던 조용하고 평화로운 장면 생각하기',
    '1) 물을 많이 마시고, 커피를 줄인다 <br> 2) 가벼운 운동 <br>  3) 온수로 목욕 또는 샤워 <br> 4) 신선한 공기를 위해 창문을 열거나 가벼운 산책하기 <br> 5) 5분간 누워서 휴식 취하기',
    '1) 얼음물 또는 주스를 한 모금씩 마시기 <br> 2) 껌을 씹으면 도움이 됨 <br> 3) 심호흡 <br> 4) 양치질',
    '1) 휴식을 취하고 마음을 편히 갖고 심호흡을 하는 것이 도움이 된다. <br> 2) 많이 힘들면 잠깐 일을 중단하고 아예 눈을 붙이는 것이 좋다.',
    '1) 고지방 음식, 단 음식, 카페인 함량이 많은 음식 등의 섭취를 피한다. <br> 2) 자극적인 음식을 피한다. <br> 3) 섬유소가 많은 음식 섭취',
    '1) 물 많이 마시기 <br> 2) 항생제를 사용하지 않는다. <br> 3) 가능한 기침을 약하게 한다. ',
    '1) 그때마다 칼로리가 낮은 스낵이나 음료를 마시는 것과 적당한 운동이 도움이 된다.',
    '1) 오후 6시 이후에는 카페인이 함유된 음료를 마시지 않도록 하고 긴장을 풀고 명상시도 한다. <br> 2) 잠자리에 들기 전에 따뜻한 샤워를 하는 것도 숙면에 도움이 된다.',
    '1) 금단 증상이 심한 2주간은 무리한 일을 피하고 잠깐씩 자는 것이 도움이 될 수 있다. <br> 2) 미리 주변에 양해를 구하고 금단 증상과 함께 피로감이 올 수 있음을 알린다.',
    '1) 따뜻한 물로 목욕을 한다 <br> 2) 따끔거리는 곳을 마사지 해준다 <br> 3) 가벼운 산책을 한다.',
  ]

  $('#symp_btn_4D').on('click', function () {
    $('.symp_contents_4D').addClass('active')
    $('.symp_contents_exception_4D').removeClass('active')
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_0').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[0])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[0])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[0])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_1').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[1])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[1])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[1])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_2').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[2])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[2])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[2])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_3').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[3])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[3])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[3])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_4').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[4])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[4])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[4])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_5').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[5])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[5])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[5])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_6').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[6])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[6])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[6])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_7').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[7])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[7])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[7])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_8').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[8])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[8])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[8])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_9').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[9])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[9])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[9])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_10').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[10])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[10])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[10])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_11').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[11])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[11])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[11])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })

  $('#symp_btn_12').on('click', function () {
    $('.symp_contents_exception_4D').addClass('active')
    $('.symp_contents_4D').removeClass('active')
    $('.symp_contents_exception_4D h1').html(nameArr[12])
    $('.symp_contents_exception_4D .contents_under p').eq(0).html(symArr[12])
    $('.symp_contents_exception_4D .contents_under p').eq(1).html(methodArr[12])
    $('.symp_btn_remove').removeClass('active')
    $(this).addClass('active')
  })
})
