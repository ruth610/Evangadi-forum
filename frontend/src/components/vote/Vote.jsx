import React, { useState, useEffect } from "react";
import Instance from "../../axiosConfig";
import style from './Vote.module.css';
import { MdOutlineThumbUp } from "react-icons/md";
import { FiThumbsDown } from "react-icons/fi";

const Vote = ({ answerId, userId }) => {
    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
    const [userVote, setUserVote] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchVotes();
    }, []);

    const fetchVotes = async () => {
        try {
            const response = await Instance.get(`/answer/votes/${answerId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setVotes(response.data);
        } catch (error) {
            console.error("Error fetching votes", error);
        }
    };

    const handleVote = async (voteType) => {
        try {
            const response = await Instance.post("/answer/vote", 
                {
                userId:userId,
                answerId:answerId,
                voteType:voteType 
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
        );

            setUserVote(userVote === voteType ? null : voteType);
            fetchVotes();
        } catch (error) {
            console.error("Error voting", error);
        }
    };

    return (
        <div className={style.vote_container}>
            <button className={style.vote_btn}
                onClick={() => handleVote("up")}
                style={{ color: userVote === "up" ? "green" : "black" }}
            >
                <MdOutlineThumbUp color="orange" size={25}/> {votes.upvotes}
            </button>
            <button className={style.vote_btn}
                onClick={() => handleVote("down")}
                style={{ color: userVote === "down" ? "red" : "black" }}
            >
                <FiThumbsDown color="orange" size={25}/> {votes.downvotes}
            </button>
        </div>
    );
};

export default Vote;
