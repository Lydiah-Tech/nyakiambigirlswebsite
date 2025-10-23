// Smooth scrolling with offset and active link highlighting
const headerHeight = 60; // Adjust based on your header height

function updateActiveLink() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            const rect = target.getBoundingClientRect();
            const isVisible = rect.top <= 100 && rect.bottom > 100; // 100px buffer
            if (isVisible) {
                anchor.classList.add('active');
            } else {
                anchor.classList.remove('active');
            }
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            setTimeout(updateActiveLink, 500); // Update active link after scroll
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);

// Initial call to set active link on page load
updateActiveLink();

// Hamburger menu toggle (optional, enable if needed)
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Chart for stream growth (based on history data)
const ctx = document.getElementById('streamsChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1968", "1988", "2002", "2009", "2018"],
        datasets: [{
            label: "Number of Streams",
            data: [2, 2, 3, 4, 5],
            borderColor: "#c8102e",
            backgroundColor: "rgba(200, 16, 46, 0.2)",
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Growth of Streams at Nyakiambi Girls Secondary School"
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: "Number of Streams" }
            },
            x: {
                title: { display: true, text: "Year" }
            }
        }
    }
});