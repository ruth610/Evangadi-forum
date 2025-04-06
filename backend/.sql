CREATE TABLE userTable(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(userid)
);
CREATE TABLE questionTabel(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(300) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY(id, questionid),
    FOREIGN key(userid) REFERENCES userTable(userid)
);
CREATE TABLE answerTable(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN key(userid) REFERENCES userTable(userid),
    FOREIGN key(questionid) REFERENCES questionTabel(questionid)
)