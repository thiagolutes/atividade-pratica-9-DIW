const data = {
    produtos: [
        { id: 1, nome: "iPhone 15 Pro", preco: 7299.00, categoria: "Celulares", imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200", descricao: "O titânio chegou ao iPhone.", emEstoque: true },
        { id: 2, nome: "Samsung Galaxy S24", preco: 5499.00, categoria: "Celulares", imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200", descricao: "IA integrada para fotos perfeitas.", emEstoque: true },
        { id: 3, nome: "MacBook Air M3", preco: 9800.00, categoria: "Notebooks", imagem: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_15_m3_2024_hero.png", descricao: "Poderoso, fino e silencioso.", emEstoque: true },
        { id: 4, nome: "Dell XPS 13", preco: 8200.00, categoria: "Notebooks", imagem: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200", descricao: "A melhor tela da categoria.", emEstoque: false },
        { id: 5, nome: "Sony WH-1000XM5", preco: 2100.00, categoria: "Acessórios", imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", descricao: "Cancelamento de ruído líder de mercado.", emEstoque: true },
        { id: 6, nome: "Logitech MX Master 3S", preco: 550.00, categoria: "Acessórios", imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200", descricao: "Precisão absoluta para produtividade.", emEstoque: true },
        { id: 7, nome: "PlayStation 5 Slim", preco: 3799.00, categoria: "Games", imagem: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200", descricao: "Jogue como nunca antes.", emEstoque: true },
        { id: 8, nome: "Keychron K2 V2", preco: 890.00, categoria: "Acessórios", imagem: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200", descricao: "Teclado mecânico wireless premium.", emEstoque: false }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.style.borderTop = `4px solid #105682`;

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div>
            <h4>${produto.nome}</h4>
            <p class="card-price">${formatPrice(produto.preco)}</p>
            <p><small>${produto.categoria}</small></p>
        </div>
        <div>
            <button class="btn-details">Ver detalhes</button>
            <button class="btn-highlight">Destacar</button>
        </div>
    `;

    card.querySelector(".btn-details").addEventListener("click", () => showProductDetails(produto));
    card.querySelector(".btn-highlight").addEventListener("click", () => card.classList.toggle("highlight"));

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";
    produtos.forEach(prod => productList.appendChild(createProductCard(prod)));
    const allCards = document.querySelectorAll(".card");
    console.log(`Renderizados ${allCards.length} cards.`);
}

function renderCategories() {
    const categorias = ["Todas", ...new Set(data.produtos.map(p => p.categoria))];
    categorySelect.innerHTML = "";
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h3 style="color: #105682">${produto.nome}</h3>
        <p><strong>Preço:</strong> <span style="color: green">${formatPrice(produto.preco)}</span></p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${produto.emEstoque ? "✅ Disponível" : "❌ Indisponível"}</p>
        <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
        <p>${produto.descricao}</p>
    `;
}

function filterProducts() {
    const text = searchInput.value.toLowerCase();
    const cat = categorySelect.value;
    const filtrados = data.produtos.filter(p => (cat === "Todas" || p.categoria === cat) && p.nome.toLowerCase().includes(text));
    renderProducts(filtrados);
}

btnRender.addEventListener("click", () => renderProducts(data.produtos));
searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

renderCategories();
renderProducts(data.produtos);