(function () {
  var form = document.getElementById('evaluation-form');
  if (!form) return;

  var skillNames = [
    'serve', 'pass', 'set', 'attack', 'block', 'defense',
    'attitude', 'leadership', 'coachable',
    'sides', 'forward', 'backward', 'shuffle', 'crossover',
    'spiking-approach', 'reaction', 'retract', 'transition'
  ];

  function getFormData() {
    var data = {};
    var inputs = form.querySelectorAll('input, select');
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      var name = el.name;
      if (!name) continue;
      if (el.type === 'radio' && !el.checked) continue;
      if (el.type === 'checkbox') {
        data[name] = el.checked ? 'yes' : 'no';
      } else {
        data[name] = el.value;
      }
    }
    skillNames.forEach(function (name) {
      var r = form.querySelector('input[name="' + name + '"]:checked');
      if (r) data[name] = r.value;
    });
    return data;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = getFormData();
    var submitUrl = typeof CONFIG !== 'undefined' && CONFIG.SUBMIT_URL ? CONFIG.SUBMIT_URL : '';

    if (!submitUrl) {
      alert('Form is not connected to a server yet.\n\nPlease set SUBMIT_URL in config.js (see SETUP.md for Google Apps Script setup).');
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    var f = document.createElement('form');
    f.method = 'POST';
    f.action = submitUrl;
    f.target = 'submit-frame';
    f.style.display = 'none';
    var input = document.createElement('input');
    input.name = 'data';
    input.value = JSON.stringify(data);
    f.appendChild(input);
    document.body.appendChild(f);

    var iframe = document.getElementById('submit-frame');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.name = 'submit-frame';
      iframe.id = 'submit-frame';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    var done = function () {
      btn.textContent = 'Submitted!';
      btn.disabled = false;
      alert('Evaluation submitted successfully. Thank you!');
      form.reset();
      setTimeout(function () { btn.textContent = originalText; }, 2000);
      try { document.body.removeChild(f); } catch (x) {}
    };

    iframe.onload = function () { setTimeout(done, 500); };
    f.submit();
    setTimeout(function () {
      if (btn.textContent === 'Submitting…') {
        btn.textContent = originalText;
        btn.disabled = false;
        try { document.body.removeChild(f); } catch (x) {}
      }
    }, 10000);
  });

  var shareBtn = document.getElementById('share-whatsapp');
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var formUrl = (typeof CONFIG !== 'undefined' && CONFIG.FORM_URL) ? CONFIG.FORM_URL : (window.location.origin + window.location.pathname);
      var text = 'Bulldogs Volleyball Club – Player self-evaluation form. Please rate yourself and submit: ' + formUrl;
      var url = 'https://wa.me/?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }
})();
