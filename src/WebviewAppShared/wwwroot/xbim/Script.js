
var showEntityPropsOnHover;
var lastHoverPick;
var hovertimer;
var splitInstance;
var hovertimer;
entitiesExtendedData = {};
var pickEntity;
var modelVisibilityaction;
var modelVisibilitySelections = {};
var mouseaction = "noaction";
var html;
var sectionClip = false;
var secStartX;
var secStartY;
var secStartZ;
var secStartXtranslated;
var secStartYtranslated;
var secStartZtranslated;
var lengthX, lengthY, lengthZ;
var modelIds = [];
const viewer = new Viewer("viewer");
viewer.background = [0, 0, 0, 0];
var cube = new NavigationCube();

cube.passiveAlpha = 0.8;
cube.ratio = 0.08;
viewer.addPlugin(cube);
viewer.hoverPickEnabled = true;

document.getElementById('openFileLink').addEventListener('click', function () {
    let inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.wexBIM';

    inputElement.addEventListener('change', function () {
        if (inputElement.files.length > 0) {
            let selectedFile = inputElement.files[0];
            //unload(modelId);
            viewer.loadAsync(selectedFile, false);
        }
    });

    inputElement.click();
});

function unload(id) {
    viewer.unload(id);
    viewer.draw();
}

window.openFileDialog = function () {

    let link = document.getElementById('openFileLink');
    if (link) {
        link.click();
    } else {
        alert('Element with id "link" not found.');
        console.error('Element with id "link" not found.');
    }
};

window.clearModels = function () {
    modelIds.forEach(function (item, index) {
        viewer.unload(item);
    });
    modelIds = [];
    viewer.draw();
};

viewer.on("hoverpick", function (arg) {
    if (arg && arg.model && arg.id) {
        clearTimeout(hovertimer);
    }
    else {
        clearTimeout(hovertimer);
    }
});

viewer.on('loaded', args => {
    try {
        modelIds.push(args.model);
        viewer.start();
        viewer.show(ViewType.DEFAULT, null, null, false);
        getStartBboxCoordinates();
        $("#clippingopt button").button();
        $("#slider-sec-x").slider({
            range: true,
            min: 0,
            max: lengthX,
            values: [0, lengthX],
            slide: function (event, ui) {
                $("#seclenX").val(ui.values[0] + ' - ' + ui.values[1]);
                secStartXtranslated = secStartX + ((ui.values[0] + ui.values[1]) / 2) / 2;
                viewer.sectionBox.location = [secStartXtranslated, secStartYtranslated, secStartZtranslated];
                viewer.sectionBox.lengthX = ((ui.values[1] - ui.values[0]) / 2);
            }
        });
        $("#seclenX").val($("#slider-sec-x").slider("values", 0) + ' - ' + $("#slider-sec-x").slider("values", 1));

        $("#slider-sec-y").slider({
            range: true,
            min: 0,
            max: lengthY,
            values: [0, lengthY],
            slide: function (event, ui) {
                $("#seclenY").val(ui.values[0] + ' - ' + ui.values[1]);
                secStartYtranslated = secStartY + ((ui.values[0] + ui.values[1]) / 2) / 2;
                viewer.sectionBox.location = [secStartXtranslated, secStartYtranslated, secStartZtranslated];
                viewer.sectionBox.lengthY = ((ui.values[1] - ui.values[0]) / 2);
            }
        });
        $("#seclenY").val($("#slider-sec-y").slider("values", 0) + ' - ' + $("#slider-sec-y").slider("values", 1));

        $("#slider-sec-z").slider({
            range: true,
            min: 0,
            max: lengthZ,
            values: [0, lengthZ],
            slide: function (event, ui) {
                $("#seclenZ").val(ui.values[0] + ' - ' + ui.values[1]);
                secStartZtranslated = secStartZ + ((ui.values[0] + ui.values[1]) / 2) / 2;
                viewer.sectionBox.location = [secStartXtranslated, secStartYtranslated, secStartZtranslated];
                viewer.sectionBox.lengthZ = ((ui.values[1] - ui.values[0]) / 2);
            }
        });
        $("#seclenZ").val($("#slider-sec-z").slider("values", 0) + ' - ' + $("#slider-sec-z").slider("values", 1));
    } catch (e) {

    }
});

