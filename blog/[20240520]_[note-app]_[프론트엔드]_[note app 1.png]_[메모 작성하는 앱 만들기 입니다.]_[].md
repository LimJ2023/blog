
![노트이미지1](post_img/note-app/note app 1.png)

![노트이미지2](post_img/note-app/note app 2.png)

간단한 메모 작성 앱을 만들었다.

간단하지만 중요한 기능들을 배웠는데 다음과 같다.

```html
<div class="note-container">
        <div class="input-box" >
            <textarea placeholder="여기에 메모를 입력하세요..." cols="20" rows="5" maxlength="200"></textarea>
            <img src="img/delete_sweep.png" class="del-icon">
        </div>
    </div>
```
내가 보았던 유튜브 강좌에서는 p 태그 안에 contenteditable = true 속성을 지정하여
사용자가 인풋을 작성할 수 있었는데, 학원에서 배웠던 textarea 기능이 기억나 대체하기로 하였다.

그 결과 내방식대로 js코드도 만들었는데 다음과 같다.

```js
const noteContainer = document.querySelector(".note-container");
const createBtn = document.querySelector(".createBtn");
const delBtn = document.querySelector(".del-icon");
let notes = document.querySelectorAll(".input-box");

createBtn.addEventListener('click', () => {
    let inputbox = document.createElement('div');
    inputbox.className = 'input-box';
    inputbox.innerHTML = `<textarea placeholder="여기에 메모를 입력하세요..."></textarea>
    <img src="img/delete_sweep.png" class="del-icon">`;

    noteContainer.appendChild(inputbox);
})

delBtn.addEventListener('click', () => {
    const note = delBtn.closest('.input-box');
        if (note) {
            note.remove();
        }
})
```

div로 생성된 요소에 innerHTML을 사용하여 내가 원하는 HTML소스자체를 집어넣었다. 이쪽이 훨씬 편했다.

두번째로 삭제버튼을 누를 시 INPUT-BOX 부분이 삭제가 되어야 하는데 이를 .closest로 해결했다.

이 함수는 매개변수로 넣은 선택자를 가장 가까이서 찾아 반환해준다. 즉, 여러개의 똑같은 del버튼이 있더라도

버튼을 누를 때 자기자신의 input-box 클래스만 삭제하는 것이다.

이걸 알고 일일히 if문으로 값을 찾아야 하나 했던 고민이 사라졌다!



css에서도 좋은 코드가 있는데

```css
.input-box img {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 25px;
    margin-left: 10px;
    cursor: pointer;
    user-select: none;
    pointer-events: auto;
}
```

박스 안에 이미지, 요소를 집어넣어야 할 땐 position: absolute를 사용하여
강제로 탑,바텀 등으로 위치를 잡아준다.


간단한 앱이지만 중요한 요소들을 많이 배웠다.