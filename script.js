
var speed = 25;
function getHeight(element){
    return parseFloat(element.style.height); 
}

function getColor(element){
    return element.style.backgroundColor;
}
function setHeight(element, height){
    element.style.height = height;


}

function setRed(element){
    element.style.backgroundColor= "#FF0000";
}
function setGreen(element){
    element.style.backgroundColor = "#00FF00";
}

function setWhite(element){
    element.style.backgroundColor = "white";
}

function setHeight(element, height){
    element.style.height = height;
}

function getRectangleNumber(){
    var num = document.getElementById("recInput").value;

    return num;

}
//            <div id="outerelement" style="width:10px;height:100px; solid #000; float:left">
//                <div class="element" style="width:10px;height:100px;border:1px solid #000; float:left">
//                </div>
//            </div>
function renderRectangles(){
    var num = getRectangleNumber();
    document.getElementById("rectangles").innerHTML = "";
    for (var i = 0; i < num; i++){
        var node = document.createElement("DIV");

        node.setAttribute("class", "element");

        node.setAttribute("style", "width:10px;height:100px;border:1px solid #000");

        document.getElementById("rectangles").appendChild(node);
    }
    assignHoverRectangle();
    assignHeight();




}
document.getElementById("enterRectangleNum").addEventListener('click', renderRectangles);
var elements = document.getElementsByClassName("element");
function setHeights(elementList){
    for (var i = 0; i < elementList.length; i++){
        setHeight(elementList[i], (Math.random() * 50) + 10);
    }

}

var slider = document.getElementById("myRange");
slider.oninput = function(){

    speed = 1 + 100 - this.value;
}
// Returns a Promise that resolves after "ms" Milliseconds
var timer = ms => new Promise(res => setTimeout(res, ms))

async function load (time) { // We need to wrap the loop into an async function for this to work

    for (var i = 0; i < speed; i++) {

        await timer(time); // then the created Promise can be awaited
    }
}

function makeAllWhite(elements){
    for (var i = 0; i < elements.length; i++){
        setWhite(elements[i]);
    }
}
document.getElementById("randomize").addEventListener('click', function(){
    var elem = document.getElementsByClassName("element");
    makeAllWhite(elem);
    setHeights(elem);

});
////////////////////////////////////////////////////////////////////////
//clock
function my_Clock() 
{

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.miliseconds = 0;
    this.interval;
}
my_Clock.prototype.run = function ()
{
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.miliseconds = 0;
    this.interval;
    this.interval = setInterval(this.update.bind(this), 10);
};
my_Clock.prototype.update = function () 
{
    this.updateTime(1);
    if (this.hours != 0){
        document.getElementById("timer").innerHTML = (this.hours + ":" + this.minutes + ":" + this.seconds + "." + this.miliseconds + " s");
    }
    else if (this.minutes != 0){
        document.getElementById("timer").innerHTML = ( this.minutes + ":" + this.seconds + "." + this.miliseconds + " s");
    }
    else{
        document.getElementById("timer").innerHTML = (this.seconds + "." + this.miliseconds + " s");
    }
};
my_Clock.prototype.updateTime = function (miliseconds) 
{

    this.miliseconds+= miliseconds;
    if (this.miliseconds >= 100){
        this.seconds++;
        this.miliseconds = 0;
    }
    if (this.seconds >= 60)
    {
        this.minutes++;
        this.seconds= 0;
    }
    if (this.minutes >= 60)
    {
        this.hours++;
        this.minutes=0;
    }
    if (this.hours >= 24)
    {
        this.hours = 0;
    }
};

my_Clock.prototype.stopInterval = function(){
    clearInterval(this.interval);
};
var clock = new my_Clock();
////////////////////////////////////////////////////////////////////
window.onload = function(){
    var num = 25
    document.getElementById("rectangles").innerHTML = "";
    for (var i = 0; i < num; i++){
        var node = document.createElement("DIV");

        node.setAttribute("class", "element");

        node.setAttribute("style", "width:10px;height:100px;border:1px solid #000");

        document.getElementById("rectangles").appendChild(node);
    }
    assignHoverRectangle();
    assignHeight();
    makeAllWhite(document.getElementsByClassName("element"));

}

////////////////////////////////////////////////////////////////////
//disable/enable all sort buttons
function disableSorts(){
    var buttons = document.getElementsByClassName("sort");
    buttonArr = Array.from(buttons);
    buttonArr.forEach(element => element.disabled = true);

}

function enableSorts(){
    var buttons = document.getElementsByClassName("sort");
    buttonArr = Array.from(buttons);
    buttonArr.forEach(element => element.disabled = false);
}
/////////////////////////////////////////////////////////////////////
//make buttons stay white for duration of execution
function stayWhite(button){
    button.setAttribute("style", "background-color: white; color:black;");
}

