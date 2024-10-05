let submit = document.getElementById("submit");
let add = document.getElementById('add');
let order = document.getElementById('order');
let recipt = document.getElementById('recipt');
add.addEventListener("click", () => {
    let nid = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    span1.innerHTML = "Item Name";

    span2.innerHTML = 'Quantity';
    let newItem = document.createElement("input");
    newItem.type = 'text';

    let itemQ = document.createElement("input");
    itemQ.type = 'number';
    nid.appendChild(span1);
    nid.appendChild(newItem);
    nid.appendChild(span2);
    nid.appendChild(itemQ);

    order.appendChild(nid);
});

submit.addEventListener("click", async () => {
    let orders = {};
    let itemNames = order.children;
    //console.log(itemNames);
    for (let item = 0; item < itemNames.length; item++) {
        let a = itemNames[item].children;
        let b = a[1];
        let c = a[3];
        let od = {
            name: b.value,
            quantity: c.value
        };
        orders[item] = od;
    }
    //console.log(orders);
    let sending  = await fetch('/sendOrder', {
        method: "POST", headers: {
            'content-type': 'application/JSON'
        }, body: JSON.stringify(orders)
    });
    let res = await sending.json();
    console.log(res);

    for (let i in res) {
        recipt.innerHTML = "";
        let s = document.createElement('span');
        let t = document.createElement('span');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        span1.innerHTML = "Item : ";
        span2.innerHTML = "Price : ";
        s.innerHTML = res[i].name;
        t.innerHTML = res[i].price;
        let a = document.createElement('div');
        a.appendChild(span1);
        a.appendChild(s);
        a.appendChild(span2);
        a.appendChild(t);
        a.style.display = 'grid';
        a.style.gridTemplateColumns = " 1fr 1fr 1fr 1fr";
        a.style.gap = "10px";
        recipt.appendChild(a);
    }
});
add.click();