let message1: string = "Hello";
message1 = "bye";
console.log(message1);

let age1: number = 20;
console.log(age1);
let isActive: boolean = false;
let numberArray: number[] = [1, 8, 9];

let data: any = "this could be anyghing";
data = 42;

function add(a: number, b: number) {
  return a + b;
}

add(3, 4);

// object

let user: { name: string; age: number } = { name: "Bob", age: 45 };