function turnBack(button){
    button.setAttribute("style", "background-color: black; color:white;");
}
////////////////////////////////////////////////////////////////////
var selectionSort = async function(){
    disableSorts();
    clock.run();
    var button = document.getElementById("selectionSort");
    stayWhite(button);
    var rects = document.getElementsByClassName("element");
    var innerLim = rects.length;
    var outerLim = rects.length;
    var oldHeight = 0;
    var maxIndex = 0;
    var max = 0;

    for (var o = 0; o < outerLim; o++){
        for (var i = 0; i < innerLim; i++){
            if (max < getHeight(rects[i])){
                max = getHeight(rects[i]);
                maxIndex = i;
                oldHeight = getHeight(rects[i]);


            }
            else{
                oldHeight = getHeight(rects[i]);
                setHeight(rects[i], max);

            }
            setRed(rects[i]);

            await load(1);
            setWhite(rects[i]);

            if (innerLim == i + 1){
                setHeight(rects[maxIndex], oldHeight); 
                innerLim--;
                max = 0;
                maxIndex = 0;
                oldHeight = 0;
                setGreen(rects[i]);


            }else{
                setHeight(rects[i], oldHeight);
            }

        }




    }
    clock.stopInterval();
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;
}
//////////////////////////////////////////////////////////////////////
var insertionSort = async function(){
    disableSorts();
    var button = document.getElementById("insertionSort");
    stayWhite(button);
    var rects = document.getElementsByClassName("element");
    var heightToPlace = 0;
    clock.run();
    for (var o = 1; o < rects.length; o++){

        heightToPlace = getHeight(rects[o]);
        let j = o - 1;
        setRed(rects[o]);
        await load(1);
        setWhite(rects[o]);
        while (j >= 0 && getHeight(rects[j]) > heightToPlace){
            let wasGreen = false;
            if (getColor(rects[j]).toString().localeCompare("rgb(0, 255, 0)")==0){
                wasGreen = true;
            }
            setHeight(rects[j+1], getHeight(rects[j]));
            setRed(rects[j]);
            await load(1);
            if (wasGreen){
                setGreen(rects[j]);
            }else{
                setWhite(rects[j]);
            }

            j = j - 1;
        }
        setHeight(rects[j+1], heightToPlace);
        setGreen(rects[j+1]);
        setGreen(rects[o]);
    }


    //            
    //
    //            setRed(rects[i]);
    //
    //            
    //            setWhite(rects[i]);
    //            if (heightToPlace > getHeight(rects[i]) || i==0){
    //                setHeight(rects[i], heightToPlace);
    //                //alert("here " + heightToPlace + " " + i + " " + o );
    //                i = -1;
    //                heightToPlace = 0;
    //                }
    //            }

    clock.stopInterval();
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;
}
//////////////////////////////////////////////////////////////////////
var bubbleSort = async function(){
    disableSorts();
    var button = document.getElementById("bubbleSort");
    stayWhite(button);
    var rects = document.getElementsByClassName("element");
    let len = rects.length - 1;
    let last = 0;
    let sorted = 0;
    let swapped;
    clock.run();
    do{
        swapped = false;
        let i = 0;
        for(i = 0; i < len; i++){
            let wasGreen = false;

            if (getColor(rects[i + 1]).toString().localeCompare("rgb(0, 255, 0)")==0){
                wasGreen = true;

            }

            setRed(rects[i + 1]);
            await load(1);
            setWhite(rects[i + 1]);
            if (wasGreen){
                setGreen(rects[i + 1]);
            }else{
                setWhite(rects[i + 1]);
            }

            if (getHeight(rects[i]) > getHeight(rects[i+1])){

                let temp = getHeight(rects[i]);
                setHeight(rects[i], getHeight(rects[i + 1]));
                setHeight(rects[i + 1], temp);
                swapped = true;



            }
            last = i + 1 - sorted;


        }
        setGreen(rects[last]);


        sorted++;
    }while (swapped);

    for(var i = 0; i <= len - sorted; i++){
        await load(1);
        setGreen(rects[i]);
    }
    clock.stopInterval();
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;
}
/////////////////////////////////////////////////////////////////////
async function swap(items, leftIndex, rightIndex){
    var temp = getHeight(items[leftIndex]);
    setGreen(items[leftIndex]);
    setGreen(items[rightIndex]);
    await load(1);
    setHeight(items[leftIndex], getHeight(items[rightIndex]));
    setHeight(items[rightIndex], temp);
    await load(1);
    setWhite(items[leftIndex]);
    setWhite(items[rightIndex]);
    console.log("here");

}
async function partition(items, left, right) {
    var pivot = getHeight(items[Math.floor((right + left) / 2)]), 
        //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {

        while (getHeight(items[i]) < pivot) {

            i++;
        }
        while (getHeight(items[j]) > pivot) {
            j--;
        }
        if (i <= j) {
            await swap(items, i, j); //swap two elements
            i++;
            j--;
        }
        if (i >=0 && j >= 0){
            let wasIGreen = false;
            let wasJGreen = false;

            if (getColor(items[i]).toString().localeCompare("rgb(0, 255, 0)")==0){
                wasIGreen = true;

            }
            if (getColor(items[j]).toString().localeCompare("rgb(0, 255, 0)")==0){
                wasJGreen = true;

            }
            setRed(items[i]);
            setRed(items[j]);
            await load(1);
            setWhite(items[i]);
            setWhite(items[j]);
            if (wasIGreen){
                setGreen(items[i]);
            }else{
                setWhite(items[i]);
            }
            if (wasJGreen){
                setGreen(items[j]);
            }else{
                setWhite(items[j]);
            }
        }


    }
    setGreen(items[i - 1]);

    return i;
}

