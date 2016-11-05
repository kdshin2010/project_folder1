//Recursion - may not need recursion in this
function factorial(num) {
	if(num===1) {
		return num;
	} else {
		return num * factorial(num-1);
	}
}


//List Abstract Data Type (ADT) - create a prototype for list
function List() {
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = [];
	this.clear = clear;
	this.find = find;
	this.toString = toString;
	this.insert = insert;
	this.append = append;
	this.remove = remove;
	this.front = front;
	this.end = end;
	this.prev = prev;
	this.next = next;
	this.length = length;
	this.currPos = currPos;
	this.moveTo = moveTo;
	this.getElement = getElement;
	this.length = length;
	this.contains = contains;
}

function append(element) {
	this.dataStore[this.listSize++] = element;
}

function find(element) {
	for(var i = 0; i<this.dataStore.length; i++) {
		if(this.dataStore[i] === element) {
			return i;
		}
	}
	return -1;
}

function remove(element) {
	var foundAt = this.find(element);
	if(foundAt > -1) {
		this.dataStore.splice(foundAt,1);
		this.listSize--;
		return true;
	}
	return false;
}

function length() {
	return this.listSize;
}

function toString() {
	return this.dataStore;
}

function insert(element, index) {
	this.dataStore.splice(index, 0, element);
}

var names = new List();
names.append("Cynthia");
names.append("Raymond");
names.append("Barbara");
console.log(names.toString());

names.insert("Daniel", 1);

function clear() {
	delete this.dataStore;
	this.dataStore = [];
	this.listSize = 0;
	this.pos = 0;
}

function contains(element) {
	for(var i = 0; i<this.dataStore.length; i++) {
		if(this.dataStore[i] === elememt) {
			return true;
		}
	}
	return false;
}

function front() {
	this.pos = 0;
}

function end() {
	this.pos = this.listSize-1;
}

function prev() {
	if(this.pos > 0) {
		this.pos--;
	}
}

function next() {
	if(this.pos < this.listSize-1) {
		this.pos++;
	}
}

function currPos() {
	return this.pos;
}

function moveTo(position) {
	this.pos = position;
}

function getElement() {
	return this.dataStore[this.pos];
}

names.front();
console.log(names.getElement());

//Iterator
//*No need to worry about the underlying data storage structure when accessing list elements
//*No need to update the iterator when a new index is added to the list

for(names.front(); names.currPos() < names.length(); names.next()) {
	console.log(names.getElement());
}

//Stacks - put element on top of the stack and remove element from the top
//LIFO method (last in, first out) push() & pop() VERTICAL
function Stack() {
	this.dataStore = [];
	this.top = 0;
	this.push = push;
	this.pop = pop;
	this.peek = peek;
}

function push(element) {
	this.dataStore[this.top++] = element;
}

function pop() {
    var last = this.dataStore[this.dataStore.length-1];
	this.dataStore.splice(this.dataStore.length-1,1);
    this.top--;
    return last;
}

function peek() {
	return this.dataStore[this.top-1];
}

function length() {
	return this.top;
}

function clear() {
	this.top = 0;
}

var stack = new Stack();
stack.push("Eric");
stack.push("Michael");
stack.push("Anita");
stack.pop();
stack.pop();
console.log(stack.dataStore);
console.log(stack.peek());

//Queues - insert element at the end and remove element from the front
//FIFO method (first in, first out) push() & shift() HORIZONTAL
function Queue() {
	this.dataStore = [];
	this.enqueue = enqueue;
	this.dequeue = dequeue;
	this.front = front;
	this.back = back;
	this.toString = toString;
	this.empty = empty;
}

function enqueue(element) {
	this.dataStore.push(element);
}

function dequeue() {
	this.dataStore.shift();
}

function front() {
	return this.dataStore[0];
}

function back() {
	return this.dataStore[this.dataStore.length-1];
}

function toString() {
	var retStr = "";
	for(var i = 0; i <this.dataSTore.length; ++i) {
		retStr += this.dataStore[i] + "\n";
	}
	return retStr;
}

//Priority Queue
function Patient(name, code) {
	this.name = name;
	this.code = code; //low numbered codes have higher priority
}

//use simple linear search to find element with highest priority or lowest code
function dequeue() { 
	var priority = this.dataStore[0].code;
	for(var i = 1; i < this.dataStore.length; i++) {
		if(this.dataStore[i].code < priority) {
			priority = i;
		}
	}
	return this.dataStore.splice(priority, 1);
}

function toString() {
	var retStr = "";
	for(var i = 0; i < this.dataStore.length; ++i) {
		retStr += this.dataStore[i].name + " code: "
				+ this.dataStore[i].code + "\n";
	}
	return retStr;
}

//Linked Lists

//node consists of two properties: element and next, which points to the
//next node in the linked list

function Node(element) {
	this.element = element;
	this.next = null;
}

//The linked list class provides functions for inserting new nodes, removing
//nodes, and finding a particular data value in a list. There's also a constructor
//function used for creating a new linkedin list. The only property stored in a
//linked list is a node to represent the head of the list.

function LinkedList() {
	this.head = new Node('head');
	this.find = find;
	this.insert = insert;
	this.remove = remove;
	this.display = display;
}

function find(item) {
	var currNode = this.head;
	while(currNode.element != item) {
		currNode = currNode.next;
	}
	return currNode;
}

function insert(newElement) {
	var newNode = new Node(newElement);
	var current = this.find(item);
	newNode.next = current.next;
	current.next = newNode;
}

function display() {
	var currNode = this.head;
	while(!(currNode.next == null)) {
		console.log(currNode.next.element);
		currNode = currNode.next;
	}
}

//removing nodes

function findPrevious(item) {
	var currNode = this.head;
	while(!(currNode.next == null)) && (currNode.next.element!=item)) {
		currNode = currNode.next;
	}
	return currNode;
}

function remove(item) {
	var prevNode = this.findPrevious(item);
	if(!(prevNode.next == null)) {
		prevNode.next = prevNode.next.next;
	}
}

//Doubly & Circularly Linked Lists are for your own research and
//implementation, etc.

function Node(element) {
	this.element = element;
	this.next = null;
	this.previous = null;
}

//Dictionaries - key-value pairs (JavaScript Object)
//may also implement using arrays in a similar fashion

function Dictionary() {
	this.datastore = new Object();
	this.add = add;
	this.remove = remove;
	this.find = find;
	this.display = display;
}

function add(key, value) {
	this.datastore[key] = value;
}

function find(key) {
	return this.datastore[key];
}

function remove(key) {
	delete this.datastore[key];
}

function display() {
	console.log(this.datastore);
}

//Hash Tables - fast insertion, deletion, and retrieval
function HashTable() {
	this.table = new Array[137]; //array size should be prime; modular hashing
	this.simpleHash = simpleHash;
	this.distribution = distribution;
	this.put = put;
	this.get = get;
}

function simpleHash(data) {
	const H = 37;
	var total = 0;
	for(var i=0; i<data.length; ++i) {
		total = H*total + data.charCodeAt(i); //hash function: ASCII letter sum modulo 137
	}
	return total % this.table.length; //results in 0-136 (Horner's method H)
}

function put(data) {
	var pos = this.simpleHash(data);
	this.table[pos] = data;
}

function distribution() {
	for(var i = 0; i<this.table.length; ++i) {
		if(this.table[i] != undefined) {
			console.log(i + ": " + this.table[i]);
		}
	}
}

function get(data) {
	return this.table[this.simpleHash(data)];
}

//Binary Trees











