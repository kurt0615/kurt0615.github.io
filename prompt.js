let btnAdd;
window.addEventListener('load', () => {
    btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', function (event) {
        defferedPrompt.prompt();
        defferedPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome == 'accepted') {
                console.log('User Click Accepted');
            }
            defferedPrompt = null;
        });
    });
});

let defferedPrompt;
window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt')
    event.preventDefault();
    defferedPrompt = event;
    btnAdd.style.display = 'block';
  });

  
window.addEventListener('appinstalled', function (event) {
    console.log('appinstalled')
})