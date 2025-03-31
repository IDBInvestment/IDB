document.addEventListener('DOMContentLoaded', () => {
    // Transfer type switching
    const optionBtns = document.querySelectorAll('.option-btn');
    const formContainers = document.querySelectorAll('.transfer-form-container');

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            optionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding form
            const formType = btn.dataset.type;
            formContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === `${formType}-transfer` || 
                    container.id === `${formType}-trading`) {
                    container.classList.add('active');
                }
            });
        });
    });

    // Form Validation and Submission
    const forms = document.querySelectorAll('.transfer-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                showConfirmationDialog(form);
            }
        });
    });

    function validateForm(form) {
        let isValid = true;
        const formGroups = form.querySelectorAll('.form-group');

        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            if (input && input.required && !input.value.trim()) {
                markError(group, 'This field is required');
                isValid = false;
            } else if (input.type === 'number' && input.value < 0) {
                markError(group, 'Amount must be positive');
                isValid = false;
            } else if (input.type === 'text' && input.placeholder.includes('IBAN')) {
                if (!validateIBAN(input.value)) {
                    markError(group, 'Invalid IBAN format');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function markError(formGroup, message) {
        formGroup.classList.add('error');
        let errorDiv = formGroup.querySelector('.validation-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'validation-error';
            formGroup.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function validateIBAN(iban) {
        // Basic IBAN validation - can be enhanced based on requirements
        const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
        return ibanRegex.test(iban.replace(/\s/g, ''));
    }

    function showConfirmationDialog(form) {
        // Gather form data
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        // Create confirmation dialog
        const dialog = document.createElement('div');
        dialog.className = 'confirmation-dialog';
        dialog.innerHTML = `
            <div class="dialog-content">
                <h2>Confirm Transfer</h2>
                <div class="confirmation-details">
                    ${Object.entries(formValues).map(([key, value]) => `
                        <div class="detail-row">
                            <span class="detail-label">${formatLabel(key)}:</span>
                            <span class="detail-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="dialog-actions">
                    <button class="confirm-btn">Confirm</button>
                    <button class="cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        // Add dialog to page
        document.body.appendChild(dialog);

        // Handle dialog actions
        const confirmBtn = dialog.querySelector('.confirm-btn');
        const cancelBtn = dialog.querySelector('.cancel-btn');

        confirmBtn.addEventListener('click', () => {
            processTransfer(formValues);
            dialog.remove();
        });

        cancelBtn.addEventListener('click', () => {
            dialog.remove();
        });
    }

    function formatLabel(key) {
        return key.split(/(?=[A-Z])/).join(' ').toLowerCase()
                 .replace(/^\w/, c => c.toUpperCase());
    }

    function processTransfer(formData) {
        // Simulate transfer processing
        console.log('Processing transfer:', formData);
        
        // Show success message
        showNotification('Transfer initiated successfully!', 'success');
        
        // Reset form
        const activeForm = document.querySelector('.transfer-form-container.active form');
        activeForm.reset();
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }, 100);
    }

    // Add input event listeners to remove error states
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorDiv = formGroup.querySelector('.validation-error');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
    });
});