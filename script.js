// Preços base das comidas
const foodPrices = {
    1: 8.50, // Tapioca
    2: 7.00, // Cuscuz
    3: 10.00 // Sanduíche
};

// Variáveis para controlar o preço total
let totalPrice = 0.0;
let selectedFoodPrice = 0.0;

// Atualizar preço total quando comida é selecionada
document.querySelectorAll('input[name="food"]').forEach((radio) => {
    radio.addEventListener("change", () => {
        selectedFoodPrice = foodPrices[radio.value];
        updateTotalPrice();
    });
});

// Atualizar preço total quando recheios são selecionados
document.querySelectorAll(".filing").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        updateTotalPrice();
    });
});

// Função para atualizar o preço total
function updateTotalPrice() {
    let filingsTotal = 0.0;

    // Somar preços dos recheios selecionados
    document.querySelectorAll(".filing:checked").forEach((checkbox) => {
        filingsTotal += parseFloat(checkbox.getAttribute("data-price"));
    });

    totalPrice = selectedFoodPrice + filingsTotal;

    // Exibir preço total formatado
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}

// Função para gerar a data atual no formato "yyyy-MM-dd"
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Botão para realizar o pagamento
document.getElementById("payButton").addEventListener("click", async () => {
    const cpf = document.getElementById("cpfInput").value;
    const description = document.getElementById("descriptionInput").value;
    const idfood = document.querySelector('input[name="food"]:checked')?.value;

    if (!idfood || !cpf) {
        alert("Por favor, selecione uma comida e informe o CPF.");
        return;
    }

    // Construindo o objeto sale com a data da venda
    const sale = {
        idfood: parseInt(idfood),
        cpf: cpf,
        description: description,
        value: totalPrice,  // Corrigido
        datesale: getCurrentDate()
    };

    try {
        const response = await fetch("/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sale)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Compra registrada com sucesso!");
        } else {
            alert("Erro: " + result.error);
        }
    } catch (error) {
        console.error("Erro ao enviar pagamento:", error);
        alert("Falha ao conectar com o servidor.");
    }
});

// Botão para ver histórico de compras
document.getElementById("historyButton").addEventListener("click", async () => {
    const cpf = document.getElementById("cpfInput").value;

    if (!cpf) {
        alert("Por favor, informe o CPF para ver o histórico.");
        return;
    }

    try {
        const response = await fetch(`/history?cpf=${cpf}`);
        const result = await response.json();

        if (response.ok) {
            // Exibe o histórico de compras
            const historyBody = document.getElementById("historyBody");
            historyBody.innerHTML = ''; // Limpa qualquer conteúdo anterior
            result.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sale.id}</td>
                    <td>${sale.food.name}</td>
                    <td>${sale.value}</td>
                    <td>${sale.datesale}</td>
                `;
                historyBody.appendChild(row);
            });
            document.getElementById("historyContainer").style.display = 'block';
        } else {
            alert("Erro: " + result.error);
        }
    } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        alert("Falha ao conectar com o servidor.");
    }
});
