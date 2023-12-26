let cardapio = [];
let pedido = [];

fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    cardapio = data;
    showMenu(); 
  });

function showMenu() {
  let menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = '';

  cardapio.forEach(item => {
    let itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <h3>${item.nome}</h3>
      <p>Tipo: ${item.tipo}</p>
      <p>Preço: R$ ${item.preço.toFixed(2)}</p>
      <button onclick="adicionarAoPedido(${cardapio.indexOf(item)})">Adicionar ao Pedido</button>
    `;
    menuDiv.appendChild(itemDiv);
  });
}

function adicionarAoPedido(index) {
  let itemSelecionado = cardapio[index];
  pedido.push(itemSelecionado);


  atualizarResumoPedido();
}

function atualizarResumoPedido() {
  let resumoDiv = document.getElementById('resumo-pedido');
  resumoDiv.innerHTML = '';

  pedido.forEach(item => {
    let itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <h3>${item.nome}</h3>
      <p>Preço: R$ ${item.preço.toFixed(2)}</p>
    `;
    resumoDiv.appendChild(itemDiv);
  });

  
  let total = pedido.reduce((acc, item) => acc + item.preço, 0);
  document.getElementById('total').textContent = total.toFixed(2);

  
  window.location.href = 'pedido.html?total=' + encodeURIComponent(total);
}
document.addEventListener("DOMContentLoaded", function() {
    let pedidoItens = [];

    function atualizarPedido() {
        const pedidoItemsDiv = document.getElementById('pedido-items');
        pedidoItemsDiv.innerHTML = '';

        let total = 0;
        pedidoItens.forEach(item => {
            const pedidoItem = document.createElement('div');
            pedidoItem.className = 'pedido-item';
            pedidoItem.innerHTML = `
                <span>${item.quantidade}x ${item.nome} - ${item.preco * item.quantidade}</span>
                <button class="adicionar-um" data-item='${JSON.stringify(item)}'>+</button>
                <button class="retirar-um" data-item='${JSON.stringify(item)}'>-</button>
                <button class="remover" data-item='${JSON.stringify(item)}'>Remover</button>
            `;
            pedidoItemsDiv.appendChild(pedidoItem);
            total += item.preco * item.quantidade;
        });

        const totalDiv = document.createElement('div');
        totalDiv.id = 'total';
        totalDiv.innerHTML = `<p>Total: <strong>${total}</strong></p>`;
        pedidoItemsDiv.appendChild(totalDiv);

        // Adicionar eventos de clique para os botões de adicionar, retirar e remover
        document.querySelectorAll('.adicionar-um').forEach(button => {
            button.addEventListener('click', () => {
                const itemData = JSON.parse(button.getAttribute('data-item'));
                itemData.quantidade += 1;
                atualizarPedido();
            });
        });

        document.querySelectorAll('.retirar-um').forEach(button => {
            button.addEventListener('click', () => {
                const itemData = JSON.parse(button.getAttribute('data-item'));
                if (itemData.quantidade > 1) {
                    itemData.quantidade -= 1;
                }
                atualizarPedido();
            });
        });

        document.querySelectorAll('.remover').forEach(button => {
            button.addEventListener('click', () => {
                const itemData = JSON.parse(button.getAttribute('data-item'));
                const index = pedidoItens.findIndex(item => item.nome === itemData.nome);
                if (index !== -1) {
                    pedidoItens.splice(index, 1);
                    atualizarPedido();
                }
            });
        });
    }
});