async function quickSortHelper(items, left, right) {
    var index;

    if (items.length > 1) {
        index = await partition(items, left, right); //index returned from partition

        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSortHelper(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSortHelper(items, index, right);
        }

    }


    return items;


}



var quickSort = async function(){
    var rects = document.getElementsByClassName("element");
    var button = document.getElementById("quickSort");
    stayWhite(button);
    disableSorts();
    clock.run();
    await quickSortHelper(rects, 0, rects.length - 1);
    clock.stopInterval();
    for (var i = 0; i < rects.length; i++){
        setRed(rects[i]);
        await load(1);
        setGreen(rects[i]);
    }
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;

}
/////////////////////////////////////////////////////////////////////////

function merge(left, right) {
    let arr = [];

    while (left.length && right.length) {
        if ((left[0]) < (right[0])) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());

        }
    }

    return arr.concat(left.slice().concat(right.slice()));
}

function mergeSortHelper(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSortHelper(left), mergeSortHelper(right));
}




var mergeSort = function(){
    var rects = document.getElementsByClassName("element");
    var button = document.getElementById("mergeSort");
    stayWhite(button);
    var arr = [];

    for (var i = 0; i < rects.length; i++){
        arr[i] = getHeight(rects[i]);
    }
    disableSorts();
    var final = mergeSortHelper(arr);

    for (var i = 0; i < final.length; i++){
        setHeight(rects[i], (final[i]));

    }
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;
}


////////////////////////////////////////////////////////////////////////


var rectHover = function(rect){


    var nodeInner = document.createElement("SPAN");
    nodeInner.setAttribute("class", "tooltiptext");
    nodeInner.innerHTML = getHeight(rect);
    rect.appendChild(nodeInner);


}

var onHover = function(){

    var tooltip = this.children[0];

    tooltip.innerHTML = getHeight(this);
}

///////////////////////////////////////////////////////////

var setSpeedZero = function(){
    speed = 0;
    clock.stopInterval();

}
/////////////////////////////////////////////////////////////////////
assignFunctionalityInsertion();
function assignFunctionalityInsertion(){

    var insertionButton = document.getElementById("insertionSort");

    insertionButton.addEventListener('click', insertionSort);
}
assignFunctionalitySelection();
function assignFunctionalitySelection(){
    var selectionButton = document.getElementById("selectionSort");
    selectionButton.addEventListener('click', selectionSort);


}
function assignFunctionalityBubble(){
    var bubbleButton = document.getElementById("bubbleSort");

    bubbleButton.addEventListener('click', bubbleSort);
}
assignFunctionalityBubble();

function assignFunctionalityQuick(){
    var quickButton = document.getElementById("quickSort");
    quickButton.addEventListener('click', quickSort);
}
assignFunctionalityQuick();

function assignFunctionalityMerge(){
    var mergeButton = document.getElementById("mergeSort");

    mergeButton.addEventListener('click', mergeSort);
}
assignFunctionalityMerge();
function assignHoverRectangle(){
    var rects = document.getElementsByClassName("element");
    for (var i = 0; i < rects.length; i++){
        rectHover(rects[i]);
    }
}

function assignHeight(){
    var rects = document.getElementsByClassName("element");

    for (var i = 0; i < rects.length; i++){
        rects[i].addEventListener('mouseover', onHover);

    }
}

function changeTooltips(){
    var tooltips = document.getElementsByClassName("tooltiptext");
    for (var i = 0; i < rects.length; i++){
        tooltips[i].addEventListener('change', onHover);

    }
}

function assignFinishSort(){
    var finishButton = document.getElementById("finishbutton");
    finishButton.addEventListener('click', setSpeedZero);
}
assignFinishSort();
assignHoverRectangle();
assignHeight();




/////////////////////////////////////////////////////////////////////






