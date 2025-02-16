document
  .getElementById("admissionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        data[key] = [].concat(data[key], value); // Handle multiple selections
      } else {
        data[key] = value;
      }
    });

    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((message) => alert(message))
      .catch((error) => console.error("Error:", error));
  });
