
var speed = 25;
//getter method for height of element
function getHeight(element){
    return parseFloat(element.style.height); 
}
//getter method for color of element
function getColor(element){
    return element.style.backgroundColor;
}
//setter method for height of element
function setHeight(element, height){
    element.style.height = height;
}
//setter method to set an element's color to red
function setRed(element){
    element.style.backgroundColor= "#FF0000";
}
//setter method for setting element's color to green
function setGreen(element){
    element.style.backgroundColor = "#00FF00";
}
//setter method for setting element's color to white
function setWhite(element){
    element.style.backgroundColor = "white";
}
//getter method for input element value
function getRectangleNumber(){
    var num = document.getElementById("recInput").value;
    return num;
}
//renders the rectangles that represent different values,
//assigns tooltip functionality and makes elements white
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
    makeAllWhite(document.getElementsByClassName("element"));
}
//eventlistener for the enter button
document.getElementById("enterRectangleNum").addEventListener('click', renderRectangles);
//setter method for setting random heights to rectangles
function setHeights(elementList){
    for (var i = 0; i < elementList.length; i++){
        setHeight(elementList[i], (Math.random() * 50) + 10);
    }
}

var slider = document.getElementById("myRange");
//setter method for speed of functionality determined by slider
slider.oninput = function(){

    speed = 1 + 100 - this.value;
}
// Returns a Promise that resolves after "ms" Milliseconds
var timer = ms => new Promise(res => setTimeout(res, ms))
//loads for the amount of time in ms, then iterates loop 
async function load (time) { 

    for (var i = 0; i < speed; i++) {

        await timer(time); 
    }
}
//setter method makes all elements in the elements list white
function makeAllWhite(elements){
    for (var i = 0; i < elements.length; i++){
        setWhite(elements[i]);
    }
}
//adds eventlistener to randomize button
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
//function to run the clock, setting variables to zero
my_Clock.prototype.run = function ()
{
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.miliseconds = 0;
    this.interval;
    this.interval = setInterval(this.update.bind(this), 10);
};
//updates the screen to display the minutes, sectonds, and hours when necessary
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
//updates the time every milisecond
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
//stops the timer
my_Clock.prototype.stopInterval = function(){
    clearInterval(this.interval);
};
var clock = new my_Clock();
////////////////////////////////////////////////////////////////////
//renders a default value of 25 rectangles onto the screen on load
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
//sets the color of the elements back to black background, white text
function turnBack(button){
    button.setAttribute("style", "background-color: black; color:white;");
}
////////////////////////////////////////////////////////////////////
/*selection sort algorithm updates the rectangle heights when necessary
parses all values, finds largest, puts at end of list, then swaps the place of the 
largest value it found with the place the largest value will be placed
*/
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
/*insertion sort algorithm places the next element in the correct place
by pushing larger elements forward by one index, creating space for
the new value in the sorted portion of the list
*/
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
            var oldheight = getHeight(rects[j]);
            setHeight(rects[j], heightToPlace);
            setRed(rects[j]);
            await load(1);
            if (wasGreen){
                setGreen(rects[j]);
            }else{
                setWhite(rects[j]);
            }
            setHeight(rects[j], oldheight);
            j = j - 1;
        }
        setHeight(rects[j+1], heightToPlace);
        setGreen(rects[j+1]);
        setGreen(rects[o]);
    }
    clock.stopInterval();
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;
}
//////////////////////////////////////////////////////////////////////
/*bubble sort swaps each element if they are out of order,
iterates over the length of the list multiple times
*/
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
        for(i = 0; i < len - sorted; i++){
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
            last = i + 1;
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
/*quicksort algorithm requires helper methods swap and partition
swqp takes the elements at the two indexes and swaps them
*/
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
/*partition finds the index near the middle of the list, 
then walks down from the right and left towards the middle,
swapping values that are greater and less than the pivot
*/
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
/*quicksort recursive algorithm drives the partition algorithm
to analyze different lists
*/
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


//quicksort method that utilizes the quickSortHelper
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
/*merge function takes the greatest element from the two
lists and pushes it into the new array
*/
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
/*splits the array until the length of the arrays is less than 2
*/
function mergeSortHelper(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSortHelper(left), mergeSortHelper(right));
}



