let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyCollection = document.querySelector("#toy-collection");

  // Fetch Andy's Toys
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        addToyCard(toy);
      });
    });

  // Add a new toy
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const toyName = e.target.name.value;
    const toyImage = e.target.image.value;

    const toyData = {
      name: toyName,
      image: toyImage,
      likes: 0
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    })
      .then(response => response.json())
      .then(newToy => {
        addToyCard(newToy);
      });
  });

  function addToyCard(toy) {
    const card = document.createElement("div");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.innerText = toy.name;
    card.appendChild(h2);

    const img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";
    card.appendChild(img);

    const p = document.createElement("p");
    p.innerText = `${toy.likes} Likes`;
    card.appendChild(p);

    const button = document.createElement("button");
    button.className = "like-btn";
    button.id = toy.id;
    button.innerText = "Like ❤️";
    card.appendChild(button);

    button.addEventListener("click", () => {
      const newLikes = toy.likes + 1;

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
        .then(response => response.json())
        .then(updatedToy => {
          p.innerText = `${updatedToy.likes} Likes`;
          toy.likes = updatedToy.likes;
        });
    });

    toyCollection.appendChild(card);
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

