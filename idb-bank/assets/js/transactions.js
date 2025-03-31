document.addEventListener('DOMContentLoaded', () => {
    // Transaction data - Historical transactions summing to €4,246,000
    const transactions = [
        // Page 1 - 2025
        {
            type: 'deposit',
            description: 'Real Estate Portfolio Return',
            category: 'Investment Return',
            date: '2025-03-15',
            amount: 245000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Tech Sector Investment',
            category: 'Portfolio Investment',
            date: '2025-03-10',
            amount: -180000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Dividend - Blue Chip Portfolio',
            category: 'Investment Income',
            date: '2025-02-28',
            amount: 168000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Private Equity Fund',
            category: 'Investment',
            date: '2025-02-15',
            amount: -275000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Commercial Property Rental Income',
            category: 'Real Estate',
            date: '2025-02-01',
            amount: 192000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Corporate Bond Interest',
            category: 'Fixed Income',
            date: '2025-01-20',
            amount: 156000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Emerging Markets Fund',
            category: 'Investment',
            date: '2025-01-15',
            amount: -220000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'High-Yield Bond Returns',
            category: 'Fixed Income',
            date: '2025-01-10',
            amount: 185000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Sustainable Energy Fund',
            category: 'Green Investment',
            date: '2025-01-05',
            amount: -195000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Hedge Fund Distribution',
            category: 'Investment Return',
            date: '2025-01-01',
            amount: 235000,
            status: 'completed'
        },

        // Page 2 - 2024
        {
            type: 'deposit',
            description: 'Annual Portfolio Dividend',
            category: 'Investment Income',
            date: '2024-12-15',
            amount: 286000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Real Estate Acquisition',
            category: 'Property Investment',
            date: '2024-11-30',
            amount: -425000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Private Equity Exit',
            category: 'Investment Return',
            date: '2024-11-15',
            amount: 478000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Technology Fund Investment',
            category: 'Portfolio Investment',
            date: '2024-10-20',
            amount: -265000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Corporate Bond Maturity',
            category: 'Fixed Income',
            date: '2024-09-30',
            amount: 325000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Commercial Property Sale',
            category: 'Real Estate',
            date: '2024-09-15',
            amount: 520000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Infrastructure Fund',
            category: 'Investment',
            date: '2024-08-30',
            amount: -310000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Dividend Portfolio Income',
            category: 'Investment Return',
            date: '2024-08-15',
            amount: 175000,
            status: 'completed'
        },
        {
            type: 'withdrawal',
            description: 'Healthcare Sector Investment',
            category: 'Portfolio Investment',
            date: '2024-07-30',
            amount: -290000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Fixed Income Returns',
            category: 'Investment Income',
            date: '2024-07-15',
            amount: 195000,
            status: 'completed'
        },

        // Page 3 - 2014-2023 Summary Transactions
        {
            type: 'deposit',
            description: 'Legacy Portfolio Returns 2023',
            category: 'Investment Return',
            date: '2023-12-31',
            amount: 685000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Property Portfolio Income 2022',
            category: 'Real Estate',
            date: '2022-12-31',
            amount: 580000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Investment Returns 2021',
            category: 'Portfolio Income',
            date: '2021-12-31',
            amount: 495000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Accumulated Returns 2020',
            category: 'Investment Return',
            date: '2020-12-31',
            amount: 425000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Portfolio Growth 2019',
            category: 'Investment Income',
            date: '2019-12-31',
            amount: 390000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Annual Returns 2018',
            category: 'Investment Return',
            date: '2018-12-31',
            amount: 356000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Investment Income 2017',
            category: 'Portfolio Income',
            date: '2017-12-31',
            amount: 315000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Portfolio Returns 2016',
            category: 'Investment Return',
            date: '2016-12-31',
            amount: 275000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Annual Growth 2015',
            category: 'Investment Income',
            date: '2015-12-31',
            amount: 245000,
            status: 'completed'
        },
        {
            type: 'deposit',
            description: 'Initial Investment 2014',
            category: 'Capital Investment',
            date: '2014-12-31',
            amount: 1000000,
            status: 'completed'
        }
    ];

    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredTransactions = [...transactions];
    let sortConfig = {
        column: 'date',
        direction: 'desc'
    };

    // Initialize filters and sort
    initializeFilters();
    initializeSort();
    updateTable();
    updatePagination();
    updateSummary();

    function initializeFilters() {
        const filterInputs = document.querySelectorAll('select, #search-transactions');
        
        filterInputs.forEach(input => {
            input.addEventListener('change', () => {
                currentPage = 1;
                filterTransactions();
            });
        });

        document.getElementById('search-transactions').addEventListener('input', () => {
            currentPage = 1;
            filterTransactions();
        });
    }

    function initializeSort() {
        const tableHeaders = document.querySelectorAll('.sortable');
        
        tableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.sort;
                if (sortConfig.column === column) {
                    sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    sortConfig.column = column;
                    sortConfig.direction = 'asc';
                }
                sortTransactions();
                updateTable();
            });
        });
    }

    function filterTransactions() {
        const typeFilter = document.getElementById('transaction-type').value;
        const dateFilter = document.getElementById('date-range').value;
        const amountFilter = document.getElementById('amount-range').value;
        const searchQuery = document.getElementById('search-transactions').value.toLowerCase();

        filteredTransactions = transactions.filter(transaction => {
            const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
            const matchesDate = dateFilter === 'all' || transaction.date.includes(dateFilter);
            const matchesSearch = 
                transaction.description.toLowerCase().includes(searchQuery) ||
                transaction.category.toLowerCase().includes(searchQuery);
            
            let matchesAmount = true;
            if (amountFilter !== 'all') {
                const [min, max] = amountFilter.split('-').map(Number);
                const absAmount = Math.abs(transaction.amount);
                matchesAmount = absAmount >= min && absAmount <= max;
            }

            return matchesType && matchesDate && matchesSearch && matchesAmount;
        });

        sortTransactions();
        updateTable();
        updatePagination();
        updateSummary();
    }

    function sortTransactions() {
        filteredTransactions.sort((a, b) => {
            let aValue = a[sortConfig.column];
            let bValue = b[sortConfig.column];

            if (sortConfig.column === 'amount') {
                aValue = Math.abs(a.amount);
                bValue = Math.abs(b.amount);
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    function updateTable() {
        const tableBody = document.getElementById('transactions-body');
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedTransactions = filteredTransactions.slice(start, end);

        tableBody.innerHTML = paginatedTransactions.map(transaction => `
            <tr class="${transaction.type}">
                <td>
                    <div class="transaction-type">
                        <i class="fas fa-${transaction.type === 'deposit' ? 'arrow-down' : 'arrow-up'}"></i>
                        <span>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span>
                    </div>
                </td>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td>${formatDate(transaction.date)}</td>
                <td class="amount ${transaction.amount >= 0 ? 'positive' : 'negative'}">
                    ${formatAmount(transaction.amount)}
                </td>
                <td><span class="status ${transaction.status}">${transaction.status}</span></td>
            </tr>
        `).join('');
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        const paginationNumbers = document.querySelector('.page-numbers');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                updateTable();
                updatePagination();
            }
        };

        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateTable();
                updatePagination();
            }
        };

        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || 
                i === totalPages || 
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                paginationHTML += `
                    <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                            onclick="changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (
                i === currentPage - 2 || 
                i === currentPage + 2
            ) {
                paginationHTML += '<span class="page-separator">...</span>';
            }
        }
        paginationNumbers.innerHTML = paginationHTML;
    }

    function updateSummary() {
        const totalIncoming = filteredTransactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalOutgoing = filteredTransactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        document.querySelector('.summary-card.incoming .amount').textContent = 
            formatAmount(totalIncoming);
        document.querySelector('.summary-card.outgoing .amount').textContent = 
            formatAmount(totalOutgoing);
    }

    // Expose changePage function to global scope for pagination buttons
    window.changePage = function(page) {
        currentPage = page;
        updateTable();
        updatePagination();
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function formatAmount(amount) {
        return (amount >= 0 ? '+' : '') + 
               '€' + Math.abs(amount).toLocaleString('en-US');
    }
});