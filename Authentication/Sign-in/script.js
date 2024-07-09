const ID = '';
const PASSWORD = '';

function onSignInButtonClickHandler(event) {
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    const signInMessageElement = document.getElementById('sign-in-message');
    if (id === ID && password === PASSWORD) {
        alert('로그인 성공!');
    } else {
        signInMessageElement.textContent = '로그인 정보가 일치하지 않습니다.';
    }
}

function onSignUpButtonClickHandler(event) {
    // 페이지 이동 기능
    window.location.href = '../sign-up';
}

const signUpLinkElement = document.getElementById('sign-up-link');
signUpLinkElement.addEventListener('click', onSignUpLinkClickHandler);