viewer.on("pick", function (args) {
    if (!args.model || !args.id)
        return;
    if (mouseaction == 'select') {
        viewer.setState(State.HIGHLIGHTED, [args.id], args.model);
        modelVisibilitySelections[args.id] = args;
    }
});

function showHoverPopup(allProps, pickedId, arg) {
    let type = viewer.getProductType(pickedId, arg.Model);
    let contents = '<div id="attsTitleDiv"> Entity Properties</div>';
    contents += '<table style="width: 100%">';
    contents += "<tr><td>Entity Type</td><td>" + ProductType[type] + "</td></tr>";

    let propertySets = allProps.Properties;
    for (const key in propertySets) {
        let name = key;
        contents += '<tr ><th colspan="3">' + name + '</th></tr>';
        let properties = propertySets[key];
        for (const index in properties) {
            let name = properties[index].Name;
            let value = properties[index].Value;
            contents += "<tr><td>" + name + "</td><td>" + value + "</td></tr>";
        }
    }

    contents += "</table>";

    let elPopup = document.getElementById("attrprop");
    elPopup.style.visibility = "hidden";
    elPopup.innerHTML = contents;
    Object.assign(elPopup.style, {
        left: `${arg.event.clientX + 5}px`,
        top: `${arg.event.clientY + 5}px`,
        display: `block`,
        visibility: `visible`
    });
}


function applyModelVisibility() {

    mouseaction = "noaction";

    switch (modelVisibilityaction) {
        case "hide":
            for (let id in modelVisibilitySelections) {
                viewer.setState(State.HIDDEN, [id], modelVisibilitySelections[id].model);
            }
            break;
        case "isolate":
            hideModel();
            for (let id in modelVisibilitySelections) {
                viewer.resetState([id], modelVisibilitySelections[id].model);
            }
            break;
        case "isolateType":
            hideModel();
            for (let id in modelVisibilitySelections) {
                let type = viewer.getProductType(id);
                viewer.resetState(type);
            }
            break;
        case "hideType":
            for (let id in modelVisibilitySelections) {
                let type = viewer.getProductType(id);
                viewer.setState(State.HIDDEN, type);
            }
            break;

        case "hideFloor":
        case "isolateFloor":
            if (modelVisibilityaction == "isolateFloor") {
                hideModel();
            }

            let floorEntities = [];
            for (let id in modelVisibilitySelections) {
                let model = modelVisibilitySelections[id].model;
                let floorId = getParentFloorId(id);
                if (floorId > 0) {
                    getAllChildren(floorId, floorEntities);
                    if (modelVisibilityaction == "isolateFloor") {
                        viewer.resetState(floorEntities, model);
                    }
                    else {
                        viewer.setState(State.HIDDEN, floorEntities, model);
                    }
                    viewer.setState(State.HIDDEN, ProductType.IFCSPACE);
                    viewer.setState(State.HIDDEN, ProductType.IFCGRID);
                }
            }
            break;
    }

    let viewerEle = document.getElementById("viewer-container");
    viewerEle.style.cursor = 'default';
    modelVisibilitySelections = {};
}

function selectElementForModelVisibility(action) {
    modelVisibilitySelections = {};
    mouseaction = "select";
    modelVisibilityaction = action;
    let viewerEle = document.getElementById("viewer-container");
    viewerEle.style.cursor = 'crosshair';
}

function zoomExtents() {
    let arr = [];


    let allItems = viewer.getModelState(1).map(
        function (x) {
            return x[0];
        });

    allItems.forEach(function (el) {
        let state = viewer.getState(el, 1)
        if (state != State.HIDDEN)
            arr.push({ id: el, model: 1 });
    });


    // Note: checkVisibility for 'zoomTo' needs to be set to false. If not,zoomTo works but doesn't maintain the view orientation and this get changed sometimes based on viewer internal logic.
    viewer.zoomTo(arr, null, false, false);
}

