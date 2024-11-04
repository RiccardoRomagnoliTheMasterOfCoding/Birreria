class Beer {
    id: number;
    name: string;
    price: number;
    description: string;
}

class Order {
    id: number;
    beerId: number;
    status: "ordered" | "served";
}

let menu: Beer[] = [
    { id: 0, name: "Peroni", price: 4.00, description: "S" },
    { id: 1, name: "Ceres", price: 4.20, description: "C'è" },
    { id: 2, name: "Heineken", price: 3.50, description: "verde" },
    { id: 3, name: "Ichnusa", price: 6.90, description: "Sas" },
    { id: 4, name: "Corona", price: 4.00, description: "I call her chandelier!" }
]

let idOrder: number = 0;
let totalPrice: number = 0;
let orders: Order[] = [];

function createNewBeer(name: string, price: number, description: string) {
    if (isFinite(price) && price > 0) {
        menu.push({ id: menu[menu.length - 1].id + 1, name: name, price: price, description: description });
        populateBeerList(menu);
        menu.forEach(beer => {
            updateUI(beer.id, document.getElementById(`${beer.id}_requested`));
        });
    }
}

function populateBeerList(menu: Beer[]) {
    var list = document.getElementById('beerList');
    list!.innerHTML = ``;

    for (var beer of menu) {
        var li = `<li class="list-group-item d-flex justify-content-between align-item-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${beer.name} (${beer.price}€)
                            <span class="badge rounded-pill text-bg-info mx-3" id="${beer.id}_requested">0</span>
                        </div>
                        <div id="${beer.id}_description">${beer.description}</div>
                    </div>
                    <button class="btn btn-success me-1" onclick="addBeer(${beer.id})">
                        <i class="bi bi-plus-circle h3"></i>
                    </button>
                    <button class="btn btn-danger" onclick="serveBeer(${beer.id})">
                        <i class="bi bi-dash-circle h3"></i>
                    </button>
                </li>
        `

        list!.innerHTML += li;
    }
}

function addBeer(id: number) {
    const beer = menu.find(beer => beer.id == id);
    orders.push({ beerId: beer!.id, id: idOrder++, status: "ordered" });
    totalPrice = parseFloat((totalPrice + beer!.price).toFixed(2));

    let badge = document.getElementById(`${id}_requested`);
    updateUI(id, badge);
}

function serveBeer(id: number) {
    const beer = menu.find(beer => beer.id == id);
    const idxToServe = orders.findIndex(order => order.beerId == id && order.status == "ordered");
    if (idxToServe !== -1) {
        orders[idxToServe].status = "served";
        totalPrice = parseFloat((totalPrice - beer!.price).toFixed(2));
    }

    let badge = document.getElementById(`${id}_requested`);
    updateUI(id, badge);
}

function updateUI(id: number, badge: HTMLElement) {
    badge!.innerHTML = orders.filter(order => order.beerId == id && order.status == "ordered").length.toString();
    document.getElementById('totalPrice')!.innerHTML = totalPrice.toString();
}

populateBeerList(menu);