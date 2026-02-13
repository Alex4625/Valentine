
// File ini tidak lagi digunakan. Semua logika analitik dapat dipindahkan ke file lain jika diperlukan.
// Hapus kode di bawah jika tidak ada dependensi.

async function executeAdvancedAnalyticsSequence() {
    try {
        const complaintsData = await fetchComplaintsData();

        // Process data to group by branch and type
        const analyticsData = {};
        complaintsData.forEach(complaint => {
            if (!analyticsData[complaint.branch]) {
                analyticsData[complaint.branch] = {};
            }
            analyticsData[complaint.branch][complaint.type] = complaint.count;
        });

        // Generate HTML table
        let tableHTML = `
            <table border="1" style="width: 100%; text-align: center; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>الفرع</th>
                        <th>نوع الشكوى</th>
                        <th>عدد الشكاوى</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const branch in analyticsData) {
            const types = analyticsData[branch];
            let firstRow = true;
            for (const type in types) {
                tableHTML += `
                    <tr>
                        <td>${firstRow ? branch : ''}</td>
                        <td>${type}</td>
                        <td>${types[type]}</td>
                    </tr>
                `;
                firstRow = false;
            }
        }

        tableHTML += `
                </tbody>
            </table>
        `;

        // Update the table in the DOM
        const tableElement = document.getElementById('analyticsTable');
        if (tableElement) {
            tableElement.innerHTML = tableHTML;
        } else {
            console.error('Element with id "analyticsTable" not found.');
        }

        console.log('Analytics table updated successfully.');
    } catch (error) {
        console.error('Error executing analytics sequence:', error);
    }
}

// Function to start the looping analytics update
function startAnalyticsLoop(interval = 5000) {
    executeAdvancedAnalyticsSequence(); // Initial run
    setInterval(executeAdvancedAnalyticsSequence, interval);
}

// Call to start the loop when the script loads
startAnalyticsLoop();
