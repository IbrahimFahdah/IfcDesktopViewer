window.openFileDialog = function () {
    const sideMenu = document.getElementById('side-menu-left');
    sideMenu.firstChild.click();
};

window.clearModels = function () {
    const sideMenu = document.getElementById('side-menu-left');
    sideMenu.secondChild.click();
    //
};