function reset() {

    if (viewer) {
        viewer.resetState();
        viewer.setState(State.HIDDEN, ProductType.IFCSPACE);
        viewer.resetStyles();
        viewer.camera = CameraType.PERSPECTIVE;
    }
    $("#attrprop").html('');
    mouseaction = "noaction";
    modelVisibilitySelections = {};
}

function hideModel() {

    viewer.setState(State.HIDDEN, viewer.getModelState(1).map(
        function (x) {
            return x[0];
        }));
}

function getAllChildren(parentid, childern) {
    if (entitiesExtendedData) {
        let parent = entitiesExtendedData[parentid];
        getChildrenUsingIfcData(parent, childern);
    }
}

function getParentFloorId(enId) {
    return getParentFloorIdUsingIfcData(enId);
}

function getParentFloorIdUsingIfcData(enId) {

    let dic = entitiesExtendedData;
    if (!dic)
        return -1;

    for (const key in entitiesExtendedData) {
        let en = dic[key];
        if (parseInt(key) == enId) {
            if (en.PType.toUpperCase() == "IFCBUILDINGSTOREY") {
                return en.PId;
            }
            return getParentFloorIdUsingIfcData(en.PId);
        }
    }

    return -1;
}

function getChildrenUsingIfcData(parent, childern) {

    if (parent && parent.Children && parent.Children.length > 0) {
        parent.Children.forEach(function (child) {
            childern.push(child.Id);
            getChildrenUsingIfcData(child, childern);
        });
    }
}

function getEntitiesExtendedData(data) {
    let entitiesExtendedData = data.EntitiesExtendedData;
    if (!entitiesExtendedData) {
        console.log("EntitiesExtendedData is not defined");
        return;
    }

    let result = {};

    for (let i = 0; i < entitiesExtendedData.length; i++) {
        let item_i = {};
        item_i.Id = entitiesExtendedData[i].Id;
        item_i.Name = entitiesExtendedData[i].Name;
        item_i.PId = entitiesExtendedData[i].PId;
        item_i.PType = entitiesExtendedData[i].PType;
        item_i.Properties = entitiesExtendedData[i].Properties;
        item_i.Children = [];
        result[entitiesExtendedData[i].Id] = item_i;
    }

    for (const key in result) {
        var child = result[key];
        result[child.PId]?.Children.push(child);
    }

    return result;
};

function removeSvg() {
}

// code below is for clipping

$("#btnUnclip").click(function () {
    removeSvg();
    viewer.unclip();

    $("#slider-sec-x").slider({
        values: [0, lengthX]
    });
    $("#slider-sec-y").slider({
        values: [0, lengthY]
    });
    $("#slider-sec-z").slider({
        values: [0, lengthZ]
    });

    $("#seclenX").val($("#slider-sec-x").slider("values", 0) + ' - ' + $("#slider-sec-x").slider("values", 1));
    $("#seclenY").val($("#slider-sec-y").slider("values", 0) + ' - ' + $("#slider-sec-y").slider("values", 1));
    $("#seclenZ").val($("#slider-sec-z").slider("values", 0) + ' - ' + $("#slider-sec-z").slider("values", 1));

    viewer.sectionBox.setToInfinity();
});


$("#btnSectionUnclip").click(function (e) {
    $("#slider-sec-x").slider({
        values: [0, lengthX]
    });
    $("#slider-sec-y").slider({
        values: [0, lengthY]
    });
    $("#slider-sec-z").slider({
        values: [0, lengthZ]
    });

    $("#seclenX").val($("#slider-sec-x").slider("values", 0) + ' - ' + $("#slider-sec-x").slider("values", 1));
    $("#seclenY").val($("#slider-sec-y").slider("values", 0) + ' - ' + $("#slider-sec-y").slider("values", 1));
    $("#seclenZ").val($("#slider-sec-z").slider("values", 0) + ' - ' + $("#slider-sec-z").slider("values", 1));

    viewer.sectionBox.setToInfinity();
    viewer.unclip();
});

