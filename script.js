let quantidades = {
  premium: 0,
  pista: 0,
  arquibancada: 0,
  camarote: 0,
};

let valorIngressos = {
  premium: 200,
  pista: 120,
  arquibancada: 150,
  camarote: 300,
};

let valorServicos = {
  premium: 200,
  pista: 500,
  arquibancada: 52,
  camarote: 150,
};

let servico = {
  premium: false,
  pista: false,
  arquibancada: false,
  camarote: false,
};

let totaisDisponiveis = {
  arquibancada: 100,
  premium: 80,
  pista: 200,
  camarote: 50,
};

function alterarQuantidade(setor, variacao) {
  if (quantidades[setor] > 0 && variacao == "menos") {
    quantidades[setor] -= 1;
  } else if (quantidades[setor] == 0) {
    quantidades[setor] = 0;
  }

  if (variacao == "mais") {
    quantidades[setor] += 1;
  }

  switch (setor) {
    case "premium":
      document.getElementById("quantidade-premium").innerHTML =
        quantidades[setor];
      document.getElementById("disponiveis-premium").innerHTML =
        totaisDisponiveis[setor] - quantidades[setor];
      break;
    case "pista":
      document.getElementById("quantidade-pista").innerHTML =
        quantidades[setor];
      document.getElementById("disponiveis-pista").innerHTML =
        totaisDisponiveis[setor] - quantidades[setor];
      break;
    case "arquibancada":
      document.getElementById("quantidade-arquibancada").innerHTML =
        quantidades[setor];
      document.getElementById("disponiveis-arquibancada").innerHTML =
        totaisDisponiveis[setor] - quantidades[setor];
      break;
    case "camarote":
      document.getElementById("quantidade-camarote").innerHTML =
        quantidades[setor];
      document.getElementById("disponiveis-camarote").innerHTML =
        totaisDisponiveis[setor] - quantidades[setor];
      break;
  }
}

function confirmar() {
  if (
    quantidades.arquibancada == 0 &&
    quantidades.camarote == 0 &&
    quantidades.pista == 0 &&
    quantidades.premium == 0
  ) {
    alert("Selecione algum ingresso.");
  } else {
    window.open("servicos.html", "_self");
    localStorage.setItem("carrinho", JSON.stringify(quantidades));
    let jsonStorage = localStorage.getItem("carrinho");
    let result = JSON.parse(jsonStorage);
    mostraServicos();
    return result;
  }
}

function mostraServicos() {
  let variavel = localStorage.getItem("carrinho");
  let result = JSON.parse(variavel);
  console.log(result.premium);

  if (result.premium > 0) {
    document.getElementById("servicos-premium").classList.remove("hidden");
  }
  if (result.pista > 0) {
    document.getElementById("servicos-pista").classList.remove("hidden");
  }
  if (result.arquibancada > 0) {
    document.getElementById("servicos-arquibancada").classList.remove("hidden");
  }
  if (result.camarote > 0) {
    document.getElementById("servicos-camarote").classList.remove("hidden");
  }
}

if (window.location.pathname.endsWith("servicos.html")) {
  mostraServicos();
}

function adicionarServico(setor) {
  switch (setor) {
    case "premium":
      document.getElementById("botao-premium").innerHTML = "Adicionado";
      servico[setor] = true;
      break;
    case "pista":
      document.getElementById("botao-pista").innerHTML = "Adicionado";
      servico[setor] = true;
      break;
    case "arquibancada":
      document.getElementById("botao-arquibancada").innerHTML = "Adicionado";
      servico[setor] = true;
      break;
    case "camarote":
      document.getElementById("botao-camarote").innerHTML = "Adicionado";
      servico[setor] = true;
      break;
  }
}

function pularEtapa() {
  window.open("confirmacao.html", "_self");
  localStorage.setItem("carrinhoServicos", JSON.stringify(servico));
  let jsonStorage = localStorage.getItem("carrinhoServicos");
  let result = JSON.parse(jsonStorage);
  return result;
}

function confirmarServicos() {
  if (
    servico.arquibancada == false &&
    servico.camarote == false &&
    servico.pista == false &&
    servico.premium == false
  ) {
    alert("Selecione algum serviço, ou pule a etapa.");
  } else {
    window.open("confirmacao.html", "_self");
    localStorage.setItem("carrinhoServicos", JSON.stringify(servico));
    let jsonStorage = localStorage.getItem("carrinhoServicos");
    let result = JSON.parse(jsonStorage);
    return result;
  }
}

