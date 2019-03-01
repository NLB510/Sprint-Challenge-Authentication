1. What is the purpose of using _sessions_?
  * Sessions are used to persist user information when a user makes requests to different parts of a website. They’re used as a way of authenticating a user and can be used to restrict access to parts of an app.

2. What does bcrypt do to help us store passwords in a secure manner.
  * Bcrypt hashes passwords using algorithms as a means of security.

3. What does bcrypt do to slow down attackers?
  * Bcrypt uses a hashing function, plus ‘rounds’  which runs the hashing function multiple times in order to make it harder for a hacker to steal sensitivxe information. Someone would need to know the hashing function, number of rounds and algorithm in order to successfully decrypt a password. 

4. What are the three parts of the JSON Web Token?
  * Header, payload, signature