$("#btnSectionClose").click(function (e) {
    viewer.sectionBox.setToInfinity();
    viewer.unclip();

    $("#slider-sec-x").slider({
        values: [0, lengthX]
    });
    $("#slider-sec-y").slider({
        values: [0, lengthY]
    });
    $("#slider-sec-z").slider({
        values: [0, lengthZ]
    });

    $("#seclenX").val($("#slider-sec-x").slider("values", 0) + ' - ' + $("#slider-sec-x").slider("values", 1));
    $("#seclenY").val($("#slider-sec-y").slider("values", 0) + ' - ' + $("#slider-sec-y").slider("values", 1));
    $("#seclenZ").val($("#slider-sec-z").slider("values", 0) + ' - ' + $("#slider-sec-z").slider("values", 1));

    sectionClip = false;
    $("#clippingopt").hide();
});

function IntClip() {

    var position = {};
    var down = false;
    var gclip = {};
    var cRect = getOffsetRect(viewer.canvas);

    var svgclip = getSVGOverlay();

    svgclip.style.top = cRect.top + 'px';
    svgclip.style.left = cRect.left + 'px';

    function getOffsetRect(elem) {
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var clientBottom = docElem.clientBottom || body.clientBottom || 0;
        var clientRight = docElem.clientRight || body.clientRight || 0;


        var top = Math.round(box.top + scrollTop - clientTop);
        var left = Math.round(box.left + scrollLeft - clientLeft);
        var bottom = Math.round(box.top + scrollTop - clientBottom);
        var right = Math.round(box.left + scrollLeft - clientRight);

        return { top: top, left: left, width: right - left, height: bottom - top };
    }

    var handleMouseDownClip = function (event) {
        if (down) return;
        down = true;

        viewer.disableTextSelection();

        var r = svgclip.getBoundingClientRect();
        position.x = event.clientX - r.left;
        position.y = event.clientY - r.top;
        position.angle = 0.0;
        //create very long vertical line going through the point
        gclip = document.createElementNS(ns, "g");
        gclip.setAttribute('id', 'section');
        svgclip.appendChild(gclip);

        var line = document.createElementNS(ns, "line");
        gclip.appendChild(line);

        line.setAttribute('style', "stroke:rgb(255,0,0);stroke-width:2");
        line.setAttribute('x1', position.x);
        line.setAttribute('y1', 99999);
        line.setAttribute('x2', position.x);
        line.setAttribute('y2', -99999);
    };

    var handleMouseUpClip = function (event) {
        if (!down) return;

        //check if the points are not identical.
        var r = svgclip.getBoundingClientRect();
        if (position.x == event.clientX - r.left && position.y == event.clientY - r.top) {
            return;
        }

        down = false;
        viewer.enableTextSelection();


        //get inverse transformation
        var transform = mat4.create();
        mat4.multiply(transform, viewer.pMatrix, viewer.mvMatrix);
        var inverse = mat4.create();
        mat4.invert(inverse, transform);

        //get normalized coordinates the point in WebGL CS
        var x1 = position.x / (viewer.width / 2.0) - 1.0;
        var y1 = 1.0 - position.y / (viewer.height / 2.0);

        //First point in WCS
        var A = vec3.create();
        vec3.transformMat4(A, [x1, y1, -1], inverse); //near clipping plane

        //Second point in WCS
        var B = vec3.create();
        vec3.transformMat4(B, [x1, y1, 1], inverse); //far clipping plane

        //Compute third point on plane
        var angle = position.angle * Math.PI / 180.0;
        var x2 = x1 + Math.cos(angle);
        var y2 = y1 + Math.sin(angle);

        //Third point in WCS
        var C = vec3.create();
        vec3.transformMat4(C, [x2, y2, 1], inverse); // far clipping plane


        //Compute normal in WCS
        var BA = vec3.subtract(vec3.create(), A, B);
        var BC = vec3.subtract(vec3.create(), C, B);
        var N = vec3.cross(vec3.create(), BA, BC);

        // discard any previous clippings
        viewer.unclip();
        // set clipping A for all handles
        viewer.clip(B, vec3.normalize(vec3.create(), N));

        //clean
        svgclip.parentNode.removeChild(svgclip);
        $(svgclip).find('g').remove();
        svgclip.removeEventListener('mousedown', handleMouseDownClip, true);
        window.removeEventListener('mouseup', handleMouseUpClip, true);
        window.removeEventListener('mousemove', handleMouseMoveClip, true);
    };

    var handleMouseMoveClip = function (event) {
        if (!down) return;

        var r = svgclip.getBoundingClientRect();
        var x = event.clientX - r.left;
        var y = event.clientY - r.top;

        //rotate
        var dX = x - position.x;
        var dY = y - position.y;
        var angle = Math.atan2(dX, dY) * -180.0 / Math.PI + 90.0;

        //round to 5 DEG
        angle = Math.round(angle / 5.0) * 5.0
        angle = Math.round(angle / 5.0) * 5.0
        position.angle = 360.0 - angle + 90;

        gclip.setAttribute('transform', 'rotate(' + angle + ' ' + position.x + ' ' + position.y + ')');
    }

    document.documentElement.appendChild(svgclip)
    svgclip.addEventListener('mousedown', handleMouseDownClip, true);
    window.addEventListener('mouseup', handleMouseUpClip, true);
    window.addEventListener('mousemove', handleMouseMoveClip, true);


};

