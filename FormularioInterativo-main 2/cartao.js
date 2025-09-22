const numeroInput = document.getElementById("numero");
const nomeInput = document.getElementById("nome");
const mesInput = document.getElementById("validadeMes");
const anoInput = document.getElementById("validadeAno");
const cvcInput = document.getElementById("cvc");
const form = document.getElementById("form");
const btnVoltar = document.getElementById("voltar");

function validarNome(input) {
  let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  let nomeCartao = input.value;
  nomeCartao = nomeCartao.slice(0, 13);
  document.getElementById("nomeCartao").textContent =
    nomeCartao || "Nome do Titular";
  if (input.value == "") {
    document.getElementById("erroNome").classList.remove("active");
    return false;
  }
  if (!regex.test(input.value)) {
    document.getElementById("erroNome").classList.add("active");
    document.getElementById("nomeCartao").textContent = "Nome do Titular";
    return false;
  } else {
    document.getElementById("erroNome").classList.remove("active");
    return true;
  }
}

function validarNumero(input) {
  let numeroCartao = input.value.replace(/\D/g, "");
  numeroCartao = numeroCartao.slice(0, 16);
  numeroCartao = numeroCartao.replace(/(.{4})/g, "$1 ").trim();
  document.getElementById("numeroCartao").textContent =
    numeroCartao || "0000 0000 0000 0000";
  let regex = /^[0-9]+$/;
  if (input.value == "") {
    document.getElementById("erroNumero").classList.remove("active");
    return false;
  }
  if (!regex.test(input.value)) {
    document.getElementById("erroNumero").classList.add("active");
    return false;
  } else {
    document.getElementById("erroNumero").classList.remove("active");
    return true;
  }
}

function validarMes(input) {
  let mes = input.value;
  let regex = /^[0-9]+$/;
  document.getElementById("validadeCartaoMes").textContent = mes || "MM";
  if (mes == "") {
    document.getElementById("erroMes").classList.remove("active");
    return false;
  }
  if (((mes < 1 || mes > 12) && mes.length == 2) || !regex.test(mes)) {
    document.getElementById("erroMes").classList.add("active");
    document.getElementById("validadeCartaoMes").textContent = "MM";
    return false;
  } else {
    document.getElementById("erroMes").classList.remove("active");
    return true;
  }
}

function validarAno(input) {
  let ano = input.value;
  let regex = /^[0-9]+$/;
  document.getElementById("validadeCartaoAno").textContent = ano || "AA";
  if (ano == "") {
    document.getElementById("erroAno").classList.remove("active");
    return false;
  }
  if (((ano < 25 || ano > 38) && ano.length == 2) || !regex.test(ano)) {
    document.getElementById("erroAno").classList.add("active");
    document.getElementById("validadeCartaoAno").textContent = "AA";
    return false;
  } else {
    document.getElementById("erroAno").classList.remove("active");
    return true;
  }
}

function validarCVC(input) {
  let cvc = input.value;
  let regex = /^[0-9]+$/;
  document.getElementById("cvcCartao").textContent = cvc || "000";
  if (cvc == "") {
    document.getElementById("erroNumeroCVC").classList.remove("active");
    return false;
  }
  if (!regex.test(cvc)) {
    document.getElementById("erroNumeroCVC").classList.add("active");
    document.getElementById("cvcCartao").textContent = "000";
    return false;
  } else {
    document.getElementById("erroNumeroCVC").classList.remove("active");
    return true;
  }
}

nomeInput.addEventListener("input", () => validarNome(nomeInput));

numeroInput.addEventListener("input", () => validarNumero(numeroInput));

mesInput.addEventListener("input", () => validarMes(mesInput));

anoInput.addEventListener("input", () => validarAno(anoInput));

cvcInput.addEventListener("input", () => validarCVC(cvcInput));

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const validoNome = validarNome(nomeInput);
  const validoNumero = validarNumero(numeroInput);
  const validoMes = validarMes(mesInput);
  const validoAno = validarAno(anoInput);
  const validoCVC = validarCVC(cvcInput);

  if (!validoNome || !validoNumero || !validoMes || !validoAno || !validoCVC) {
    alert("Dados inválidos!");
  } else {
    document.getElementById("form").classList.add("oculto");
    document.getElementById("mensagemSucesso").classList.remove("oculto");
  }
});

btnVoltar.addEventListener("click", function () {
  window.open("home.html", "_self");
});
