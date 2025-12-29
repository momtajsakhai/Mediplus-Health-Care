// ================================
// Storage Helpers
// ================================
const Storage = {
    get: key => JSON.parse(localStorage.getItem(key) || '[]'),
    set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    add: (key, item) => {
        const data = Storage.get(key);
        const newId = data.length ? Math.max(...data.map(d => d.id || 0)) + 1 : 1;
        item.id = newId;
        data.push(item);
        Storage.set(key, data);
        return item;
    },
    delete: (key, id) => {
        const data = Storage.get(key).filter(item => item.id !== id);
        Storage.set(key, data);
        return data;
    }
};

// ================================
// Load and Render Invoices
// ================================
function renderInvoices() {
    const invoices = Storage.get('invoices');
    const tbody = document.getElementById('invoiceTableBody');

    if (!invoices.length) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted">No invoices found.</td></tr>';
        return;
    }

    tbody.innerHTML = invoices.map((inv, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${inv.patientName || 'N/A'}</td>
            <td>${inv.doctorName || 'N/A'}</td>
            <td>${inv.agentName || 'N/A'}</td>
            <td>${inv.visitDate || 'N/A'}</td>
            <td>₹${parseFloat(inv.total).toFixed(2)}</td>
            <td>${parseFloat(inv.discount).toFixed(2)}</td>
            <td>₹${parseFloat(inv.payment).toFixed(2)}</td>
            <td>₹${parseFloat(inv.due).toFixed(2)}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="viewInvoice(${index})">
                    <i class="bi bi-printer me-1"></i> Print
                </button>
            </td>
        </tr>
    `).join('');

    updateDuesBadge();
}

// ================================
// View/Print Invoice
// (Existing code from your HTML page)
// ================================
function viewInvoice(index) {
    const invoices = Storage.get('invoices');
    const inv = invoices[index];
    if (!inv) return;

    const priceMap = { "Blood Test":50, "X-Ray":100, "MRI":500, "Urine Test":30, "ECG":70 };
    let testsRows = '';
    (inv.tests || '').split(',').map(t=>t.trim()).forEach(testName=>{
        const price = priceMap[testName] || 0;
        testsRows += `<tr><td>${testName}</td><td style="text-align:right;">₹${price.toFixed(2)}</td></tr>`;
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>Invoice</title>
        <style>
            body{font-family:Arial,sans-serif;padding:20px;}
            table{width:100%;border-collapse:collapse;margin-top:20px;}
            th,td{border:1px solid #000;padding:5px;text-align:left;}
            th{background:#f2f2f2;}
            .header{text-align:center;}
            .signature{text-align:right;margin-top:40px;font-size:14px;}
            hr{border:1px solid #000;margin:5px 0;}
        </style>
        </head>
        <body onload="window.print();">
            <div class="header">
                <img src="logo.png" alt="Clinic Logo" style="height:70px;">
                <h2 style="margin:0;font-size:18px;font-weight:bold;">Mediplus Health Care</h2>
                <h5 style="margin:0;font-size:12px;">24/A Sriram Siromoni Road (Satimar Goli), Berhampore</h5>
                <h6 style="margin:0;font-size:11px;">Phone: 9800958006 / 9800758005 | Email: mediplus.health@gmail.com</h6>
            </div>
            <hr>
            <div style="display:flex; flex-wrap:wrap; margin-bottom:10px;">
                <div style="width:50%;"><strong>Patient Name:</strong> ${inv.patientName}</div>
                <div style="width:50%;"><strong>Doctor Name:</strong> ${inv.doctorName}</div>
                <div style="width:50%;"><strong>Agent Name:</strong> ${inv.agentName}</div>
                <div style="width:50%;"><strong>Visit Date:</strong> ${inv.visitDate}</div>
            </div>
            <h4>Tests</h4>
            <table border="1">
                <thead><tr><th>Test Name</th><th style="text-align:right;">Price (₹)</th></tr></thead>
                <tbody>${testsRows}</tbody>
            </table>
            <h4>Payment Details</h4>
            <p><strong>Total:</strong> ₹${parseFloat(inv.total).toFixed(2)}</p>
            <p><strong>Discount:</strong> ₹${(parseFloat(inv.total)*parseFloat(inv.discount)/100).toFixed(2)}</p>
            <p><strong>Payment Made:</strong> ₹${parseFloat(inv.payment).toFixed(2)}</p>
            <p><strong>Due Amount:</strong> ₹${parseFloat(inv.due).toFixed(2)}</p>
            <div class="signature"><strong>Accountant Signature:</strong> ____________________________</div>
            <hr><p style="text-align:center;">Thank you for choosing our service.</p>
        </body></html>
    `);
    printWindow.document.close();
}

// ================================
// Update Dues Badge
// ================================
function updateDuesBadge() {
    const invoices = Storage.get('invoices');
    const totalDues = invoices.reduce((sum, inv) => sum + parseFloat(inv.due || 0), 0);
    document.getElementById('duesBadge').innerText = totalDues.toFixed(2);
}

// ================================
// Populate Dues Modal
// ================================
const duesModal = document.getElementById('duesModal');
if (duesModal) {
    duesModal.addEventListener('show.bs.modal', function () {
        const tbody = document.querySelector('#duesTable tbody');
        const invoices = Storage.get('invoices').filter(inv => parseFloat(inv.due || 0) > 0);
        tbody.innerHTML = invoices.map(inv => `
            <tr>
                <td>${inv.patientId || ''}</td>
                <td>${inv.patientName}</td>
                <td>${inv.agentId || ''}</td>
                <td>${inv.agentName}</td>
                <td>₹${parseFloat(inv.due).toFixed(2)}</td>
            </tr>
        `).join('');
        const totalDues = invoices.reduce((sum, inv) => sum + parseFloat(inv.due), 0);
        document.getElementById('totalDues').innerText = `₹${totalDues.toFixed(2)}`;
    });
}

// ================================
// Initialize Page
// ================================
document.addEventListener('DOMContentLoaded', () => {
    renderInvoices();
});
