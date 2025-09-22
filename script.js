// VARIAVEIS GLOBAIS DE QUANTIDADE
let quantidades = {
  // Show
  premium: 0,
  pista: 0,
  arquibancada: 0,
  camarote: 0,
  // Rally
  acesso: 0,
  // Jazz
  mesa: 0,
  bistro: 0,
  // Marketing
  padrao: 0,
  vip: 0,
};

// VARIAVEIS GLOBAIS DE VALORES DE INGRESSOS
let valorIngressos = {
  // Show
  premium: 200,
  pista: 120,
  arquibancada: 150,
  camarote: 300,
  // Rally
  acesso: 180,
  // Jazz
  mesa: 220,
  bistro: 150,
  // Marketing
  padrao: 450,
  vip: 800,
};

// VARIAVEIS GLOBAIS DE VALORES DE SERVIÇOS
let valorServicos = {
  // Show
  premium: 200,
  pista: 500,
  // Rally
  camisetaRally: 150,
  boxRally: 400,
  // Jazz
  drinkExecutivo: 70,
  buffetEspecial: 120,
  // Marketing
  networking: 100,
  palestraEspecial: 250,
};

// VARIAVEIS GLOBAIS DE SERVIÇOS ADICIONADOS
let servico = {
  // Show
  premium: false,
  pista: false,
  arquibancada: false,
  camarote: false,
  // Rally
  camisetaRally: false,
  boxRally: false,
  // Jazz
  drinkExecutivo: false,
  buffetEspecial: false,
  // Marketing
  networking: false,
  palestraEspecial: false,
};

// VARIAVEIS GLOBAIS DE DISPONIBILIDADE
let totaisDisponiveis = {
  // Show
  premium: 80,
  pista: 200,
  arquibancada: 100,
  camarote: 50,
  // Rally
  acesso: 500,
  // Jazz
  mesa: 40,
  bistro: 60,
  // Marketing
  padrao: 300,
  vip: 50,
};

function alterarQuantidade(setor, variacao) {
  let totaisSalvos =
    JSON.parse(localStorage.getItem("totaisDisponiveis")) || totaisDisponiveis;
  let quantidadeAtual = quantidades[setor] || 0;
  let maxDisponivel = totaisSalvos[setor] || 0;

  if (variacao === "mais" && quantidadeAtual < maxDisponivel) {
    quantidades[setor]++;
  } else if (variacao === "menos" && quantidades[setor] > 0) {
    quantidades[setor]--;
  }

  let elementoQuantidade = document.getElementById(`quantidade-${setor}`);
  if (elementoQuantidade) {
    elementoQuantidade.innerHTML = quantidades[setor];
  }

  let elementoDisponiveis = document.getElementById(`disponiveis-${setor}`);
  if (elementoDisponiveis) {
    elementoDisponiveis.innerHTML = totaisSalvos[setor] - quantidades[setor];
  }
}

function confirmar() {
  const totalSelecionado = Object.values(quantidades).reduce(
    (total, qtd) => total + qtd,
    0
  );

  if (totalSelecionado === 0) {
    alert("Selecione algum ingresso.");
  } else {
    localStorage.setItem("carrinho", JSON.stringify(quantidades));
    window.open("servicos.html", "_self");
  }
}

function mostraServicos() {
  let variavel = localStorage.getItem("carrinho");
  let result = JSON.parse(variavel);

  if (!result) return;

  if (result.premium > 0)
    document.getElementById("servicos-premium").classList.remove("hidden");
  if (result.pista > 0)
    document.getElementById("servicos-pista").classList.remove("hidden");
  if (result.acesso > 0)
    document.getElementById("servicos-acesso").classList.remove("hidden");
  if (result.mesa > 0)
    document.getElementById("servicos-mesa").classList.remove("hidden");
  if (result.bistro > 0)
    document.getElementById("servicos-bistro").classList.remove("hidden");
  if (result.padrao > 0)
    document.getElementById("servicos-padrao").classList.remove("hidden");
  if (result.vip > 0)
    document.getElementById("servicos-vip").classList.remove("hidden");
}

if (window.location.pathname.endsWith("servicos.html")) {
  mostraServicos();
}