function getStartBboxCoordinates() {
    var minx = viewer._handles[0]._region.bbox[0];
    var maxx = viewer._handles[0]._region.bbox[0] + 2 * viewer._handles[0]._region.bbox[3];
    var miny = viewer._handles[0]._region.bbox[1];
    var maxy = viewer._handles[0]._region.bbox[1] + 2 * viewer._handles[0]._region.bbox[4];
    var minz = viewer._handles[0]._region.bbox[2];
    var maxz = viewer._handles[0]._region.bbox[2] + 2 * viewer._handles[0]._region.bbox[5];

    for (var i = 1; i < viewer._handles.length; i++) {
        var handle = viewer._handles[i];
        if ((handle._region.bbox[0] + 2 * handle._region.bbox[3]) > maxx) {
            maxx = (handle._region.bbox[0] + 2 * handle._region.bbox[3]) + Math.abs(handle._region.bbox[0] - minx);
        }
        else {
            maxx += Math.abs(handle._region.bbox[0] - minx);
        }
        if ((handle._region.bbox[1] + 2 * handle._region.bbox[4]) > maxy) {
            maxy = handle._region.bbox[1] + 2 * handle._region.bbox[4] + Math.abs(handle._region.bbox[1] - miny);
        }
        else {
            maxy += Math.abs(handle._region.bbox[1] - miny);
        }
        if ((handle._region.bbox[2] + 2 * handle._region.bbox[5]) > maxz) {
            maxz = handle._region.bbox[2] + 2 * handle._region.bbox[5] + Math.abs(handle._region.bbox[2] - minz);
        }
        else {
            maxz += Math.abs(handle._region.bbox[2] - minz);
        }
        if (handle._region.bbox[0] < minx) { minx = handle._region.bbox[0]; }
        if (handle._region.bbox[1] < miny) { miny = handle._region.bbox[1]; }
        if (handle._region.bbox[2] < minz) { minz = handle._region.bbox[2]; }
    }

    lengthX = maxx - minx;
    lengthY = maxy - miny;
    lengthZ = maxz - minz;

    secStartX = minx;
    secStartY = miny;
    secStartZ = minz;

    secStartXtranslated = minx + (maxx - minx / 4);
    secStartYtranslated = miny + (maxy - miny / 4);
    secStartZtranslated = minz + (maxz - minz / 4);
}

function IntSectionBox() {
    sectionClip = true;
    $("#clippingopt").show();
}

