exports.generateText = (name, age) => {
    // Returns output text
    return `${name} (${age} years old)`;
  };
  
  exports.createElement = (type, text, className) => {
    // Creates a new HTML element and returns it
    const newElement = document.createElement(type);
    newElement.classList.add(className);
    newElement.textContent = text;
    return newElement;
  };
  
  exports.validateInput = (text) => {
    // Validate user input with two pre-defined rules
    if (!text || text == null) {
      return false;
    }

    if (typeof text != 'string'){
      return false;
    }

    return true;
  };

  