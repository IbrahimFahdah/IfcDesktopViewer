
window.startIfcJs();

document.getElementById('openFileLink').addEventListener('click', function () {
    let inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.ifc';

    inputElement.addEventListener('change', function () {
        if (inputElement.files.length > 0) {
            let selectedFile = inputElement.files[0];
            loadIfc(URL.createObjectURL(selectedFile), false);
        }
    });

    inputElement.click();
});

window.openFileDialog = function () {
    let link = document.getElementById('openFileLink');
    if (link) {
        link.click();
    } else {
        console.error('Element with id "link" not found.');
    }
};