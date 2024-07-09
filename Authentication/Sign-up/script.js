// 중복확인 코드 
const ID = '';
const NICKNAME = '';
const PASSWORD = '';
const EMAIL = '';
const AUTH_NUMBER = '';

// 아이디, 패쓰워드, 패쓰워드 확인, 이메일, 인증번호 입력
let id = '', password = '', passwordCheck = '', email = '', userName ='', nickname = '', authNumber = '', userAddress = '', userBirthDay = '';

// false(같으면 안되는 상황), true(같아야 하는 상황)으로 지정 
let isDuplicate = true, isPasswordPattern = false, isEqualPassword = false, isDuplicateNickname = true, isEmail = false, isDuplicateEmail = true, isEqualAuthNumber = false;

// const(상수지정)
const idInputElement = document.getElementById('id');
const passwordInputElement = document.getElementById('password');
const passwordCheckInputElement = document.getElementById('password-check');
const userNameInputElement = document.getElementById('user-name');
const nicknameInputElement = document.getElementById('nickname');
const emailInputElement = document.getElementById('email');
const authNumberInputElement = document.getElementById('auth-number');
const userAddressInputElement = document.getElementById('user-address');
const userBirthDayInputElement = document.getElementById('user-birth-day');

const checkIdDuplicateButtonElement = document.getElementById('check-id-duplication-button');
const checkNicknameDuplicateButtonElement = document.getElementById('check-nickname-duplication-button')
const checkEmailButtonElement = document.getElementById('check-email-button');
const checkAuthNumberButtonElement = document.getElementById('check-auth-number-button');

const idMessageElement = document.getElementById('id-message');
const passwordMessageElement = document.getElementById('password-message');
const passwordCheckMessageElement = document.getElementById('password-check-message');
const nicknameMessageElement = document.getElementById('nickname-message');
const emailMessageElement = document.getElementById('email-message');
const authNumberMessageElement = document.getElementById('auth-number-message');

const signUpButtonElement = document.getElementById('sign-up-button');
const signInLinkElement = document.getElementById('sign-in-link');

function onIdInputHandler (event) {
    id = event.target.value;
    isDuplicate = true;

    if (id) checkIdDuplicateButtonElement.className = 'input-primary-button';
    else checkIdDuplicateButtonElement.className = 'input-disable-button';
}

function onPasswordInputHandler (event) {
    password = event.target.value;

    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;
    isPasswordPattern = passwordReg.test(password);

    // 비밀번호 패턴이 일치하지 않을 때
    if (!isPasswordPattern) {
        passwordMessageElement.className = 'input-message error';
        passwordMessageElement.textContent = '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요';
        return;
    }

    // 비밀번호 패턴이 일치할 경우에만 아래 코드가 실행 
    passwordMessageElement.className = 'input-message';
    passwordMessageElement.textContent = '';
}

function onPasswordCheckInputHandler (event) {
    passwordCheck = event.target.value;

    isEqualPassword = password === passwordCheck;
    if (!isEqualPassword) {
        passwordCheckMessageElement.className = 'input-message error';
        passwordCheckMessageElement.textContent = '비밀번호가 일치하지 않습니다.';
        return;
    }
    passwordCheckMessageElement.className = 'input-message';
    passwordCheckMessageElement.textContent = '';
}

function onUserNameInputHandler (event) {
    userName = event.target.value;
}

function onNicknameInputHandler (event) {
    nickname = event.target.value;
    isDuplicateNickname = true;

    if (nickname) checkNicknameDuplicateButtonElement.className = 'input-primary-button';
    else checkNicknameDuplicateButtonElement.className = 'input-disable-button';
}

function onEmailInputHandler (event) {
    email = event.target.value;
    isEmail = false;
    isDuplicateEmail = true;

    if (email) checkEmailButtonElement.className = 'input-primary-button';
    else checkEmailButtonElement.className = 'input-disable-button';
}

function onAuthNumberInputHandler (event) {
    authNumber = event.target.value;
    isEqualAuthNumber = false;

    if (authNumber) checkAuthNumberButtonElement.className = 'input-primary-button';
    else checkAuthNumberButtonElement.className = 'input-disable-button';
}

function onUserAddressInputHandler (event) {
    userAddress = event.target.value;
}

function onUserBirthDayInputHandler (event) {
    userBirthDay = event.target.value;
}

idInputElement.addEventListener('input', function (event) {
    onIdInputHandler(event);
    setSignUpButton();
});

passwordInputElement.addEventListener('input', function (event) {
    onPasswordInputHandler(event);
    setSignUpButton();
});

passwordCheckInputElement.addEventListener('input', function (event) {
    onPasswordCheckInputHandler(event);
    setSignUpButton();
});

userNameInputElement.addEventListener('input', function (event) {
    onUserNameInputHandler(event);
    setSignUpButton();
});

