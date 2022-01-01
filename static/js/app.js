//function for generating plots
async function main() {

    //load data from json file
    const response = await fetch("./samples.json");
    const data = await response.json();

    //test
    // console.log(data.metadata[0]); //access metadata
    // console.log(data.samples[0]); //access sample info


    //arrays of data for initial load, already sorted by descending sample_values
    let sample_values = Object.values(data.samples[0].sample_values);
    // console.log(sample_values);
    let otu_ids = Object.values(data.samples[0].otu_ids);
  
    //add "OTU" to beginning of otu id numbers
    for (let i = 0; i < otu_ids.length; i++){
        otu_ids[i] = "OTU " + otu_ids[i];
    };
    // console.log(otu_ids);

    let otu_labels = Object.values(data.samples[0].otu_labels);
    // console.log(otu_labels);


    //Trace 1, horizontal bar chart (dropdown menu?) of top 10 OTUs/individual
    let trace1 = [{
        x: sample_values.slice(0,10), 
        y: otu_ids.slice(0,10),
        text: otu_labels.slice(0,10),
        type: 'bar',
        orientation: 'h' 
    }];

    // const layout = {
        
    // }; 

    Plotly.newPlot('bar', trace1);//, layout);


    //Trace 2, Bubble chart of each sample
    let trace2 =[{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids, 
          size: sample_values
        }
    }];

    Plotly.newPlot('bubble', trace2);


    //Display the sample metadata, i.e., an individual's demographic information.
    //Display each key-value pair from the metadata JSON object somewhere on the page.
    //each key-value pair becomes an unordered list item, added to target element with class="panel-body"
    
    //transform data.metadata dictionary into array of strings "id: 928"
    console.log(data.metadata[0]); //values
    // console.log(Object.keys(data.metadata[0])); //keys

    let metadataKeys = Object.keys(data.metadata[0]);
    // console.log(metadataKeys);
    let metadataArray = [];
    //.map function? keys/values, object.keys(data.metadata[0]) + data.metadata[0]


    // console.log(Array.from(data.metadata[0]));


    //add each pair to ul
    const newUl = document.createElement('ul');
    for (let i=0; i<data.metadata[0]; i++) {
        newUl.textContent = data.metadata[0].i;
        console.log(newUl);
        document.querySelector('.panel-body').append(newUl);
    };
    
    
    
    //Add eventListener to change which sample is displayed

};

//call main to initialize page
main();