function adicionarServico(tipoServico) {
  servico[tipoServico] = !servico[tipoServico];

  let botao = document.getElementById(`botao-${tipoServico}`);
  if (servico[tipoServico]) {
    botao.innerHTML = "Adicionado";
    botao.style.backgroundColor = "green";
  } else {
    botao.innerHTML = "Adicionar ao carrinho";
    botao.style.backgroundColor = "";
  }
}

function pularEtapa() {
  for (let key in servico) {
    servico[key] = false;
  }
  localStorage.setItem("carrinhoServicos", JSON.stringify(servico));
  window.open("confirmacao.html", "_self");
}

function confirmarServicos() {
  localStorage.setItem("carrinhoServicos", JSON.stringify(servico));
  window.open("confirmacao.html", "_self");
}

function mostrarConfirmacao() {
  let ingressos = localStorage.getItem("carrinho");
  let resultIngressos = JSON.parse(ingressos);
  let servicos = localStorage.getItem("carrinhoServicos");
  let resultServicos = JSON.parse(servicos);

  if (!resultIngressos) return;

  let valorTotal = 0;

  for (let tipoIngresso in resultIngressos) {
    if (
      resultIngressos[tipoIngresso] > 0 &&
      document.getElementById(`ingresso-${tipoIngresso}`)
    ) {
      document.getElementById(`quantidade-${tipoIngresso}`).innerHTML =
        resultIngressos[tipoIngresso];
      document
        .getElementById(`ingresso-${tipoIngresso}`)
        .classList.remove("hidden");
      valorTotal +=
        valorIngressos[tipoIngresso] * resultIngressos[tipoIngresso];
    }
  }

  if (resultServicos) {
    for (let tipoServico in resultServicos) {
      if (
        resultServicos[tipoServico] === true &&
        document.getElementById(`servico-${tipoServico}`)
      ) {
        document
          .getElementById(`servico-${tipoServico}`)
          .classList.remove("hidden");
        document.getElementById(`valor-servico-${tipoServico}`).innerHTML =
          valorServicos[tipoServico];
        valorTotal += valorServicos[tipoServico];
      }
    }
  }

  document.getElementById("valorTotal").innerHTML = valorTotal.toFixed(2);
}

if (window.location.pathname.endsWith("confirmacao.html")) {
  mostrarConfirmacao();
}

function confirmarRevisao() {
  window.open("cartao.html", "_self");

  let disponiveis = localStorage.getItem("totaisDisponiveis");
  let totaisDisponiveisAtuais = JSON.parse(disponiveis);
  let result = localStorage.getItem("carrinho");
  let comprados = JSON.parse(result);

  for (let tipo in comprados) {
    if (totaisDisponiveisAtuais.hasOwnProperty(tipo)) {
      totaisDisponiveisAtuais[tipo] -= comprados[tipo];
    }
  }

  localStorage.setItem(
    "totaisDisponiveis",
    JSON.stringify(totaisDisponiveisAtuais)
  );
  localStorage.removeItem("carrinho");
}

function inicializarPaginaIngressos() {
  let totaisSalvosDoStorage = JSON.parse(
    localStorage.getItem("totaisDisponiveis")
  );

  const totaisAtualizados = { ...totaisDisponiveis, ...totaisSalvosDoStorage };
  localStorage.setItem("totaisDisponiveis", JSON.stringify(totaisAtualizados));

  let carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho"));
  if (carrinhoSalvo) {
    for (let tipo in carrinhoSalvo) {
      if (quantidades.hasOwnProperty(tipo)) {
        quantidades[tipo] = carrinhoSalvo[tipo];
      }
    }
  }

  for (let tipo in totaisDisponiveis) {
    let elementoDisponiveis = document.getElementById(`disponiveis-${tipo}`);
    let elementoQuantidade = document.getElementById(`quantidade-${tipo}`);

    if (elementoDisponiveis) {
      let quantidadeNoCarrinho = quantidades[tipo] || 0;
      elementoDisponiveis.innerHTML =
        totaisAtualizados[tipo] - quantidadeNoCarrinho;
    }

    if (elementoQuantidade) {
      elementoQuantidade.innerHTML = quantidades[tipo] || 0;
    }
  }
}

if (window.location.pathname.includes("ingressos")) {
  inicializarPaginaIngressos();
}