function mostrarConfirmacao() {
  let ingressos = localStorage.getItem("carrinho");
  let resultIngressos = JSON.parse(ingressos);
  let servicos = localStorage.getItem("carrinhoServicos");
  let resultServicos = JSON.parse(servicos);
  console.log(resultIngressos.premium);

  let valorTotal = 0;

  if (resultIngressos.premium > 0) {
    document.getElementById("quantidade-premium").innerHTML =
      resultIngressos.premium;
    document.getElementById("ingresso-premium").classList.remove("hidden");
    valorTotal += valorIngressos.premium * resultIngressos.premium;
  }
  if (resultIngressos.pista > 0) {
    document.getElementById("quantidade-pista").innerHTML =
      resultIngressos.pista;
    document.getElementById("ingresso-pista").classList.remove("hidden");
    valorTotal += valorIngressos.pista * resultIngressos.pista;
  }
  if (resultIngressos.arquibancada > 0) {
    document.getElementById("quantidade-arquibancada").innerHTML =
      resultIngressos.arquibancada;
    document.getElementById("ingresso-arquibancada").classList.remove("hidden");
    valorTotal += valorIngressos.arquibancada * resultIngressos.arquibancada;
  }
  if (resultIngressos.camarote > 0) {
    document.getElementById("quantidade-camarote").innerHTML =
      resultIngressos.camarote;
    document.getElementById("ingresso-camarote").classList.remove("hidden");
    valorTotal += valorIngressos.camarote * resultIngressos.camarote;
  }

  if (resultServicos.premium == true) {
    document.getElementById("servico-premium").classList.remove("hidden");
    document.getElementById("valor-servico-premium").innerHTML =
      valorServicos.premium;
    valorTotal += valorServicos.premium;
  }

  if (resultServicos.pista == true) {
    document.getElementById("servico-pista").classList.remove("hidden");
    document.getElementById("valor-servico-pista").innerHTML =
      valorServicos.pista;
    valorTotal += valorServicos.pista;
  }

  if (resultServicos.arquibancada == true) {
    document.getElementById("servico-arquibancada").classList.remove("hidden");
    document.getElementById("valor-servico-arquibancada").innerHTML =
      valorServicos.arquibancada;
    valorTotal += valorServicos.arquibancada;
  }

  if (resultServicos.camarote == true) {
    document.getElementById("servico-camarote").classList.remove("hidden");
    document.getElementById("valor-servico-camarote").innerHTML =
      valorServicos.camarote;
    valorTotal += valorServicos.camarote;
  }

  document.getElementById("valorTotal").innerHTML = valorTotal;
}

if (window.location.pathname.endsWith("confirmacao.html")) {
  mostrarConfirmacao();
}

function confirmarRevisao() {
  window.open("cartao.html", "_self");
  let disponiveis = localStorage.getItem("totaisDisponiveis");
  let totaisDisponiveis = JSON.parse(disponiveis);
  let result = localStorage.getItem("carrinho");
  let comprados = JSON.parse(result);

  totaisDisponiveis.premium = totaisDisponiveis.premium - comprados.premium;
  totaisDisponiveis.pista = totaisDisponiveis.pista - comprados.pista;
  totaisDisponiveis.arquibancada =
    totaisDisponiveis.arquibancada - comprados.arquibancada;
  totaisDisponiveis.camarote = totaisDisponiveis.camarote - comprados.camarote;

  localStorage.setItem("totaisDisponiveis", JSON.stringify(totaisDisponiveis));
}

// Inicializa o localStorage com os totais se ainda não existir
if (!localStorage.getItem("totaisDisponiveis")) {
  localStorage.setItem("totaisDisponiveis", JSON.stringify(totaisDisponiveis));
}

if (window.location.pathname.endsWith("ingressosShow.html")) {
  let json = localStorage.getItem("totaisDisponiveis");
  let totais = JSON.parse(json); // Correção: usar JSON.parse

  if (totais) {
    document.getElementById("disponiveis-premium").innerHTML = totais.premium;
    document.getElementById("disponiveis-pista").innerHTML = totais.pista;
    document.getElementById("disponiveis-arquibancada").innerHTML =
      totais.arquibancada;
    document.getElementById("disponiveis-camarote").innerHTML = totais.camarote;
  }
}
