

CREATE TABLE userTable(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,      
    firstname VARCHAR(50) NOT NULL,      
    lastname VARCHAR(50) NOT NULL,       
    email VARCHAR(255) NOT NULL,         
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    PRIMARY KEY(userid)
);

CREATE TABLE questionTabel(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(300) NOT NULL,
    tag VARCHAR(50),                     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    PRIMARY KEY(id, questionid),
    FOREIGN KEY(userid) REFERENCES userTable(userid)
);

CREATE TABLE answerTable(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(500) NOT NULL,         
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(answerid),
    FOREIGN KEY(userid) REFERENCES userTable(userid),
    FOREIGN KEY(questionid) REFERENCES questionTabel(questionid)
);
