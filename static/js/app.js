//function from html code, passes in the value selected
async function optionChanged(valueSel) {

    //load data from json file
    const response = await fetch("./samples.json");
    const data = await response.json();

    //populate drop-down with sample ID names
    let names = Object.values(data.names); 
    for (i=0; i<names.length; i++) {
        //set create methods as variables (have to do this inside the loop)
        const newOption = document.createElement('option');
        const attributeVal = document.createAttribute('value');
        
        //set display text and value to sample id name
        newOption.textContent = names[i];
        attributeVal.value = names[i];
        
        //add newOption
        document.querySelector("#selDataset").append(newOption);
        //add value attribute 
        newOption.setAttributeNode(attributeVal);
    }; 


    if (valueSel) {  //if a selection from the drop-down is made
        
        // find matching sample id index number    
        let indexSel = 0;
        for (let i=0; i<names.length;i++) {
            if (data.samples[i].id === valueSel){
                indexSel = i;
            }
        };
        //Call function to populate graphs & metadata
        displaySample(indexSel);
    } else { 
        //initial page load: graphs and metadata of first sample
        displaySample(0);   
    };

    function displaySample(indexSel) {
        //create arrays for selected sample:
        let sample_values = Object.values(data.samples[indexSel].sample_values);
        let otu_labels = Object.values(data.samples[indexSel].otu_labels);
        let otu_ids = Object.values(data.samples[indexSel].otu_ids);
        //add "OTU" to beginning of otu id numbers for trace1
        let otu_ids_labeled = otu_ids.map(id => "OTU " + id);
        let metadataStrings = (Object.entries(data.metadata[indexSel]))
            .map(item => `${item[0]}: ${item[1]}`);
        

        //Trace 1, horizontal bar chart of top 10 samples
        let trace1 = [{
            x: sample_values.slice(0,10).reverse(), 
            y: otu_ids_labeled.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h' 
        }];
    
        const layout1 = {
            title: '10 Most Frequently Occuring OTUs'
        }; 
    
        Plotly.newPlot('bar', trace1, layout1);

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

        let layout2 = {
            title: 'Number of samples per OTU',
            xaxis: {
            title: 'OTU ID',
            }, 
        };
        
        Plotly.newPlot('bubble', trace2, layout2);

        //remove any previous sample metadata
        let oldMeta = document.querySelectorAll('#meta');
        for (let i=0;i<oldMeta.length;i++) {
            oldMeta[i].remove();
        }
     
        //display current sample metadata
        metadataStrings.map(item => {
            let newP = document.createElement('p');
            newP.textContent = item;
            newP.id = "meta";
            document.querySelector('.panel-body').appendChild(newP);
        });
    }

};

//call to initialize page
optionChanged();