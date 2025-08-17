// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the nav text
            const navText = this.querySelector('.nav-text').textContent;
            console.log(`Navigated to: ${navText}`);
        });
    });

    // Header actions functionality
    const notificationIcon = document.querySelector('.notification-icon');
    const settingsIcon = document.querySelector('.settings-icon');
    const profileAvatar = document.querySelector('.profile-avatar');

    notificationIcon.addEventListener('click', function() {
        console.log('Notifications clicked');
        // Add notification functionality here
    });

    settingsIcon.addEventListener('click', function() {
        console.log('Settings clicked');
        // Add settings functionality here
    });

    profileAvatar.addEventListener('click', function() {
        console.log('Profile clicked');
        // Add profile menu functionality here
    });

    // Animate stats on page load
    animateStats();
    
    // Animate chart bars
    animateChartBars();
});

// Function to animate stats numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace('k', '')) * 1000;
        
        animateValue(stat, 0, numericValue, 2000, finalValue.includes('k'));
    });
}

// Function to animate individual stat value
function animateValue(element, start, end, duration, isK) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = progress * (end - start) + start;
        
        if (isK) {
            element.textContent = (currentValue / 1000).toFixed(1) + 'k';
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Function to animate chart bars
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        const finalHeight = bar.style.height;
        bar.style.height = '0%';
        bar.style.transition = `height 0.8s ease-in-out ${index * 0.1}s`;
        
        setTimeout(() => {
            bar.style.height = finalHeight;
        }, 100);
    });
}

// Add hover effects for stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Responsive sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 600) {
        sidebar.style.transform = sidebar.style.transform === 'translateX(-100%)' ? 'translateX(0)' : 'translateX(-100%)';
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.transform = 'translateX(0)';
    }
});

// Simulate real-time data updates (optional)
function updateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const currentValue = parseFloat(stat.textContent.replace('k', ''));
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        const newValue = currentValue + variation;
        
        stat.textContent = newValue.toFixed(1) + 'k';
        
        // Update the change percentage
        const changeElement = stat.closest('.stat-card').querySelector('.change-percentage');
        const changeValue = (Math.random() - 0.5) * 20; // ±10% change
        
        changeElement.textContent = (changeValue > 0 ? '+' : '') + changeValue.toFixed(1) + '%';
        changeElement.parentElement.className = 'stat-change ' + (changeValue > 0 ? 'positive' : 'negative');
    });
}

