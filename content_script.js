

function removeDiv() {
    setTimeout(() => {
        // Select the element by its data-testid attribute
        const element = document.querySelector('[data-testid="cellInnerDiv"]');

        // Check if the element was found
        if (element) {
            console.log('Element found:', element);
            element.remove();
        } else {
            console.log('Element not found.');
        }
    }, 3000); // 2000 milliseconds = 2 seconds
}

// Remove the div when the document is ready
removeDiv();