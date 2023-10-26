const join = async email => {
  const url = 'https://ipfs.lateralthink.club/mailchimp/rackz/join';
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: email })
  }
  const resp = await fetch(url, opts);
  if (resp.ok) {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 100,
      scalar: 3,
      shapes: ["image"],
      shapeOptions: {
        image: [
          {
            src: "./logo.svg",
            width: 32,
            height: 32,
          }
        ]
      }
    });
  } else {
    const err = await resp.json();
    throw new Error('Error joining', { cause: err.detail });
  }
}

const joinDesktop = async e => {
  e.preventDefault();
  try {
    await join(e.target.email.value);
    e.target.email.value = '';
  } catch (err) { console.log(err.cause) }
}

const joinMobile = async e => {
  e.preventDefault();
  try {
    await join(e.target['mobile-email'].value);
    e.target['mobile-email'].value = '';
  } catch (err) { console.log(err.cause) }
}

const sendMsg = async form => {
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(form)).toString(),
  }
  try {
    await fetch('/', opts);
    console.log('done')
  } catch (err) { console.log(err) }
}

window.addEventListener('load', () => {
  const burger = document.getElementById('burger');
  burger.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.remove('hidden');
    const close = document.getElementById('close-menu');
    close.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });

  const joinForm = document.getElementById('join');
  joinForm.addEventListener('submit', joinDesktop);
  const mobileJoinForm = document.getElementById('mobile-join');
  mobileJoinForm.addEventListener('submit', joinMobile);

  if (window.cookieconsent) {
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#000"
        },
        "button": {
          "background": "#c8c3b7"
        },
      }
    });
  }
});