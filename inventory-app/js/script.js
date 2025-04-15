document.addEventListener('DOMContentLoaded', () => {
    loadItems();

    document.getElementById('itemForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;

        const response = await fetch('php/add_item.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${name}&quantity=${quantity}&price=${price}`
        });

        const result = await response.json();
        if (result.status === 'success') {
            document.getElementById('itemForm').reset();
            loadItems();
        }
    });
});

async function loadItems() {
    const response = await fetch('php/get_items.php');
    const items = await response.json();
    
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
            <td>${new Date(item.created_at).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    });
}