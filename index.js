const readline = require('readline-sync');
const fs = require('fs');
const filePath = './tasks.json'; // Emplacement du fichier JSON

// Charger les tâches depuis le fichier JSON
function loadTasks() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log("Aucune tâche à charger, un nouveau fichier sera créé.");
    return []; // Retourne un tableau vide si le fichier n'existe pas ou est vide
  }
}

// Sauvegarder les tâches dans le fichier JSON
function saveTasks() {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf8');
}

let tasks = loadTasks(); // Charger les tâches au démarrage

function showMenu() {
  console.log("\n--- To-Do List ---");
  console.log("1. Ajouter une tâche");
  console.log("2. Supprimer une tâche");
  console.log("3. Marquer une tâche comme complétée");
  console.log("4. Afficher les tâches");
  console.log("5. Quitter");
}

function addTask() {
  const task = readline.question("Entrez une nouvelle tâche : ");
  const newTask = {
    id: tasks.length + 1, // Générer un ID unique
    task,
    completed: false
  };
  tasks.push(newTask);
  saveTasks(); // Sauvegarder après ajout
  console.log(`Tâche ajoutée : "${task}"`);
}

function deleteTask() {
  displayTasks();
  const index = readline.questionInt("Entrez le numéro de la tâche à supprimer : ") - 1;
  if (index >= 0 && index < tasks.length) {
    console.log(`Tâche supprimée : "${tasks[index].task}"`);
    tasks.splice(index, 1);
    saveTasks(); // Sauvegarder après suppression
  } else {
    console.log("Numéro de tâche invalide.");
  }
}

function completeTask() {
  displayTasks();
  const index = readline.questionInt("Entrez le numéro de la tâche à marquer comme complétée : ") - 1;
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    saveTasks(); // Sauvegarder après modification
    console.log(`Tâche marquée comme complétée : "${tasks[index].task}"`);
  } else {
    console.log("Numéro de tâche invalide.");
  }
}

function displayTasks() {
  console.clear(); // Effacer la console avant d'afficher les tâches
  console.log("\n--- Liste des tâches ---");
  if (tasks.length === 0) {
    console.log("Aucune tâche à afficher.");
  } else {
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}. ${task.task} ${task.completed ? "(complétée)" : ""}`
      );
    });
  }
  readline.question("Appuyez sur Entree pour revenir au menu..."); // Attendre l'entrée pour revenir au menu
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