//mergesort function
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
//merge sort v2
function sortMerge(arr1, arr2, len1, len2){
    let i = len1 - 1;
    let j = len2 - 1;
    let last = len1 + len2 - 1;
    
    while (j >= 0){
        if (i >= 0 && arr1[i] > arr2[i]){
            arr1[last] = arr1[i];
            i--;
        }
        else{
            arr1[last] = arr2[j];
            j--;
        }
        last--;
    }
    return arr1;
}

var mergeSort2 = function(){
    var rects = document.getElementsByClassName("element");
    var button = document.getElementById("mergeSort");
    stayWhite(button);
    var arr = [];
    var arr2 = [];
    var index2 = 0;
    for (var i = 0; i < rects.length; i++){
        if (i < Math.floor(rects.length / 2)){
        arr[i] = getHeight(rects[i]);
        }else{
            arr[i] = -1;
        }
                
            
    }
    
    for (var i = Math.floor(rects.length/2); i < rects.length; i++){
       
        arr2[index2] = getHeight(rects[i]);
        index2++;
    }

    disableSorts();
    var final = sortMerge(arr, arr2, Math.floor(rects.length/2) - 1, index2 - 1);

    for (var i = 0; i < final.length; i++){
        setHeight(rects[i], (final[i]));

    }
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;
}




////////////////////////////////////////////////////////////////////////
//mergesortv3
async function merge3(left, right) {
    let arr = [];
    right = Array.from(right);
    left = Array.from(left)
    while (left.length && right.length) {
        if (getHeight(left[0]) < getHeight(right[0])) {
            arr.push(left.shift());
            await load(1);
            
            
        } else {
            arr.push(right.shift());
            await load(1);
            
        }
    }
    
    return arr.concat(left.concat(right));
}

 async function mergeSortHelper3(arr) {
    if (arr.length < 2) {
        return arr;
    }
    let count = 0;
    let middle = Math.floor(arr.length / 2);
    let left = [];
    let right =  [];
    for (var i = 0; i < middle; i++){
        left[i] = arr[i];
    }
     for (var i = middle; i < arr.length; i++){
         right[count] = arr[i];
         count++;
     }
     return await merge3(await mergeSortHelper3(left), await mergeSortHelper3(right));
     
    
}

function redraw(rects, elements){
    var rects = document.getElementsByClassName("element");
    for (var i = 0; i < elements.length; i++){
        setHeight(rects[i], getHeight(elements[i]));
        
    }
}


var mergeSortWithHeight = async function(){
    var rects = document.getElementsByClassName("element");
    var button = document.getElementById("mergeSort");
    stayWhite(button);

    
   
    disableSorts();
    
    var rectsFinal = await mergeSortHelper3(Array.from(rects));
    for (var i = 0; i < rectsFinal.length; i++){
        console.log(getHeight(rectsFinal[i]));
    }
   redraw(rects, rectsFinal);
  
    turnBack(button);
    enableSorts();
    speed = 1 + 100 - slider.value;
}
////////////////////////////////////////////////////////////////////////
//rectangle tooltips

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
//setter function sets the speed to zero
var setSpeedZero = function(){
    speed = 0;
    clock.stopInterval();

}
/////////////////////////////////////////////////////////////////////
//assigning events

function assignFunctionalityInsertion(){

    var insertionButton = document.getElementById("insertionSort");

    insertionButton.addEventListener('click', insertionSort);
}

function assignFunctionalitySelection(){
    var selectionButton = document.getElementById("selectionSort");
    selectionButton.addEventListener('click', selectionSort);


}
function assignFunctionalityBubble(){
    var bubbleButton = document.getElementById("bubbleSort");

    bubbleButton.addEventListener('click', bubbleSort);
}


function assignFunctionalityQuick(){
    var quickButton = document.getElementById("quickSort");
    quickButton.addEventListener('click', quickSort);
}


function assignFunctionalityMerge(){
    var mergeButton = document.getElementById("mergeSort");

    mergeButton.addEventListener('click', mergeSortWithHeight);
}

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
assignFunctionalitySelection();
assignFunctionalityInsertion();
assignFunctionalityBubble();
assignFunctionalityQuick();
assignFunctionalityMerge();
/////////////////////////////////////////////////////////////////////






