window.openFileDialog = function () {
    const sideMenu = document.getElementById('side-menu-left');
    if (sideMenu.firstChild === null || sideMenu.firstChild === undefined)
        return;
    sideMenu.firstChild.click();
};

window.clearModels = function () {
    const sideMenu = document.getElementById('side-menu-left');
    if (sideMenu.children[1] === null || sideMenu.children[1] === undefined)
        return;

    sideMenu.children[1].click();
};

function selectedEleChanged(props) {

    delete props.psets;
    delete props.mats;
    delete props.type;
    let atts = {};
    for (let key in props) {

        let value = props[key];
        if (value === null || value === undefined) value = "undefined";
        else if (value.value) value = value.value;
        atts[key] = (value);

    }

    window.NetHelpers.setPropertyList(atts);
};