# Medical Service Management System

A complete HTML, CSS, and Bootstrap-based web application for managing medical services including Agents, Doctors, Patients, Prescriptions, Invoices, Lab Tests, Billing, and Institutes.

## Features

- ✅ **Agent Profile Management** - Complete CRUD operations
- ✅ **Doctor Profile Management** - With clinic information and registration
- ✅ **Patient Profile Management** - With agent reference and ID proof
- ✅ **Prescription Generator** - Printable prescription format with clinic logo
- ✅ **Invoice Generator** - Complete invoice with tests, rates, tax, and discounts
- ✅ **Lab Tests/Inventory** - Manage lab tests with rates and categories
- ✅ **Billing & Revenue Breakdown** - Automatic calculation of revenue, commissions, and costs
- ✅ **Institute Management** - Manage medical institutes

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling
- **Bootstrap 5.3.2** - Responsive UI framework
- **Bootstrap Icons** - Icon library
- **JavaScript** - Client-side logic and LocalStorage for data persistence

## File Structure

```
medical-management/
├── index.html              # Dashboard
├── agents.html             # Agent Management
├── doctors.html            # Doctor Management
├── patients.html           # Patient Management
├── prescriptions.html     # Prescription Generator
├── invoices.html           # Invoice Generator
├── lab-tests.html          # Lab Tests/Inventory
├── billing.html            # Billing & Revenue
├── institutes.html          # Institute Management
├── css/
│   └── style.css           # Custom styles
├── js/
│   └── app.js              # Application logic & LocalStorage
└── README.md               # This file
```

## Setup Instructions

1. **Download/Clone the project**
   ```bash
   # Extract the medical-management folder to your desired location
   ```

2. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - No server or installation required!
   - Works offline after first load

3. **Start Using**
   - Navigate through the sidebar menu
   - Add your first Agent, Doctor, or Patient
   - Create prescriptions and invoices
   - View billing breakdowns

## Usage Guide

### Dashboard
- View statistics for all modules
- Quick access to common actions

### Agent Management
- Add agents with Name, DOR, ID Proof, Mobile, Email, Emergency Contact, Address
- Edit and delete agents
- All data stored in browser LocalStorage

### Doctor Management
- Add doctors with Registration Number, Clinic Name, Logo URL, Specialization
- Manage doctor profiles
- Clinic logo appears on prescriptions

### Patient Management
- Add patients with complete profile information
- Link patients to agents
- Store ID Proof and SS Card information

### Prescription Generator
- Select patient and doctor
- Add ailments, symptoms, diagnosis, medicines, and instructions
- Print prescription with clinic logo and doctor signature box

### Invoice Generator
- Create invoices with multiple lab tests
- Automatic calculation of subtotal, tax, discount, and due amount
- Print invoices with complete details

### Lab Tests/Inventory
- Add lab tests with rates and categories
- Manage test inventory
- Tests available for selection in invoices

### Billing & Revenue
- Automatic billing calculation:
  - **A** = Total (Visit + Lab)
  - **B** = Doctor Fee (₹500)
  - **C** = Agent Commission (10% of A)
  - **D** = Lab Cost (50% of A)
  - **E** = Revenue (A - B - C - D)
- View revenue breakdown and summaries

### Institute Management
- Manage medical institutes
- Set type: "Doctor checkup + Lab", "Lab Only", or "Clinic Only"

## Data Storage

- All data is stored in **Browser LocalStorage**
- Data persists between sessions
- To reset: Clear browser LocalStorage or use browser's developer tools

## Browser Compatibility

- Chrome (Recommended)
- Firefox
- Edge
- Safari
- Opera

## Features Overview

### Billing Calculation Formula
```
A = Total Amount (Visit + Lab)
B = Doctor Fee = ₹500
C = Agent Commission = 10% of A
D = Lab Cost = 50% of A
E = Revenue = A - B - C - D
```

### Prescription Format Includes
- Clinic Logo/Name
- Patient Name & ID
- Doctor Registration/Signature box
- Visit Date
- Ailments box
- Symptoms box
- Diagnosis
- Medicines
- Instructions

### Invoice Format Includes
- Patient Name + ID
- Doctor Name, Phone, Address
- List of Tests with Rates
- Lab Analyst
- Total Amount
- Tax
- Discount/Mediclaim
- Paid Amount
- Due Amount

## Notes

- This is a **client-side only** application
- Data is stored in browser LocalStorage
- No backend server required
- No database installation needed
- Perfect for local use or small clinics
- For production use, consider adding backend integration

## Support

For issues or questions:
1. Check browser console for errors
2. Ensure JavaScript is enabled
3. Clear browser cache if needed
4. Try in a different browser

## License

Free to use for personal and commercial purposes.

---

**Happy Managing! 🏥**
