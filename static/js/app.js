var tbody = d3.select("tbody");

// from data.js
var tableData = data;

// Add sightings data to page.
function insertTable(inputData) {
    
    // Check whether inputData is empty.
    if (inputData.length == 0) {
        tbody.text("Search criteria not found.");
    };

    inputData.forEach((sightingsData) => {
        var row = tbody.append("tr");
        Object.entries(sightingsData).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

// Clear the table.
function removeTable() {
    let tableRows = d3.selectAll("tbody>tr");
    tableRows.remove();
    tbody.text("");
}

// Level 1 homework.
/*
function filterTable(event) {

    // Prevent the page from refreshing.
    d3.event.preventDefault();

    // Grab the value of the date search field.
    var searchDate = d3.select("#datetime")
        .property("value");

    // Search the data.
    var filteredData = tableData.filter(sighting => sighting.datetime === searchDate);
    console.log(filteredData);
    removeTable();
    insertTable(filteredData);
}
*/

// Level 2 homework.
function filterTable(event) {

    // Prevent the page from refreshing.
    d3.event.preventDefault();

    // Grab the value of each search field.
    let searchCriteria = d3.selectAll("input");
    let searchTerms = [];

    // Selections from d3 use .each() instead of .forEach().
    searchCriteria.each(function () {  // Do not use an arrow function here!
        currentNode = d3.select(this); // "this" does not bind over arrow functions.
        if (currentNode.property("value") !== "") {
            let searchTerm = {
                type: currentNode.attr("id"),
                data: currentNode.property("value")
            };
            searchTerms.push(searchTerm);
        };
    });

    // Search the data for each attribute found.
    let searchedData = tableData;
    searchTerms.forEach((entry) => searchedData = searchedData.filter(sighting => sighting[entry.type] === entry.data));

    // Build the table.
    removeTable();
    insertTable(searchedData);
}


// Attach an event to detect changes to the input field.
var filterBtn = d3.select("#filter-btn");
filterBtn.on("click", filterTable);
