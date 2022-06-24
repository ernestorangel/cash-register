function checkCashRegister(precoDaCompra, valorPago, dinheiroEmCaixa) {
  console.log()
  console.log()
  console.log("O imput é: (" + precoDaCompra + ", " + valorPago + ", " + dinheiroEmCaixa + ")")

  // saber quanto vale cada unidade monetaria
  let valorDaUnidadeMonetaria = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    ONEHUNDRED: 100
  }

  // descobrir o troco devido
  let trocoDevido = Math.round((valorPago - precoDaCompra) * 100) / 100;
  let trocoDevidoOriginal = trocoDevido;
  console.log("O Troco devido é de: " + trocoDevido)

  // descobrir o total em caixa
  let totalEmCaixa = 0;
  for (let unidadeMonetaria of dinheiroEmCaixa) {
    totalEmCaixa = totalEmCaixa + unidadeMonetaria[1]
  }
  totalEmCaixa = Math.round(totalEmCaixa * 100) / 100
  console.log("O Total em caixa é de: " + totalEmCaixa)

  // se o troco devido for igual o total em caixa, retornar closed
  // se o troco devido for maior que o total em caixa, retornar insufficient funds
  if (trocoDevido > totalEmCaixa) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  } else if (trocoDevido == totalEmCaixa) {
    return {status: "CLOSED", change: dinheiroEmCaixa}
  }

  // descobrir qual a maior unidade monetaria que podemos usar
  // se nao, damos tudo e testamos a proxima considerando o valor do troco descrescido do valor dado
  // se sim, damos o maximo possivel e vemos se ainda resta algo a dar
  // se resta, vamos para a proxima moeda considerando esse resto como novo valor
  let unidadesMonetariasPossiveis = [];
  for (let unidadeMonetaria in valorDaUnidadeMonetaria) {
    if (trocoDevido <= valorDaUnidadeMonetaria[unidadeMonetaria]) {
      break;
    }
    unidadesMonetariasPossiveis = unidadesMonetariasPossiveis + unidadeMonetaria + ' '
  }
  unidadesMonetariasPossiveis = unidadesMonetariasPossiveis.split(' ')
  unidadesMonetariasPossiveis.pop()
  console.log("O Troco pode ser dado em: " + unidadesMonetariasPossiveis)

  // descobrir se dessa unidade temos o suficiente pra dar o maximo possivel
  let composicaoTroco = []
  for (let i = unidadesMonetariasPossiveis.length - 1; i >= 0; i--) {

    let nomeUnidadeMonetariaPossivel = unidadesMonetariasPossiveis[i]
    let valorUnidadeMonetariaPossivel = valorDaUnidadeMonetaria[nomeUnidadeMonetariaPossivel]
    let trocoFaltante = Math.round((trocoDevido % valorUnidadeMonetariaPossivel) * 100) / 100
    let valorMaximoUnidadeMonetariaPossivel = Math.round((trocoDevido - trocoFaltante) * 100) / 100

    for (let unidadeMonetariaDisponivel of dinheiroEmCaixa) {

      let nomeUnidadeMonetariaDisponivel = unidadeMonetariaDisponivel[0]
      let valorUnidadeMonetariaDisponivel = unidadeMonetariaDisponivel[1]

      if (nomeUnidadeMonetariaDisponivel == nomeUnidadeMonetariaPossivel) {
        if (valorMaximoUnidadeMonetariaPossivel >= valorUnidadeMonetariaDisponivel) {
          if(valorUnidadeMonetariaDisponivel != 0) {
            composicaoTroco.push([nomeUnidadeMonetariaDisponivel, valorUnidadeMonetariaDisponivel])
          }
          trocoDevido = Math.round((trocoDevido - valorUnidadeMonetariaDisponivel) * 100) / 100
        } else {
          if(valorMaximoUnidadeMonetariaPossivel != 0) {
            composicaoTroco.push([nomeUnidadeMonetariaDisponivel, valorMaximoUnidadeMonetariaPossivel])
          }
          trocoDevido = Math.round((trocoDevido - valorMaximoUnidadeMonetariaPossivel) * 100) / 100
        }
      }

      if (trocoDevido > 0) {
        continue
      } else if (trocoDevido == 0) {
        break
      } else {
        return {status: "INSUFFICIENT_FUNDS", change: []}
      }
    }
  }

  trocoDevido = Math.round(trocoDevido * 100) / 100

  let trocoEscolhido = 0;
  for (let unidadeMonetaria of composicaoTroco) {
    trocoEscolhido = trocoEscolhido + unidadeMonetaria[1]
  }

  trocoEscolhido = Math.round(trocoEscolhido * 100) / 100

  console.log("O Troco escolhido é de: " + trocoEscolhido)

  if (trocoEscolhido == trocoDevidoOriginal) {
    return {status: "OPEN", change: composicaoTroco}
  } else {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90],
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]
  ])
);

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]
  ])
)

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0],
     ["ONE HUNDRED", 0]
  ])
)

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 1], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]
  ])
)

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]
  ])
)