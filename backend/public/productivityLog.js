/* var fakeUsers = [
  {
    username: "Ali123",
    age: 30,
    gender: "Male",
    occupation: "Engineer",
    image: "img1.jpeg",
  },
  {
    username: "Alice-gamer",
    age: 25,
    gender: "Female",
    occupation: "Teacher",
    image: "img2.jpeg",
  },
  {
    username: "Bob@somewhere",
    age: 35,
    gender: "Male",
    occupation: "Doctor",
    image: "img1.jpeg",
  },
  {
    username: "Mo978",
    age: 35,
    gender: "Male",
    occupation: "Doctor",
    image: "img2.jpeg",
  },
];
tasks = [
  "do the front end",
  "change tailwend code to bootstarp",
  "fix errors in the index file",
  "color adjustment to the final report",
]; */
template = "";
i = 0;
const container = document.getElementById("container");
function showLog() {
  const project = localStorage.getItem("chosenProject");
  fetch(`/productivity?projectId=${project}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      result.forEach((progress) => {
        template += `
                    <div style = "border: 2px solid; background-color: #C1E1BF; border-radius: 20px; margin-left: 10px; color: black; margin-bottom: 10px; padding: 5px;">
                        <span style = "margin-left: 10px; margin-right: 40px; background-color: #C1E1BF; border-radius: 20px; padding: 5px;"><img style = "width:50px; border-radius:5px; margin-right:10px;" src="assets/${
                          progress.member.profilePic
                            ? progress.member.profilePic
                            : "./logo_large.png"
                        }" alt=""><strong>${
          progress.member.username
        }</strong> crossed: 
                        ${progress.task.name}
                        </span>
                    </div>
                    `;
        i++;
      });
      container.innerHTML += container.innerHTML + template;
    });
}

window.addEventListener("DOMContentLoaded", () => showLog());
