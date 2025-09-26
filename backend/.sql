CREATE TABLE userTable(
    userid INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userid),
    UNIQUE (username),
    UNIQUE (email)
);
CREATE TABLE questionTable(
    id INT NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    vote_count INT NOT NULL DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY (userid) REFERENCES userTable(userid) ON DELETE CASCADE
);
CREATE TABLE answerTable(
    answerid INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer TEXT NOT NULL,
    vote_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(answerid),
    FOREIGN KEY (userid) REFERENCES userTable(userid) ON DELETE CASCADE,
    FOREIGN KEY (questionid) REFERENCES questionTable(questionid) ON DELETE CASCADE
);
-- CREATE TABLE question_vote(
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     userid INT NOT NULL,
--     questionid VARCHAR(100) NOT NULL,
--     vote_type ENUM('upvote', 'downvote') NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     UNIQUE KEY unique_question_vote (userid, questionid),
--     FOREIGN KEY (userid) REFERENCES userTable(userid) ON DELETE CASCADE,
--     FOREIGN KEY (questionid) REFERENCES questionTable(questionid) ON DELETE CASCADE
-- );
CREATE TABLE answer_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    answerid INT NOT NULL,
    vote_type ENUM('upvote', 'downvote') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_answer_vote (userid, answerid),
    FOREIGN KEY (userid) REFERENCES userTable(userid) ON DELETE CASCADE,
    FOREIGN KEY (answerid) REFERENCES answerTable(answerid) ON DELETE CASCADE
);