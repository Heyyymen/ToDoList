const readline = require('readline-sync');

let tasks = [];

function showMenu() {
  console.log("\n--- To-Do List ---");
  console.log("1. Ajouter une tâche");
  console.log("2. Supprimer une tâche");
  console.log("3. Marquer une tâche comme complétée");
  console.log("4. Afficher les tâches");
  console.log("5. Quitter");
}

function addTask() {
  const task = readline.question("Entrez une nouvelle tache : ");
  tasks.push({ task, completed: false });
  console.log(`Tâche ajoutée : "${task}"`);
}

function deleteTask() {
  displayTasks();
  const index = readline.questionInt("Entrez le numéro de la tâche à supprimer : ") - 1;
  if (index >= 0 && index < tasks.length) {
    console.log(`Tâche supprimée : "${tasks[index].task}"`);
    tasks.splice(index, 1);
  } else {
    console.log("Numéro de tâche invalide.");
  }
}

function completeTask() {
  displayTasks();
  const index = readline.questionInt("Entrez le numéro de la tâche à marquer comme complétée : ") - 1;
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log(`Tâche marquée comme complétée : "${tasks[index].task}"`);
  } else {
    console.log("Numéro de tâche invalide.");
  }
}

function displayTasks() {
  console.log("\n--- Liste des tâches ---");
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}. ${task.task} ${task.completed ? "(complétée)" : ""}`
    );
  });
}

function main() {
  let running = true;
  while (running) {
    showMenu();
    const choice = readline.questionInt("Entrez votre choix : ");
    switch (choice) {
      case 1:
        addTask();
        break;
      case 2:
        deleteTask();
        break;
      case 3:
        completeTask();
        break;
      case 4:
        displayTasks();
        break;
      case 5:
        running = false;
        console.log("Au revoir !");
        break;
      default:
        console.log("Choix invalide.");
    }
  }
}

main();