nicknameInputElement.addEventListener('input', function (event) {
    onNicknameInputHandler(event);
    setSignUpButton();
});

emailInputElement.addEventListener('input', function (event) {
    onEmailInputHandler(event);
    setSignUpButton();
});

authNumberInputElement.addEventListener('input', function (event) {
    onAuthNumberInputHandler(event);
    setSignUpButton();
});

userAddressInputElement.addEventListener('input', function (event) {
    onUserAddressInputHandler(event);
    setSignUpButton();
});

userBirthDayInputElement.addEventListener('input', function (event) {
    onUserBirthDayInputHandler(event);
    setSignUpButton();
});

function onCheckIdDuplicateClickHandler (event) {
    if (!id) return;

    isDuplicate = id === ID;
    if (isDuplicate) {
        idMessageElement.className = 'input-message error';
        idMessageElement.textContent = '이미 사용중인 아이디 입니다.';
        return;
    }
    
    idMessageElement.className = 'input-message primary';
    idMessageElement.textContent = '사용 가능한 아이디 입니다.';
}

function onCheckNicknameDuplicateClickHandler (event) {
    if (!nickname) return;

    isDuplicateNickname = nickname === NICKNAME;
    if (isDuplicateNickname) {
        nicknameMessageElement.className = 'input-message error';
        nicknameMessageElement.textContent = '이미 사용중인 닉네임 입니다.';
        return;
    }
    
    nicknameMessageElement.className = 'input-message primary';
    nicknameMessageElement.textContent = '사용 가능한 닉네임 입니다.';
}

function onCheckEmailClickHandler (event) {
    if (!email) return;

    const emailReg = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    isEmail = emailReg.test(email);
    if (!isEmail) {
        emailMessageElement.className = 'input-message error';
        emailMessageElement.textContent = '이메일 형식이 아닙니다.';
        return;
    }

    isDuplicateEmail = email === EMAIL;
    if (isDuplicateEmail) {
        emailMessageElement.className = 'input-message error';
        emailMessageElement.textContent = '이미 사용중인 이메일 입니다.';
        return;
    }

    emailMessageElement.className = 'input-message primary';
    emailMessageElement.textContent = '인증번호가 전송되었습니다.';

}

function onCheckAuthNumberClickHandler (event) {
    if (!authNumber) return;

    isEqualAuthNumber = authNumber === AUTH_NUMBER;
    if (!isEqualAuthNumber) {
        authNumberMessageElement.className = 'input-message error';
        authNumberMessageElement.textContent = '인증번호가 일치하지 않습니다.';
        return;
    }
    
    authNumberMessageElement.className = 'input-message primary';
    authNumberMessageElement.textContent = '인증번호가 확인되었습니다.';
}

function onSignUpButtonClickHandler(event) {
    // 기본 폼 제출 동작 방지
    event.preventDefault();

    // 입력된 데이터 수집
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;
    const userName = document.getElementById('user-name').value;
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const authNumber = document.getElementById('auth-number').value;
    const userAddress = document.getElementById('user-address').value;
    const userBirthDay = document.getElementById('user-birth-day').value;

    const signUpMessageElement = document.getElementById('sign-up-message');

    if (!id || !password || !passwordCheck || !userName || !nickname || !email || !authNumber || !userAddress) {
        signUpMessageElement.textContent = '모든 필드를 채워주세요.';
        return;
    }

    // 모든 조건을 통과한 경우
    signUpMessageElement.textContent = '회원가입이 완료되었습니다!';
    alert('회원가입이 완료되었습니다.');
}

checkIdDuplicateButtonElement.addEventListener('click', function (event) {
    onCheckIdDuplicateClickHandler(event);
    setSignUpButton();
});

checkNicknameDuplicateButtonElement.addEventListener('click', function (event) {
    onCheckNicknameDuplicateClickHandler(event);
    setSignUpButton();
});

checkEmailButtonElement.addEventListener('click', function (event) {
    onCheckEmailClickHandler(event);
    setSignUpButton();
});

checkAuthNumberButtonElement.addEventListener('click', function (event) {
    onCheckAuthNumberClickHandler(event);
    setSignUpButton();
});

signUpButtonElement.addEventListener('click', function (event) {
    onSignUpButtonClickHandler(event);
    setSignUpButton();
});

function onSignInLinkClickHandler (event) {
    window.location.href = '../sign-in';
}

signInLinkElement.addEventListener('click', onSignInLinkClickHandler);

function setSignUpButton () {

    const isPrimaryButton = 
        id && password && passwordCheck && userName && nickname && email && authNumber && userAddress &&
        !isDuplicate && isPasswordPattern && isEqualPassword && !isDuplicateNickname && isEmail && !isDuplicateEmail && isEqualAuthNumber;

    if (isPrimaryButton) signUpButtonElement.className = 'primary-button full-width';
    else signUpButtonElement.className = 'disable-button full-width';

}