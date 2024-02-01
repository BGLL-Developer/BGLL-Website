import { subAgents } from './agents.js';
document.addEventListener("DOMContentLoaded", function () {
    const districtButtonsContainer = document.getElementById("districtButtons");
    const agentsTable = document.getElementById("agentsTable");

    // Get all unique districts
    const districts = [...new Set(subAgents.map(agent => agent.District))];

    // Create buttons for each district
    districts.forEach(district => {
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("col-sm", "mb-2"); // Bootstrap column classes

        const button = document.createElement("button");
        button.textContent = district;
        button.classList.add("btn", "btn-primary", "w-100"); // Button takes full width
        button.addEventListener("click", function () {
            populateAgentsTable(district);
        });

        buttonDiv.appendChild(button);
        districtButtonsContainer.appendChild(buttonDiv);
    });

    // Function to populate agents based on district
    function populateAgentsTable(district) {
        // Filter agents based on district
        const agentsInDistrict = subAgents.filter(agent => agent.District === district);

        // Clear previous table content
        agentsTable.innerHTML = "";

        // Create table headers
        const tableHeaders = `
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Business Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Community</th>
                    <th scope="col">District</th>
                </tr>
            </thead>
        `;
        agentsTable.insertAdjacentHTML("beforeend", tableHeaders);

        // Populate table with agents
        const tableBody = document.createElement("tbody");
        agentsInDistrict.forEach((agent, index) => {
            const row = `
                <tr>
                    <td style="text-align: left;">${index + 1}</td>
                    <td style="text-align: left;">${agent.BusinessName}</td>
                    <td style="text-align: left;">${agent.Address}</td>
                    <td style="text-align: left;">${agent.Community}</td>
                    <td style="text-align: left;">${agent.District}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML("beforeend", row);
        });
        agentsTable.appendChild(tableBody);
    }
});