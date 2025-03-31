document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Data
    const portfolioData = {
        assetAllocation: [
            { name: 'Stocks', value: 1698400, color: '#6B8DE3' },
            { name: 'Real Estate', value: 1061500, color: '#63C7FF' },
            { name: 'Bonds', value: 849200, color: '#FFB17A' },
            { name: 'Cash', value: 424600, color: '#FF7A7A' },
            { name: 'Alternative Investments', value: 212300, color: '#7C6BE3' }
        ],
        holdings: [
            {
                name: 'Global Equity Fund',
                symbol: 'GLBEQ',
                type: 'Stocks',
                value: 850000,
                allocation: 20,
                return: 12.5
            },
            {
                name: 'Commercial Property Portfolio',
                symbol: 'CPROP',
                type: 'Real Estate',
                value: 637000,
                allocation: 15,
                return: 8.2
            },
            {
                name: 'Government Bonds',
                symbol: 'GBOND',
                type: 'Bonds',
                value: 425000,
                allocation: 10,
                return: 4.5
            },
            {
                name: 'Tech Growth Fund',
                symbol: 'TECHG',
                type: 'Stocks',
                value: 510000,
                allocation: 12,
                return: 15.8
            },
            {
                name: 'Corporate Bond Fund',
                symbol: 'CORP',
                type: 'Bonds',
                value: 424200,
                allocation: 10,
                return: 5.2
            },
            {
                name: 'Residential REIT',
                symbol: 'RRET',
                type: 'Real Estate',
                value: 424500,
                allocation: 10,
                return: 7.5
            },
            {
                name: 'Private Equity Fund',
                symbol: 'PEQTY',
                type: 'Alternative Investments',
                value: 212300,
                allocation: 5,
                return: 18.5
            },
            {
                name: 'High-Yield Savings',
                symbol: 'CASH',
                type: 'Cash',
                value: 424600,
                allocation: 10,
                return: 2.8
            },
            {
                name: 'Emerging Markets Fund',
                symbol: 'EMKT',
                type: 'Stocks',
                value: 338400,
                allocation: 8,
                return: -5.2
            }
        ],
        performance: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            values: [4000000, 4050000, 4100000, 4080000, 4150000, 4200000, 4180000, 4220000, 4180000, 4250000, 4220000, 4246000]
        }
    };

    // Initialize Charts
    initializeAssetAllocationChart();
    initializePerformanceChart();
    initializeHoldingsTable();

    function initializeAssetAllocationChart() {
        const ctx = document.getElementById('assetAllocationChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: portfolioData.assetAllocation.map(asset => asset.name),
                datasets: [{
                    data: portfolioData.assetAllocation.map(asset => asset.value),
                    backgroundColor: portfolioData.assetAllocation.map(asset => asset.color),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '70%'
            }
        });

        // Create custom legend
        const legendContainer = document.getElementById('assetAllocationLegend');
        legendContainer.innerHTML = portfolioData.assetAllocation.map(asset => `
            <div class="legend-item">
                <div class="legend-color" style="background: ${asset.color}"></div>
                <span class="legend-label">${asset.name} - ${((asset.value / 4246000) * 100).toFixed(1)}%</span>
            </div>
        `).join('');
    }

    function initializePerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(99, 199, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(99, 199, 255, 0)');

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: portfolioData.performance.labels,
                datasets: [{
                    label: 'Portfolio Value',
                    data: portfolioData.performance.values,
                    borderColor: '#63C7FF',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    function initializeHoldingsTable() {
        const tableBody = document.getElementById('holdings-body');
        
        tableBody.innerHTML = portfolioData.holdings.map(holding => `
            <tr>
                <td>
                    <div class="asset-info">
                        <div class="asset-icon">
                            <i class="fas ${getAssetIcon(holding.type)}"></i>
                        </div>
                        <div class="asset-details">
                            <span class="asset-name">${holding.name}</span>
                            <span class="asset-symbol">${holding.symbol}</span>
                        </div>
                    </div>
                </td>
                <td>${holding.type}</td>
                <td>€${holding.value.toLocaleString()}</td>
                <td>
                    <div class="allocation-bar">
                        <div class="allocation-progress" style="width: ${holding.allocation}%"></div>
                    </div>
                    ${holding.allocation}%
                </td>
                <td class="return ${holding.return >= 0 ? 'positive' : 'negative'}">
                    ${holding.return >= 0 ? '+' : ''}${holding.return}%
                </td>
                <td>
                    <button class="action-btn">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Initialize sorting
        initializeSort();
    }

    function getAssetIcon(type) {
        const icons = {
            'Stocks': 'fa-chart-line',
            'Real Estate': 'fa-building',
            'Bonds': 'fa-file-invoice-dollar',
            'Cash': 'fa-money-bill-wave',
            'Alternative Investments': 'fa-chart-pie'
        };
        return icons[type] || 'fa-question';
    }

    function initializeSort() {
        const tableHeaders = document.querySelectorAll('.sortable');
        let currentSort = {
            column: 'value',
            direction: 'desc'
        };

        tableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.sort;
                
                if (currentSort.column === column) {
                    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.column = column;
                    currentSort.direction = 'asc';
                }

                sortHoldings(currentSort);
            });
        });
    }

    function sortHoldings(sort) {
        const tableBody = document.getElementById('holdings-body');
        const rows = Array.from(tableBody.getElementsByTagName('tr'));

        rows.sort((a, b) => {
            let aValue = getCellValue(a, sort.column);
            let bValue = getCellValue(b, sort.column);

            if (sort.column === 'value' || sort.column === 'allocation' || sort.column === 'return') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }

            if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });

        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
    }

    function getCellValue(row, column) {
        const cell = row.querySelector(`td:nth-child(${getColumnIndex(column)})`);
        switch (column) {
            case 'asset':
                return cell.querySelector('.asset-name').textContent;
            case 'value':
                return cell.textContent.replace(/[€,]/g, '');
            case 'allocation':
                return cell.textContent.replace('%', '');
            case 'return':
                return cell.textContent.replace(/[+%]/g, '');
            default:
                return cell.textContent.trim();
        }
    }

    function getColumnIndex(column) {
        const indices = {
            'asset': 1,
            'type': 2,
            'value': 3,
            'allocation': 4,
            'return': 5
        };
        return indices[column];
    }

    // Event Listeners for Chart Actions
    const chartButtons = document.querySelectorAll('.chart-actions .chart-btn');
    chartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonGroup = button.parentElement.querySelectorAll('.chart-btn');
            buttonGroup.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});