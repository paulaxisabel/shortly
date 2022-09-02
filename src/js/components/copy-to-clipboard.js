const list = document.querySelector('.js-list');
list.addEventListener('click', handleCopy);

function handleCopy(event) {
    var element = event.target;
    
    if (element.tagName == 'BUTTON') {
        copyTextToClipboard(event.target.previousElementSibling.textContent);

        resetButtons()
        event.target.textContent = 'Copied!';
        event.target.classList.remove('btn-primary');
        event.target.classList.add('btn-secondary');
    }
}

function resetButtons() {
  const copyBtn = document.querySelectorAll('.js-copy-btn');

  copyBtn.forEach(btn => {
    btn.textContent = 'Copy';
    btn.classList.remove('btn-primary');
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-primary');
  })
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
