---
title: "Introduction to Object-Oriented Programming (OOP) in Python"
date: 2025-02-15 23:18:35 -0400
draft: false
tags: ["python"]
categories: ["blog", "data science"]
---

# **Why Learn OOP?**

Lately, I’ve been revisiting some fundamentals to reinforce Python’s role as a powerful tool for **object-oriented programming (OOP)**. My mentor encouraged me to use Python like a developer—not just as an analyst—and I completely agree. Understanding data structures is essential, but incorporating OOP principles makes you a much stronger problem solver.

Surprisingly, many analysts either **never learn OOP theory** or only encounter it after they’ve already become proficient in Python.

I wish I had learned about OOP from the beginning. As someone who grew up switching between languages, learning the “linguistics” of Python felt familiar. Just as recognizing patterns and exceptions made it easier to learn new spoken languages, understanding OOP patterns helped deepen my knowledge of Python.

## **What is OOP?**

OOP is a programming paradigm that structures code around **objects**, which encapsulate both **data** (attributes) and **behavior** (methods). In Python, **almost everything is an object**.

### **Why OOP Matters?**

Object-Oriented Programming is used to create modular, reusable, and scalable code. Unlike procedural programming, where code is structured as a sequence of instructions, OOP allows us to model real-world entities as objects. This makes the code easier to maintain, extend, and debug.

OOP revolves around four main principles:
1. **Encapsulation** - Bundling data and methods that operate on the data within a single unit (class).
2. **Inheritance** - Creating new classes based on existing ones to promote code reuse.
3. **Polymorphism** - Allowing different classes to be treated as instances of the same class through shared methods.
4. **Abstraction** - Hiding complex implementation details and exposing only necessary functionalities.

### **Example: Basic OOP Structure in Python**
```python
class Car:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
    
    def honk(self):
        return f"{self.brand} {self.model} honks: Beep Beep!"

class ElectricCar(Car):
    def __init__(self, brand, model, year, battery_size):
        super().__init__(brand, model, year)
        self.battery_size = battery_size
    
    def charge(self):
        return f"Charging {self.brand} {self.model} with a {self.battery_size}-kWh battery."

# Creating instances
my_car = Car("Toyota", "Corolla", 2022)
my_electric_car = ElectricCar("Tesla", "Model S", 2023, 100)

print(my_car.honk())  # Output: Toyota Corolla honks: Beep Beep!
print(my_electric_car.charge())  # Output: Charging Tesla Model S with a 100-kWh battery.
```
💡 **Analogy:**
- The **Car class** is like a generic car blueprint—every car has a brand, model, and year.
- The **ElectricCar class** inherits from Car and adds new features specific to electric cars, like a battery.
- This reflects **inheritance**, where ElectricCar extends the capabilities of a general Car.

---

## **Understanding Classes in Python**

### **What is a Class?**
A **class** is a blueprint for creating objects. Objects (instances of a class) have **attributes** (which store data about an object)** and **methods** (functions that define behaviors specific to that class)**. Without attributes and methods, a class would serve no purpose.

💡 **Analogy:**  
Think of a **class** as a blueprint for a type of vehicles— like electric cars, pickup trucks, sedans, SUVs. Each **car** (object) is a specific instance of that blueprint, with unique characteristics like color, make, and model (attributes) and actions it can perform, such as accelerating or honking (methods).

### **Functions, Methods, and Attributes: Key Differences**

Python can sometimes be confusing, especially when distinguishing between **functions**, **methods**, and **attributes**. Let’s break it down:

---

### **1. Functions**
A **function** is a general-purpose operation that can be used anywhere in your code, independent of any class.

📌 **Key Traits:**  
✅ Defined using the `def` keyword.  
✅ Works globally—**not tied to any specific object**.  
✅ Operates on **any type of object**, depending on input.

#### **Example:** A function that calculates the fuel efficiency of a vehicle:
```python
def fuel_efficiency(miles, gallons):
    return miles / gallons  # Calculates miles per gallon (MPG)

print(fuel_efficiency(300, 10))  # Output: 30.0
```
#### **Built-in Function Example:**  
- `len(obj)`: Returns the length of an object, like a string or list.

💡 **Analogy:** A function is like a **universal tool**—it works on any car, regardless of type.

---

### **2. Methods**
A **method** is a function that is **tied to a specific class** and operates on an instance of that class. A method is like a special action that a specific car can perform. Only that car knows how to do this action, and it can use its own parts or other car features.

📌 **Key Traits:**  
✅ Defined **inside a class**.  
✅ Must be **called on an instance of a class**.  
✅ Accessed using dot notation (`object.method_name`).  
✅ Typically operates on the instance’s data.
✅ Followed by parentheses.

#### **Example:**
```python
class Car:
    def __init__(self, brand):
        self.brand = brand
    
    def honk(self):
        return f"{self.brand} says Beep beep!"

my_car = Car("Toyota")
print(my_car.honk())  # Output: Toyota says Beep beep!
```
#### **Built-in Method Example:**  
- `.describe()`: In pandas, summarizes DataFrame statistics.

💡 **Analogy:** A method is like a **feature of a specific car**—not all vehicles have the same functionalities.

---

### **3. Attributes**
An **attribute** is a variable that is associated with an object in object-oriented programming. Unlike methods, attributes **do not use parentheses** when accessed. An attribute represents a characteristic or feature of the object. For example, a car object might have attributes like its make, color, or model. These attributes store data or metadata that describe the intrinsic properties of the object itself. Attributes are accessed using dot notation, and unlike methods, they are not followed by parentheses. For example, car.color is an attribute that would return the color of the car object.

📌 **Key Traits:**  
✅ Stores **information** about an object.  
✅ Accessed using dot notation (`object.attribute`).  
✅ Does **not** require parentheses.

#### **Example:**
```python
class Car:
    def __init__(self, color, make, model):
        self.color = color
        self.make = make
        self.model = model

my_car = Car("Red", "Toyota", "Corolla")
print(my_car.color)  # Output: Red
```
#### **Built-in Attribute Example:**  
- `car.color`: Retrieves the color of a `Car` object.

💡 **Analogy:** An attribute is like **a car’s physical characteristics**—color, brand, or model.

---

## **Final Thoughts**
Understanding OOP principles—**classes, functions, methods, and attributes**—helps unlock Python’s full potential. Whether you’re a data analyst, developer, or someone just learning the language, recognizing these core ideas makes your code more **efficient, reusable, and scalable**.
