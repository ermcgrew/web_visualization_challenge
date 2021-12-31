//function for generating plots
async function main() {

    //load data from json file
    const response = await fetch("./samples.json");
    const data = await response.json();

    //test
    console.log(data.names); //data loads in
    


};

//call main to initialize page
main();