# Server
Il server, per poter essere avviato ha bisogno di un file env, che contenga:
L'origine da cui accettare le richieste(Origin)
Url del mongodb(mongodb)
La chiave per creare il jsonToken(token_Key)

# Client
Sul client, bisogna modificare le variabili env, per poter definire a quale indirizzo inviare le richieste.

# Build
Attraverso il comando build, è possibile generare una versione production del client e del server.

# Dev
Con questo comando, si crea una versione development del server.

# Start
In base alla mode del server, quest'ultimo avvierà il progetto. Se ci si trova in production mode, il server tenterà di accedere alla cartella dist del client, mostrandolo all'utente. Mentre invece, nella development mode, avvierà soltanto il server.

# testServer 
Serve ad avviare il server del client, così da poter attuare delle modifiche in tempo reale.
