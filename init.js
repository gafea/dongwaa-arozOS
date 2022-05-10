const dongwaa_webDB_URL = 'https://dongwaa.cakko.ml/'

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
      return `<div class="edge2edge card">[home] /dongwaa/</div>` + renderBottomBar(path)

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
    return `` + renderTopBar('...', '', '', true) + `<div id="content"></div>
<!-- <button type="button" onclick="LoadingStatus('show')">show load</button> 
<button type="button" onclick="LoadingStatus('hide')">hide load</button> 
<button type="button" onclick="LoadingStatus('success')">success load</button> 
<button type="button" onclick="LoadingStatus('warning', false, 'Warning')">warning load</button> 
<button type="button" onclick="LoadingStatus('error', false, 'Error', 'Sorewa error message desu')">error load</button> -->`
}
}

function exe(path) {
    if (!path.startsWith('/dongwaa/_') && path != '/dongwaa/' && path.startsWith('/dongwaa/')) { //dongwaa pages

      LoadingStatus("show")

      var dwid_url = path.substring(9)

      fetch(dongwaa_webDB_URL + '!dwfs/' + path.split('/')[2])
        .then(r => r.json())
        .then(dwfs_resp => {
    
          if (dwfs_resp.status == 200) {
    
            init_data(dwfs_resp)
    
          } else {
    
            var dwid_guess = decodeURI(dwid_url).split('/')[0].substring(decodeURI(dwid_url).split('/')[0].split(' ')[0].length + 1)
            var guess = dwid_guess.split(' ')[0]
            var guess_dwss = ""
            try { guess_dwss = dwid_guess.split(' ')[1] } catch (error) { guess_dwss = undefined }
    
            if (guess == '') {on9jai()} else {
    
            fetch(dongwaa_webDB_URL + '!dwfs/' + guess)
              .then(response => response.json())
              .then(dwfs_resp => {
                if (dwfs_resp.status == 200 && (dwfs_resp.dwfs == decodeURI(dwid_url).split('/')[0] || dwfs_resp.dwfs.indexOf(decodeURI(dwid_url).split('/')[0]) > -1)) {
    
                  history.replaceState(null, null, '/dongwaa/'.concat(guess).concat((guess_dwss != undefined) ? '/'.concat(guess_dwss) : ''))
                  dwid_url = (guess_dwss != undefined) ? guess.concat('/').concat(guess_dwss) : guess ;
                  init_data(dwfs_resp)
    
                } else {
                
                  on9jai()
    
                }
              })
    
            }
    
          }
    
        })
        .catch(function (err) {
          console.log('[!dwfs] error: ' + err)
          setTimeout(() => {
            LoadingStatus("error", true, "Failed to load", err)
          }, 1000)
        });

        function init_data(dwfs_resp) {
          var target_dw = '';
          var noSeasonOne = false;
          var dwss_in_dwfs_pos = 0;
      
          var url_dwss = decodeURI(dwid_url.split('/')[0]);
          if (dwid_url.split('/')[1] != undefined) { url_dwss += ' '.concat(dwid_url.split('/')[1]) };
      
          if (Array.isArray(dwfs_resp.dwfs)) { //returned array
            dwfs_resp.dwfs.sort();
            if (dwid_url.split('/')[1] == '') {
              target_dw = dwfs_resp.dwfs[0];
              dwss_in_dwfs_pos = 0;
            } else {
              target_dw = dwfs_resp.dwfs.find(l => l.endsWith(url_dwss));
              dwss_in_dwfs_pos = dwfs_resp.dwfs.findIndex(dwfsX => dwfsX === target_dw);
            };
          } else { //returned single
            target_dw = dwfs_resp.dwfs;
            if (target_dw.split(' ')[2] != undefined) { noSeasonOne = true } //check should expect season 1
          }
      
          download_data(target_dw, dwfs_resp, dwss_in_dwfs_pos, noSeasonOne, false)
        }

        function download_data(target_dw, dwfs_resp, dwss_in_dwfs_pos, noSeasonOne, try_direct) {
          fetch(dongwaa_webDB_URL + '!dw/' + target_dw)
            .then(r => r.json())
            .then(dw_resp => {
              if (dw_resp.status == 200) {
                document.getElementById('topbar_title').innerText = popArray[popArray.length - 1].split('/')[0]

                document.getElementById('content').innerHTML = '<div class="edge2edge card">' + JSON.stringify(dw_resp) + '</div><div class="edge2edge card" id="dump"></div>'

      fetch("/system/ajgi/interface?script=dongwaa/agi.js", {method: 'POST', body: 'action=listDir&path=' + popArray[popArray.length - 1], headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
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

        fetch("/system/ajgi/interface?script=dongwaa/agi.js", {method: 'POST', body: 'action=listFile&path=' + popArray[popArray.length - 1], headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
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
                LoadingStatus("hide")
              } else { on9jai() }
            })
            .catch(function (err) {
              console.log('[!dwpage] error: ' + err)
              LoadingStatus("error", true, "Failed to load", err)
            });
        }










    } else if (path.startsWith('/dongwaa/_browse/')) { //dongwaa browse
      path.split('/').forEach(path_dwid => {
        path_dwid = path_dwid.split('{')[0].split('[')[0]
        console.log(path_dwid)
        if (!!path_dwid && path_dwid != 'dongwaa' && path_dwid != '_browse') {
          try {
            fetch(dongwaa_webDB_URL + "!dwdig/" + path_dwid)
            .then(r => r.json())
            .then(data => {
              if (data.status === 200) {
                if (data.result.length > 1) {
  
                } else {
                  popArray.push(path.substring(17))
                  boot('/dongwaa/' + data.result, true)
                  return
                }
              } else {return}
            })
          } catch (error) {return}
        }
      });

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