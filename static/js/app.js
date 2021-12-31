//function for generating plots
async function main() {

    //load data from json file
    const response = await fetch("./samples.json");
    const data = await response.json();

    //test
    // console.log(data.metadata[0]); //access metadata
    // console.log(data.samples[0]); //access sample info


    //arrays of data for initial load, already sorted by descending sample_values
    let sample_values = Object.values(data.samples[0].sample_values).slice(0,10);
    // console.log(sample_values);
    let otu_ids = Object.values(data.samples[0].otu_ids).slice(0,10);
  
    //add "OTU" to beginning of otu id numbers
    for (let i = 0; i < otu_ids.length; i++){
        otu_ids[i] = "OTU " + otu_ids[i];
    };
    // console.log(otu_ids);

    let otu_labels = Object.values(data.samples[0].otu_labels).slice(0,10);
    // console.log(otu_labels);


    //Trace 1, horizontal bar chart (dropdown menu?) of top 10 OTUs/individual
    let trace = [{
        x: sample_values, 
        y: otu_ids,
        text: otu_labels,
        type: 'bar',
        orientation: 'h' 
    }];

    // const layout = {
        
    // }; 

    Plotly.newPlot('bar', trace);//, layout);

    //Trace 2, Bubble chart of each sample
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.


    //Display the sample metadata, i.e., an individual's demographic information.
    //Display each key-value pair from the metadata JSON object somewhere on the page.


    //Add eventListener to change which sample is displayed

};

//call main to initialize page
main();