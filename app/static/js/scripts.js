var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }


function ValidaNascimento(a) {

  var data = a.split("/")

  if (data[2].length == 4 && data[1].length == 2 && data[0].length == 2) {

    if (data[1] <= 12 && data[0] <= 31) {

      var actualDate = new Date();
      var birthDate = new Date(parseInt(data[2]), parseInt(data[1]), parseInt(data[0]), "0", "0", "0");
      var actualMili = actualDate.getTime();
      var selectMili = birthDate.getTime();

      if (actualMili > selectMili) { return true }
      else { return false }
    } else { return false }
  } else { return false }

}


function mascaraData(val) {
  var pass = val.value;
  var expr = /[0123456789]/;

  for (i = 0; i < pass.length; i++) {
    // charAt -> retorna o caractere posicionado no índice especificado
    var lchar = val.value.charAt(i);
    var nchar = val.value.charAt(i + 1);

    if (i == 0) {
      // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
      // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
      // instStr.search(expReg);
      if ((lchar.search(expr) != 0) || (lchar > 3)) {
        val.value = "";
      }

    } else if (i == 1) {

      if (lchar.search(expr) != 0) {
        // substring(indice1,indice2)
        // indice1, indice2 -> será usado para delimitar a string
        var tst1 = val.value.substring(0, (i));
        val.value = tst1;
        continue;
      }

      if ((nchar != '/') && (nchar != '')) {
        var tst1 = val.value.substring(0, (i) + 1);

        if (nchar.search(expr) != 0)
          var tst2 = val.value.substring(i + 2, pass.length);
        else
          var tst2 = val.value.substring(i + 1, pass.length);

        val.value = tst1 + '/' + tst2;
      }

    } else if (i == 4) {

      if (lchar.search(expr) != 0) {
        var tst1 = val.value.substring(0, (i));
        val.value = tst1;
        continue;
      }

      if ((nchar != '/') && (nchar != '')) {
        var tst1 = val.value.substring(0, (i) + 1);

        if (nchar.search(expr) != 0)
          var tst2 = val.value.substring(i + 2, pass.length);
        else
          var tst2 = val.value.substring(i + 1, pass.length);

        val.value = tst1 + '/' + tst2;
      }
    }

    if (i >= 6) {
      if (lchar.search(expr) != 0) {
        var tst1 = val.value.substring(0, (i));
        val.value = tst1;
      }
    }
  }

  if (pass.length > 10)
    val.value = val.value.substring(0, 10);
  return true;
}


function erro() {

  swal({ title: "<i class='em em-pensive'></i><br>Ops! Que feio servidor...", text: "Um erro foi encontrado. Tente novamente ou faça contato com o suporte através do menu superior direito.", confirmButtonColor: '#BD5549', showConfirmButton: true })

}

function sucesso() {

  swal({ title: "<i class='em em-raised_hands'></i><br>Tudo certo! ", text: "Seus dados foram processados com sucesso!", type: 'success', confirmButtonColor: '#BD5549', showConfirmButton: true, timer: 1500 })

}

function info(a) {

  swal({ title: "<i class='em em-wink'></i><br>Informação!", text: a, confirmButtonColor: '#BD5549', showConfirmButton: true, confirmButtonText: "Fechar" })

}

function aguarde() {

  swal({ title: "<i class='em em-grin'></i><h4><br>Aguarde um instante!<br>Seus dados estão sendo processados.</h4>", text: "<img src='/app/static/images/icons/loading.svg' style='width: 70px'>", showConfirmButton: false })

}

function getEndereco() {

  if ($.trim($("#cep").val()) != "") {

    if ($("#cep").val().length == 8) {

      $.getJSON("//viacep.com.br/ws/" + $("#cep").val() + "/json/?callback=?", function (dados) {
        if (!("erro" in dados)) {
          //Atualiza os campos com os valores da consulta.
          $("#endereco").val(unescape(dados.logradouro) + " ");
          $("#bairro").val(unescape(dados.bairro));
          $("#cidade").val(unescape(dados.localidade));
          $("#estado").val(unescape(dados.uf));

          $("#bairro").focus();
          $("#cidade").focus();
          $("#estado").focus();
          $("#endereco").focus();

        }
      });

    }
  }

}


function arrayUnico(a) {

  var names = a;
  var uniqueNames = [];
  $.each(names, function (i, el) {
    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });

  return uniqueNames;

}


mod = false

function exit(a) {

  if (mod == true) {

    swal({
      title: "<h3>Deseja salvar alterações?</h3><h5>Você modificou uma ou mais informação e não salvou.</h5>",
      html: "",
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#E06E69',
      showLoaderOnConfirm: true,
      width: '450px'
    }).then(function () { salvar(a) }, function (dismiss) {
      if (dismiss === 'cancel') { location.href = a + '.php' + tk; }
    })

  } else {

    location.href = a + '.php' + tk;
  }
}


function update(array, newItem, atIndex) {
  return array.map((item, index) => index === atIndex ? newItem : item);
}

function LinkUrl(a) {

  if (a == "rastreamento") {
    info("Para visualizar o rastreamento, você precisa abrir ou iniciar uma consulta, ir em anamnese -> rastreamento metabólico e clicar em 'Importar rastreamento'.");
    return;
  }
  if (a != "@@") {
    var win = window.open(a, '_blank');
    win.focus();
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function media(a) {

  if (a != undefined) {

    var sum = a.reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
    var avg = sum / a.length;

  } else {

    var avg = 0;
  }

  return avg;
}


function desvpad(a) {

  if (a != undefined) {

    var r = { mean: 0, variance: 0, deviation: 0 }, t = a.length;

    for (var m, s = 0, l = t; l--; s += parseFloat(a[l]));

    for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(parseFloat(a[l]) - m, 2));

    return r.deviation = (Math.sqrt(r.variance = s / t));

  } else {

    return 0;
  }
}

function check(val) {

  if (isNaN(val) || val == "" || isFinite(val) == false) { return 0; }
  return parseFloat(val);
}

function setPlainText() {
  var ed = tinyMCE.get('elm1');

  ed.pasteAsPlainText = true;

  //adding handlers crossbrowser
  if (tinymce.isOpera || /Firefox\/2/.test(navigator.userAgent)) {
    ed.onKeyDown.add(function (ed, e) {
      if (((tinymce.isMac ? e.metaKey : e.ctrlKey) && e.keyCode == 86) || (e.shiftKey && e.keyCode == 45))
        ed.pasteAsPlainText = true;
    });
  } else {
    ed.onPaste.addToTop(function (ed, e) {
      ed.pasteAsPlainText = true;
    });
  }
}