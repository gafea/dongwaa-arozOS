const bottombarbuttons = [
  'Browse,/dongwaa/_browse/,' + resourceNETpath + 'image/browse.png',
  'Today,/dongwaa/,' + resourceNETpath + 'image/dongwaa.png',
  'Library,/dongwaa/_library/,' + resourceNETpath + 'image/dig.png',
  'Search,/dongwaa/_dig/,' + resourceNETpath + 'image/search.png',
  'Settings,/dongwaa/_setting/,' + resourceNETpath + 'image/settings.png'
]

function init(path) {
  if (path == undefined || path === '/') {
    return `<meta http-equiv="refresh" content="0;URL=/dongwaa/">`

  } else if (path === '/dongwaa/' || path.startsWith('/dongwaa/_')) { 
    if (path === '/dongwaa/') {
      return `<div class="edge2edge card"><button class="aobh" style="background:none" onclick="boot('/dongwaa/2021-10_w7-23h 無職轉生 1B')">2021-10_w7-23h 無職轉生 1B</button></div>` + renderBottomBar(path)

    } else if (path.startsWith('/dongwaa/_dig/')) {
      return `<div class="edge2edge card">` + path + '</div>' + renderBottomBar(path)
      
    } else if (path.startsWith('/dongwaa/_browse/')) {
      return `<div class="edge2edge card" id="dump">` + path + '</div>' + renderBottomBar(path)

    } else if (path.startsWith('/dongwaa/_library/')) {
      return `<div class="edge2edge card">` + path + '</div>' + renderBottomBar(path)

    } else if (path.startsWith('/dongwaa/_setting/')) {
      return `<div class="edge2edge card">` + path + '</div>' + renderBottomBar(path)

    } else {
      return `<meta http-equiv="refresh" content="0;URL=/dongwaa/">`

    }

  } else if (path.startsWith('/dongwaa/')) { 
    return `` + renderTopBar('HTMLui: ' + path, 'This page shows the element UI of your browser', '', true) + `<div class="card">
            <strong>HTMLui</strong><br>
This page shows the element UI of your browser.<br>
<hr><h1>h1</h1><h2>h2</h2><h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6><p1>p1</p1><p2>p2</p2><p3>p3</p3><p4>p4</p4><p5>p5</p5><p6>p6</p6><hr>
<img src="https://cakko.ml/hid/u1.jpg"><br>
<img src="https://cakko.ml/hid/u1d.jpg"><br>
<img src="https://cakko.ml/hid/ck.png"><br>
<button type="button">Button</button><br>
<button type="button" disabled="true">Disabled Button</button> <br>
<input type="text" value="Textbox">
<input type="text" disabled="true" value="Disabled Textbox"><br>
<select>
  <option>Select Tag 1</option>
  <option>Select Tag 2</option>
  <option>Select Tag 3</option>
  <option>Select Tag 4</option>
</select>
<select  disabled="true">
  <option>Disabled Select Tag 1</option>
  <option>Select Tag 2</option>
  <option>Select Tag 3</option>
  <option>Select Tag 4</option>
</select><br>
<input type="radio"checked>Checked RadioButton</input><input type="radio">RadioButton</input><br>
<input disabled="true" type="radio"checked>Disabled Checked RadioButton</input><input type="radio" disabled="true">Disabled RadioButton</input><br>
<input type="checkbox"checked>Checked Checkbox</input>
<input type="checkbox">Checkbox</input><br>
<input disabled="true" type="checkbox"checked>Disabled Checked Checkbox</input>
<input type="checkbox" disabled="true">Disabled Checkbox</input><br>
<input type="number" value="1" min="1" max="5">
<input type="number" value="1" disabled="true"  min="1" max="5"><br>
<input type="time"><br>
<input type="color" value="#ddf"><br>
<textarea rows="4" cols="20">
TextArea
</textarea><textarea disabled="true" rows="4" cols="20">
Disabled TextArea
</textarea><br>
Progress Bar<progress value="1" max="5"></progress><br><br>
<hr>Hr Tag<br><br>Br Tag<br>
<details>
  <summary>Details Tag</summary>
  <p>Line1</p>
</details>
<a href="/">Link</a><br>
<acronym title="hover">Acronym Tag</acronym><br>
<audio controls>
  <source src="null.ogg" type="audio/ogg">
</audio>
Audio Tag<br>
<video width="320" height="240" controls>
  <source src="null.mp4" type="video/mp4">
</video>Video Tag<br>
<iframe src="/">
  <p>Your browser does not support iframes.</p>
</iframe>iFrame Tag<br>
<ul>
  <li><data value="1218">ui Tag</data></li>
  <li><data value="1219">li Tag</data></li>
  <li><data value="1220">Data Tag</data></li>
</ul>
<br>
<hr>
<br>
<button type="button" onclick="LoadingStatus('show')">show load</button> 
<button type="button" onclick="LoadingStatus('hide')">hide load</button> 
<button type="button" onclick="LoadingStatus('success')">success load</button> 
<button type="button" onclick="LoadingStatus('warning', false, 'Warning')">warning load</button> 
<button type="button" onclick="LoadingStatus('error', false, 'Error', 'Sorewa error message desu')">error load</button>
<br>
<br>
<a href="/">cakko</a>
</div>`
}
}

function exe(path) {
    if (!path.startsWith('/dongwaa/_') && path.startsWith('/dongwaa/')) {
      setTimeout(() => {LoadingStatus('hide')}, 20);

    } else if (path.startsWith('/dongwaa/_browse/')) {
      document.getElementById('dump').innerHTML += (path === '/dongwaa/_browse/') ? '<br>' : '<br><button onclick="window.history.back();" class="acss aobh no_print" style="padding:0.5em;font-size:16px;white-space:pre;transition-duration:0s" id="btn_back" tabindex="0" title="back"><b>く back</b></button>'

      fetch("/system/ajgi/interface?script=dongwaa/agi.js", {method: 'POST', body: 'action=listDir&path=' + path.substring(17), headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(r => r.json())
        .then(data => {
        if (data.length > 0) {
          data.forEach(dwid => {
            document.getElementById('dump').innerHTML += '<br><a class="aobh" href="/dongwaa/_browse/' + dwid.substring(9) + '">' + dwid + '</a>'
          });
          postCleanup();
        } else {
          document.getElementById('dump').innerHTML += '<br><i>no more subfolders</i>'
        }

        fetch("/system/ajgi/interface?script=dongwaa/agi.js", {method: 'POST', body: 'action=listFile&path=' + path.substring(17), headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
          .then(r => r.json())
          .then(r => r.filter(v => !data.includes(v)))
          .then(datax => {
            if (datax.length > 0) {
              document.getElementById('dump').innerHTML += '<hr><ui>'
              datax.forEach(dwid => {
                document.getElementById('dump').innerHTML += '<li>' + dwid + '</li>'
              });
              document.getElementById('dump').innerHTML += '</ui>'
            } else {
              document.getElementById('dump').innerHTML += '<br><i>no files inside</i>'
            }
            postCleanup();
          })

        })

  }
}