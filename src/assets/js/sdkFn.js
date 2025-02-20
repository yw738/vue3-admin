var phoneUa = null;

function regisetPhone(params) {
    let extCode = '1003'; //1057
    let addr = 'ad-saas.top' || '140.210.200.232'; //test.cxcall.cn
    let extPass = 'aobo#8123*635'; //sadjk76%Gsd#k1
    phoneUa = new SIP.SDK.cxWebPhone({
        userName: extCode,
        password: extPass,
        server: addr,
        traceSip: false,
        builtinEnabled: true,
        audioElement: 'remoteAudio',
        in: {
            terminated: (response, cause, type) =>
                webPhoneEvent(response, cause, type),
            accepted: (response, cause, type) => webPhoneEvent(response, cause, type),
            bye: (response, cause, type) => webPhoneEvent(response, cause, type),
            rejected: (response, cause, type) => webPhoneEvent(response, cause, type),
            failed: (response, cause, type) => webPhoneEvent(response, cause, type)
        },
        ua: {
            invite: (response, type) => webPhoneUa(response, type),
            registered: (response, type) => webPhoneUa(response, type),
            unregister: (response, cause, type) =>
                webPhoneEvent(response, cause, type),
            registrationFailed: (response, cause, type) =>
                webPhoneEvent(response, type),
            connecting: (response, type) => webPhoneUa(response, type),
            connected: (response, type) => webPhoneUa(response, type),
            disconnecting: (response, type) => webPhoneUa(response, type),
            disconnected: (response, type) => webPhoneUa(response, type)
        }
    });
}

function callPhone(num) {
    // let callPhone = document.getElementById('callPhone').value;
    // debugger;
    new SIP.SDK.callWebPhone({
        phoneNumber: num,
        out: {
            progress: (response, cause, type) => webPhoneEvent(response, cause, type),
            accepted: (response, cause, type) => webPhoneEvent(response, cause, type),
            rejected: (response, cause, type) => webPhoneEvent(response, cause, type),
            failed: (response, cause, type) => webPhoneEvent(response, cause, type),
            terminated: (response, cause, type) =>
                webPhoneEvent(response, cause, type),
            bye: (response, cause, type) => webPhoneEvent(response, cause, type)
        }
    });
}

function webPhoneEvent(response, cause, type) {
    console.warn('type,response, cause', type, response, cause);
}

function webPhoneUa(response, type) {
    console.warn('type,response', type, response);
    if (type === 'ua.invite') {
        var msg = response.remoteIdentity.uri.user + '来电了，是否接听';
        if (confirm(msg) == true) {
            response.answer();
        } else {
            response.reject();
        }
    }
}

function hangupPhone() {
    phoneUa.hangup();
}

function unregisetPhone(params) {
    phoneUa.unregister();
}

function startWeb() {
    phoneUa.start();
}

function stopWeb() {
    phoneUa.stop();
}

window.regisetPhone = regisetPhone;
window.callPhone = callPhone;