![할일앱 이미지](post_img/todo-List/todo-app.png)

![앱 이미지2](post_img/todo-List/img2.png)
간단한 할 일 앱을 만들었다.

기초가 되는 부분이 많아 가장 먼저 만들기 좋다.

기억해야 할 코드는 이것들

css:

```css
ul li::before {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-image: url(img/radio_button_unchecked.png);
    background-size: cover;
    background-position: center;
    top: 12px;
    left: 8px;
}

ul li span:hover {
    background-color: #edeef0;
}
```

list 속성에 붙은 ::before 와 :hover속성이다.
::before는 의사 요소(pseudo-element) 선택자로 ul 안의 각 li의 앞에 내용을 삽입해준다.
이렇게 하면 li요소 앞에 글자나 이미지를 넣을 수 있다.
체크 아이콘을 넣을 때 사용했다.

:hover는 커서가 요소에 닿았을 때 활성화된다.
li span(삭제버튼) 위에 커서를 올리면 배경이 회색으로 변하게 된다.

```HTML
<input type="text" name="" id="input-box"          placeholder="할 일을 적어주세요">
<button onclick="addTask()">추가</button>
```

```JS
function addTask() {
    if(inputBox.value === '') {
        alert('할 일이 적혀있지 않습니다.')
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span)

    }
    inputBox.value = '';
    saveData();
  }
```

JS에선 document.createElement -> innerHTML -> appendChild()로 이어지는 순서를 기억하려고 한다.

```JS
listContainer.addEventListener('click', e => {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('checked')
        saveData();
    } else if(e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);
```

이 부분은 조금 어려웠는데 왜냐면 e.target 후에 코드가 어시스턴트에 따라오지 않았기 때문이다.

toggle은 토글 역할이고
parentElement.remove()는 부모요소를 선택하여 지운다.(혼자서 할 때 어떻게 삭제버튼을 눌렀을 때 다른 div까지 같이 삭제할까 고민했었는데 이 코드는 꼭 기억해두려고 한다.)
