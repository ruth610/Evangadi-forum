CREATE TABLE userTable (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE questionTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description LONGTEXT NOT NULL,
    tag VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES userTable(userid)
);

CREATE TABLE answerTable (
    answerid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES userTable(userid),
    FOREIGN KEY (questionid) REFERENCES questionTable(questionid)
);

CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    answerid INT NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES userTable(userid),
    FOREIGN KEY (answerid) REFERENCES answerTable(answerid),
    UNIQUE(userid, answerid)
);
