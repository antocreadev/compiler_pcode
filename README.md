# Portable code machine - Compiler

## 1. Installation et Utilisation

Note: Vous pouvez utilisez l'interface en ligne sur [pcode-machine.antocrea.dev](https://pcode-machine.antocrea.dev/) pour utiliser le compilateur.

1. Installer Deno en suivant les instructions sur le [site officiel](https://docs.deno.com/runtime/manual/getting_started/installation).
2. Exécutez le fichier `main.ts` en utilisant la commande `make run` dans le terminal.
3. Pour ajouter un nouveau fichier de test :
   - (a) Créez le fichier dans le dossier de test.
   - (b) Ajoutez le nom du fichier dans `main.ts`, dans le tableau `testFiles`.
   - (c) Exécutez le fichier `main.ts`.

## 2. Fichiers

### 2.1 lexer.ts

Gère l'analyse lexicale en découpant le code source en tokens. La fonction `tokenize` identifie et regroupe les éléments lexicaux, générant des erreurs en cas de caractères inattendus.

### 2.2 ast.ts

Définit les types pour représenter la structure d'un programme dans l'AST. Inclut des éléments tels que `Program`, `NumericLiteral`, `Identifier`, `BinaryExpr`, etc.

### 2.3 parser.ts

Réalise l'analyse syntaxique pour construire l'AST à partir de la séquence de tokens. Gère différents types de nœuds du langage et signale les erreurs syntaxiques.

### 2.4 TableSymbole.ts

Implémente une classe `TableSymbole` pour générer la table des symboles à partir de l'AST, évitant les doublons.

### 2.5 TranslatePcode.ts

Convertit l'AST en pcode machine, gérant différentes opérations telles que l'addition, la soustraction, etc. Gestion des erreurs incluse.

### 2.6 Stack.ts

Implémente une classe `Stack` pour simuler une pile mémoire pour l'évaluation des opérations du pcode machine.

### 2.7 interpreter.ts

Implémente une fonction `interpreter` pour simuler l'exécution du pcode sur une machine virtuelle, gérant chaque opération du pseudo-code.

## 3. main.ts

Lit le code source des fichiers de test, crée l'AST, génère la table des symboles, traduit en pcode et exécute avec l'interpréteur. Affiche l'AST, la table des symboles, le pseudo-code et l'historique de l'interpréteur.

Gère les erreurs liées à la lecture de fichiers, à la création de l'AST, à la génération du pcode et à l'interprétation, signalant les erreurs et quittant le programme en cas d'erreur.
